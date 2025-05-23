import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';

export default function ProtectedRoute({ children, roles = [] }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    // User's role is not authorized
    return <Navigate to="/" />;
  }

  return children;
}
