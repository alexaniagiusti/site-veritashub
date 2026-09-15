import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { AuthContext } from './AuthContextValue';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
