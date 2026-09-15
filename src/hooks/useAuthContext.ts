import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextValue';

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext deve ser usado dentro de AuthProvider');
  return context;
};
