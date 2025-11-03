
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { countries } from '../components/pages/userCountries.js';
import { supabase } from '../../supabase'; // Must be configured with persistSession & autoRefreshToken

// ————————————————————————————————————————
// 1. Debounce Utility (kept, but reduced delay)
// ————————————————————————————————————————
const debounce = (func, wait) => {
  let timeout;
  const executedFunction = (...args) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
  executedFunction.cancel = () => clearTimeout(timeout);
  return executedFunction;
};

// ————————————————————————————————————————
// 2. Create Context
// ————————————————————————————————————————
const UserContext = createContext(undefined);

// ————————————————————————————————————————
// 3. User Provider
// ————————————————————————————————————————
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // ————————————————————
  // 1. Auth State Listener (FIXED)
  // ————————————————————
  useEffect(() => {
    // Load session on mount (includes refresh if expired)
    const loadSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        console.log('Initial session loaded:', session ? 'Active' : 'None');
        setUser(session?.user ?? null);
      } catch (err) {
        console.error('Failed to load session:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadSession();

    // Debounced listener — 300ms is fast enough for real events
    const debouncedListener = debounce((event, session) => {
      console.log('Auth event:', event, session ? `User: ${session.user.id}` : 'No session');

      setUser(session?.user ?? null);
      setLoading(false);

      // Optional: Force redirect on logout
      if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        if (!session?.user) {
          window.location.href = '/login';
        }
      }
    }, 300);

    const { data: listener } = supabase.auth.onAuthStateChange(debouncedListener);

    return () => {
      listener?.subscription.unsubscribe();
      debouncedListener.cancel?.();
    };
  }, []);

  // ————————————————————
  // 2. Fetch Profile (FIXED)
  // ————————————————————
  const fetchProfile = useCallback(
    debounce(async (userId) => {
      if (!userId) {
        setProfile(null);
        return;
      }

      console.log('Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Profile fetch error:', error);
      } else {
        setProfile(data);
        console.log('Profile loaded:', data);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (user?.id) {
      fetchProfile(user.id);
    } else {
      setProfile(null);
    }
    return () => fetchProfile.cancel?.();
  }, [user?.id, fetchProfile]);

  // ————————————————————
  // 2.5. Refresh Profile
  // ————————————————————
  const refreshProfile = useCallback(async () => {
    if (user?.id) {
      await fetchProfile(user.id);
    }
  }, [user?.id, fetchProfile]);

  // ————————————————————
  // 3. Register User
  // ————————————————————
  const register = async ({
    fullName,
    email,
    password,
    phoneNumber,
    country,
    paymentMethod,
    agreedToTerms,
    referralCode,
  }) => {
    console.log('Starting registration for:', email);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (authError) {
      console.error('Signup error:', authError);
      throw authError;
    }
    if (!authData.user) throw new Error('No user returned after signup');

    // Insert user profile
    const { error: profileError } = await supabase.from('users').insert({
      id: authData.user.id,
      full_name: fullName,
      email,
      phone_number: phoneNumber,
      country,
      currency: countries.find(c => c.code === country)?.currency ?? '',
      payment_method: paymentMethod,
      agreed_to_terms: agreedToTerms,
    });

    if (profileError) {
      await supabase.auth.admin.deleteUser(authData.user.id);
      console.error('Profile insert error:', profileError);
      throw profileError;
    }

    // Create balance
    const { error: balanceError } = await supabase.from('user_balances').insert({
      user_id: authData.user.id,
      available_balance: 0,
      pending_balance: 0,
    });

    if (balanceError) {
      console.error('Balance creation error:', balanceError);
    }

    // Handle referral
    if (referralCode) {
      try {
        const { error: referralError } = await supabase.from('user_referrals').insert({
          referrer_id: referralCode,
          referred_id: authData.user.id,
          is_active: true,
          created_at: new Date().toISOString(),
        });

        if (referralError) {
          console.error('Referral insert error:', referralError);
        } else {
          const commissionAmount = 500;
          const { error: commissionError } = await supabase.from('referral_commissions').insert({
            referrer_id: referralCode,
            referred_id: authData.user.id,
            amount: commissionAmount,
            commission_type: 'registration',
            created_at: new Date().toISOString(),
          });

          if (commissionError) {
            console.error('Commission error:', commissionError);
          } else {
            const { error: updateError } = await supabase.rpc('increment_balance', {
              user_id: referralCode,
              amount: commissionAmount,
            });

            if (updateError) {
              console.error('RPC increment_balance error:', updateError);
            }
          }
        }
      } catch (err) {
        console.error('Referral processing failed:', err);
      }
    }

    // Update local state
    setUser(authData.user);
    setProfile({
      id: authData.user.id,
      full_name: fullName,
      email,
      phone_number: phoneNumber,
      country,
      currency: countries.find(c => c.code === country)?.currency ?? '',
      payment_method: paymentMethod,
      agreed_to_terms: agreedToTerms,
    });

    return authData;
  };

  // ————————————————————
  // 4. Login
  // ————————————————————
  const login = async (email, password) => {
    console.log('Login attempt:', email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login failed:', error);
      throw error;
    }

    console.log('Login successful:', data.user.id);
    setUser(data.user);
    return data;
  };

  // ————————————————————
  // 5. Logout
  // ————————————————————
  const logout = async () => {
    console.log('Logging out user:', user?.id);
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  // ————————————————————
  // Context Value
  // ————————————————————
  const value = {
    user,
    profile,
    loading,
    register,
    login,
    logout,
    refreshProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// ————————————————————
// Hook
// ————————————————————
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};