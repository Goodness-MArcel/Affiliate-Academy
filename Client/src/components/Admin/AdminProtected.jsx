import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

/**
 * Protects routes that only admins can access.
 * Redirects to /admin/login if not logged in.
 */
const AdminProtected = ({ children }) => {
  const { admin, token } = useAdmin();
  const location = useLocation();

  // Optional: you can add token expiration validation here
  // For now, we just check if admin and token exist
  if (!token || !admin) {
    return <Navigate to="/AdminLogin" replace state={{ from: location }} />;
  }

  return children;
};

export default AdminProtected;