import React from 'react';
import { useAuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  console.log(isAuthenticated)
  if (!isAuthenticated) {
    window.location.hash = '#login';
    return null;
  }

  return <>{children}</>;
};
