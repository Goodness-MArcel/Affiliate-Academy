// src/context/AdminContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../../supabase';

const AdminContext = createContext(undefined);

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAdminStatus = async (user) => {
    if (!user) {
      setAdmin(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, full_name, role')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data?.role === 'admin') {
        setAdmin({ ...data, user });
      } else {
        setAdmin(null);
      }
    } catch (err) {
      console.error('Admin check failed:', err);
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      checkAdminStatus(session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      checkAdminStatus(session?.user ?? null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    // Check role in users table
    const { data: userData, error: roleError } = await supabase
      .from('users')
      .select('id, email, full_name, role')
      .eq('id', data.user.id)
      .single();

    if (roleError) throw roleError;
    if (userData.role !== 'admin') {
      await supabase.auth.signOut();
      throw new Error('Access denied. Admin role required.');
    }

    setAdmin({ ...userData, user: data.user });
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

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};


