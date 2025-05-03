
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, requiredRoles = [] }) => {
  const { currentUser } = useAuth();

  // Not logged in
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  // If specific roles are required, check if user has permission
  if (requiredRoles.length > 0 && !requiredRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
