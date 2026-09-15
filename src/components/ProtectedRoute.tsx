import React, { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  useEffect(() => {
    if (!isAuthenticated) window.location.hash = '#login';
  }, [isAuthenticated]);
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
