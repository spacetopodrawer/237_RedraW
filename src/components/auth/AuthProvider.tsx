import React, { createContext, useContext, ReactNode } from 'react';
import { useAuthStore } from '../../store/authStore';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, nom: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, isAuthenticated, setUser, logout: storeLogout } = useAuthStore();

  const login = async (email: string, password: string) => {
    try {
      // TODO: Implémenter l'authentification réelle avec l'API
      const mockUser = {
        id: '1',
        email,
        nom: email.split('@')[0],
      };
      setUser(mockUser);
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, nom: string) => {
    try {
      // TODO: Implémenter l'inscription réelle avec l'API
      const mockUser = {
        id: '1',
        email,
        nom,
      };
      setUser(mockUser);
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw error;
    }
  };

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    logout: storeLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};