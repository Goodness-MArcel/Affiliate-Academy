

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../../supabase';
import { countries } from '../components/pages/userCountries.js';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true); // Auth loading only
  const [profileLoading, setProfileLoading] = useState(false); // ADD: Profile fetch loading

  // Session restore
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_OUT') {
        setLoading(false);
        setProfileLoading(false);
      } else if (event === 'SIGNED_IN') {
        setLoading(false);
        // Don't set profileLoading=false here — let fetchProfile handle it
      }
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  // Fetch profile (only user data, no admin)
  const fetchProfile = useCallback(async (userId) => {
    if (!userId) {
      setProfile(null);
      setProfileLoading(false); // ADD
      return;
    }

    setProfileLoading(true); // ADD: Show loading during fetch

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error('Profile fetch failed:', err);
      setProfile(null);
    } finally {
      setProfileLoading(false); // ADD: Always hide loading
    }
  }, []);

  useEffect(() => {
    if (user?.id && !loading) {
      fetchProfile(user.id);
    } else if (!user) {
      setProfile(null);
      setProfileLoading(false);
    }
  }, [user?.id, loading, fetchProfile]);

  // Register (unchanged)
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
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('No user');

    await supabase.from('users').insert({
      id: authData.user.id,
      full_name: fullName,
      email,
      phone_number: phoneNumber,
      country,
      currency: countries.find(c => c.code === country)?.currency ?? '',
      payment_method: paymentMethod,
      agreed_to_terms: agreedToTerms,
      role: 'user',
    });

    await supabase.from('user_balances').insert({
      user_id: authData.user.id,
      available_balance: 0,
      pending_balance: 0,
    });

    // Referral logic (unchanged)
    if (referralCode) {
      try {
        await supabase.from('user_referrals').insert({
          referrer_id: referralCode,
          referred_id: authData.user.id,
          is_active: true,
          created_at: new Date().toISOString(),
        });

        const commissionAmount = 500;
        await supabase.from('referral_commissions').insert({
          referrer_id: referralCode,
          referred_id: authData.user.id,
          amount: commissionAmount,
          commission_type: 'registration',
          created_at: new Date().toISOString(),
        });

        await supabase.rpc('increment_balance', {
          user_id: referralCode,
          amount: commissionAmount,
        });
      } catch (err) {
        console.error('Referral failed:', err);
      }
    }

    setUser(authData.user);
    await fetchProfile(authData.user.id); // This will set profileLoading=true, then false
    return authData;
  };

  // Login
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setUser(data.user);
    await fetchProfile(data.user.id); // Waits for profile
    return data;
  };

  // Logout
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setProfileLoading(false);
  };

  const value = {
    user,
    profile,
    loading, // Auth loading
    profileLoading, // ADD: Profile loading
    isFullyLoaded: !loading && !profileLoading && !!user, // ADD: Full auth + profile ready
    register,
    login,
    logout,
    refreshProfile: () => user?.id && fetchProfile(user.id),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};