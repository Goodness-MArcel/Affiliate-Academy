// src/context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { countries } from '../components/pages/userCountries.js';
import { supabase } from '../../supabase';

// Simple debounce utility (no external deps)
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

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // -------------------------------------------------
  // 1. Listen to auth state changes (DEBUNCED)
  // -------------------------------------------------
  useEffect(() => {
    // Initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Debounced listener to prevent spam during HMR/StrictMode
    const debouncedListener = debounce((_event, session) => {
      console.log('Auth event (debounced):', _event);
      setUser(session?.user ?? null);
      setLoading(false);
    }, 800); // 800ms debounce

    const { data: listener } = supabase.auth.onAuthStateChange(debouncedListener);

    return () => {
      listener?.subscription.unsubscribe();
      debouncedListener.cancel?.();
    };
  }, []);

  // -------------------------------------------------
  // 2. Load profile when auth user changes (DEBUNCED)
  // -------------------------------------------------
  const fetchProfile = useCallback(
    debounce(async (userId) => {
      if (!userId) {
        setProfile(null);
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    }, 500), // 500ms debounce
    []
  );

  useEffect(() => {
    if (user?.id) {
      fetchProfile(user.id);
    } else {
      setProfile(null);
    }
    return () => fetchProfile.cancel?.();
  }, [user, fetchProfile]);

  // -------------------------------------------------
  // 3. Register helper
  // -------------------------------------------------
  const register = async ({
    fullName,
    email,
    password,
    phoneNumber,
    country,
    paymentMethod,
    agreedToTerms,
  }) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('No user returned after signup');

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
      throw profileError;
    }

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

  // -------------------------------------------------
  // 4. Login helper
  // -------------------------------------------------
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setUser(data.user);
    return data;
  };

  // -------------------------------------------------
  // 5. Logout helper
  // -------------------------------------------------
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const value = {
    user,
    profile,
    loading,
    register,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};