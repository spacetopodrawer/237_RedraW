import { useState, useCallback } from 'react';
import { useAuth } from '../../../hooks/useAuth';

export const useLoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [error, setError] = useState('');
  const { login, register, loading } = useAuth();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (password.length < 6) {
          throw new Error('Le mot de passe doit contenir au moins 6 caractères');
        }
        await register(email, password, nom);
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.');
    }
  }, [isLogin, email, password, nom, login, register]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => 
    setEmail(e.target.value), []);
  
  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => 
    setPassword(e.target.value), []);
  
  const handleNomChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => 
    setNom(e.target.value), []);
  
  const toggleMode = useCallback(() => setIsLogin(!isLogin), [isLogin]);

  return {
    isLogin,
    email,
    password,
    nom,
    error,
    loading,
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
    handleNomChange,
    toggleMode
  };
};