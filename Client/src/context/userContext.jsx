// // src/context/UserContext.jsx
// import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
// import { countries } from '../components/pages/userCountries.js';
// import { supabase } from '../../supabase';

// // Simple debounce utility (no external deps)
// const debounce = (func, wait) => {
//   let timeout;
//   const executedFunction = (...args) => {
//     const later = () => {
//       clearTimeout(timeout);
//       func(...args);
//     };
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
//   executedFunction.cancel = () => clearTimeout(timeout);
//   return executedFunction;
// };

// const UserContext = createContext(undefined);

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // -------------------------------------------------
//   // 1. Listen to auth state changes (DEBUNCED)
//   // -------------------------------------------------
//   useEffect(() => {
//     // Initial session
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setUser(session?.user ?? null);
//       setLoading(false);
//     });

//     // Debounced listener to prevent spam during HMR/StrictMode
//     const debouncedListener = debounce((_event, session) => {
//       console.log('Auth event (debounced):', _event);
//       setUser(session?.user ?? null);
//       setLoading(false);
//     }, 800); // 800ms debounce

//     const { data: listener } = supabase.auth.onAuthStateChange(debouncedListener);

//     return () => {
//       listener?.subscription.unsubscribe();
//       debouncedListener.cancel?.();
//     };
//   }, []);

//   // -------------------------------------------------
//   // 2. Load profile when auth user changes (DEBUNCED)
//   // -------------------------------------------------
//   const fetchProfile = useCallback(
//     debounce(async (userId) => {
//       if (!userId) {
//         setProfile(null);
//         return;
//       }

//       const { data, error } = await supabase
//         .from('users')
//         .select('*')
//         .eq('id', userId)
//         .single();

//       if (error && error.code !== 'PGRST116') {
//         console.error('Error fetching profile:', error);
//       } else {
//         setProfile(data);
//       }
//     }, 500), // 500ms debounce
//     []
//   );

//   useEffect(() => {
//     if (user?.id) {
//       fetchProfile(user.id);
//     } else {
//       setProfile(null);
//     }
//     return () => fetchProfile.cancel?.();
//   }, [user, fetchProfile]);

//   // -------------------------------------------------
//   // 2.5. Refresh profile helper
//   // -------------------------------------------------
//   const refreshProfile = useCallback(async () => {
//     if (user?.id) {
//       await fetchProfile(user.id);
//     }
//   }, [user?.id, fetchProfile]);

//   // -------------------------------------------------
//   // 3. Register helper
//   // -------------------------------------------------
//   const register = async ({
//     fullName,
//     email,
//     password,
//     phoneNumber,
//     country,
//     paymentMethod,
//     agreedToTerms,
//     referralCode,
//   }) => {
//     const { data: authData, error: authError } = await supabase.auth.signUp({
//       email,
//       password,
//       options: { data: { full_name: fullName } },
//     });

//     if (authError) throw authError;
//     if (!authData.user) throw new Error('No user returned after signup');

//     // Insert user profile
//     const { error: profileError } = await supabase.from('users').insert({
//       id: authData.user.id,
//       full_name: fullName,
//       email,
//       phone_number: phoneNumber,
//       country,
//       currency: countries.find(c => c.code === country)?.currency ?? '',
//       payment_method: paymentMethod,
//       agreed_to_terms: agreedToTerms,
//     });

//     if (profileError) {
//       await supabase.auth.admin.deleteUser(authData.user.id);
//       throw profileError;
//     }

//     // Create user balance record
//     const { error: balanceError } = await supabase.from('user_balances').insert({
//       user_id: authData.user.id,
//       available_balance: 0,
//       pending_balance: 0,
//     });

//     if (balanceError) {
//       console.error('Error creating user balance:', balanceError);
//     }

//     // Handle referral tracking
//     if (referralCode) {
//       try {
//         // Create referral record
//         const { error: referralError } = await supabase.from('user_referrals').insert({
//           referrer_id: referralCode,
//           referred_id: authData.user.id,
//           is_active: true,
//           created_at: new Date().toISOString(),
//         });

//         if (referralError) {
//           console.error('Error creating referral record:', referralError);
//         } else {
//           // Award commission to referrer (e.g., 10% of registration fee or fixed amount)
//           const commissionAmount = 500; // ₦5.00 commission for successful referral
          
//           const { error: commissionError } = await supabase.from('referral_commissions').insert({
//             referrer_id: referralCode,
//             referred_id: authData.user.id,
//             amount: commissionAmount,
//             commission_type: 'registration',
//             created_at: new Date().toISOString(),
//           });

//           if (commissionError) {
//             console.error('Error creating commission record:', commissionError);
//           } else {
//             // Update referrer's balance
//             const { error: updateBalanceError } = await supabase.rpc('increment_balance', {
//               user_id: referralCode,
//               amount: commissionAmount
//             });

//             if (updateBalanceError) {
//               // Fallback: manual balance update
//               const { data: currentBalance, error: fetchError } = await supabase
//                 .from('user_balances')
//                 .select('available_balance')
//                 .eq('user_id', referralCode)
//                 .single();

//               if (!fetchError && currentBalance) {
//                 await supabase
//                   .from('user_balances')
//                   .update({ 
//                     available_balance: currentBalance.available_balance + commissionAmount 
//                   })
//                   .eq('user_id', referralCode);
//               }
//             }
//           }
//         }
//       } catch (error) {
//         console.error('Error processing referral:', error);
//         // Don't fail registration if referral processing fails
//       }
//     }

//     setUser(authData.user);
//     setProfile({
//       id: authData.user.id,
//       full_name: fullName,
//       email,
//       phone_number: phoneNumber,
//       country,
//       currency: countries.find(c => c.code === country)?.currency ?? '',
//       payment_method: paymentMethod,
//       agreed_to_terms: agreedToTerms,
//     });

//     return authData;
//   };

//   // -------------------------------------------------
//   // 4. Login helper
//   // -------------------------------------------------
//   const login = async (email, password) => {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
//     if (error) throw error;
//     setUser(data.user);
//     return data;
//   };

//   // -------------------------------------------------
//   // 5. Logout helper
//   // -------------------------------------------------
//   const logout = async () => {
//     await supabase.auth.signOut();
//     setUser(null);
//     setProfile(null);
//   };

//   const value = {
//     user,
//     profile,
//     loading,
//     register,
//     login,
//     logout,
//     refreshProfile,
//   };

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };

// // Hook
// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) throw new Error('useUser must be used within UserProvider');
//   return context;
// };



// src/context/UserContext.jsx
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