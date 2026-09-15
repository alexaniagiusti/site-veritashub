import { useState, useCallback } from 'react';
import { isAxiosError } from 'axios';
import client from '../api/client';
import type { LoginRequest, LoginResponse, User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await client.post<LoginResponse>('/auth/login', credentials);
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      return data;
    } catch (err: unknown) {
      const responseMessage = isAxiosError<{ message?: string }>(err) ? err.response?.data?.message : undefined;
      const message = responseMessage || (err instanceof Error ? err.message : 'Erro ao fazer login');
      setError(message);
      throw new Error(message, { cause: err });
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: { nome: string; email: string; senha: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.post<LoginResponse>('/auth/register', data);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      return response.data;
    } catch (err: unknown) {
      const message = (isAxiosError<{ message?: string }>(err) ? err.response?.data?.message : undefined) || 'Erro ao registrar';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { user, loading, error, login, register, logout, isAuthenticated: !!user,updateUser };
};
