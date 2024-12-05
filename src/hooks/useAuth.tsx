import { useState, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../utils/api';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { setUser, logout: storeLogout } = useAuthStore();

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.auth.login(email, password);
      const { user, token } = response.data;
      localStorage.setItem('auth-token', token);
      setUser(user);
      return user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  const register = useCallback(async (email: string, password: string, nom: string) => {
    setLoading(true);
    try {
      const response = await api.auth.register(email, password, nom);
      const { user, token } = response.data;
      localStorage.setItem('auth-token', token);
      setUser(user);
      return user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erreur d\'inscription');
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  const logout = useCallback(() => {
    localStorage.removeItem('auth-token');
    storeLogout();
  }, [storeLogout]);

  return {
    login,
    register,
    logout,
    loading
  };
};