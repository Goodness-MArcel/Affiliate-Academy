import React, { createContext, useContext, useEffect, useState } from 'react';
import { adminLogin, fetchAdminProfile } from '../api/adminApi';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem('adminData')) || null);
  const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && !admin) {
      fetchAdminProfile(token)
        .then(profile => {
          setAdmin(profile);
          localStorage.setItem('adminData', JSON.stringify(profile));
        })
        .catch(() => {
          logout();
        });
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await adminLogin(email, password);
      const { token: tkn, admin: adminData } = data;
      setToken(tkn);
      setAdmin(adminData);
      localStorage.setItem('adminToken', tkn);
      localStorage.setItem('adminData', JSON.stringify(adminData));
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
  };

  return (
    <AdminContext.Provider value={{ admin, token, login, logout, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider');
  return ctx;
};
