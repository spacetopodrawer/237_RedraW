import React from 'react';
import { useAuthStore } from '../../store/authStore';
import LoginForm from '../auth/LoginForm';

const AuthMapOverlay = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return null;
  }

  return <LoginForm />;
};

export default AuthMapOverlay;