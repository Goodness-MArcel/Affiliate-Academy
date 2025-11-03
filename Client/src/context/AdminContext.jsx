// src/context/AdminContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../../supabase';;

const AdminContext = createContext(undefined);

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if current user is admin
  const checkAdminStatus = async (user) => {
    if (!user) {
      setAdmin(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('admins') // ← Your admin users table
        .select('id, email, role')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      setAdmin(data ? { ...data, user } : null);
    } catch (err) {
      console.error('Admin check failed:', err);
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  // Listen to auth changes
  useEffect(() => {
    // Initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      checkAdminStatus(session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      checkAdminStatus(session?.user ?? null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Verify this user is in `admins` table
    const { data: adminData, error: adminError } = await supabase
      .from('admins')
      .select('id, email, role')
      .eq('id', data.user.id)
      .single();

    if (adminError || !adminData) {
      await supabase.auth.signOut();
      throw new Error('Access denied. Admin only.');
    }

    setAdmin({ ...adminData, user: data.user });
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

// Hook
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};