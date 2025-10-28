import { Navigate } from 'react-router-dom';
import { useUser } from '../context/userContext';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) return <div className="spinner">Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
};