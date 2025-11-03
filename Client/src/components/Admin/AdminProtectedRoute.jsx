// src/components/AdminProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// import { useAdmin } from '../context/AdminContext';
import { useAdmin } from '../../context/AdminContext';

export const AdminProtectedRoute = ({ children }) => {
  const { admin, loading } = useAdmin();
  const location = useLocation();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return admin ? children : <Navigate to="/AdminLogin" replace state={{ from: location }} />;
};