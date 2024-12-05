import React from 'react';
import { useLoginForm } from './useLoginForm';
import FormInput from './FormInput';
import FormButton from './FormButton';
import FormError from './FormError';
import LoginHeader from './LoginHeader';
import LoginToggle from './LoginToggle';
import { useAuthBackground } from './useAuthBackground';

const LoginForm = () => {
  const {
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
  } = useLoginForm();

  const { backgroundStyle } = useAuthBackground();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm" 
        style={backgroundStyle}
      />
      <div className="relative bg-white/90 p-8 rounded-xl shadow-2xl w-full max-w-md mx-4 backdrop-blur-md">
        <LoginHeader isLogin={isLogin} />
        <FormError error={error} />

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <FormInput
              id="nom"
              label="Nom complet"
              type="text"
              value={nom}
              onChange={handleNomChange}
              required={!isLogin}
              placeholder="Entrez votre nom complet"
              icon="user"
            />
          )}

          <FormInput
            id="email"
            label="Adresse email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            placeholder="votre@email.com"
            icon="mail"
          />

          <FormInput
            id="password"
            label="Mot de passe"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder="••••••••"
            icon="lock"
          />

          <FormButton type="submit" loading={loading}>
            {isLogin ? 'Se connecter' : 'Créer un compte'}
          </FormButton>

          <LoginToggle isLogin={isLogin} onToggle={toggleMode} />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;