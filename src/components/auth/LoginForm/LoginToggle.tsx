import React from 'react';

interface LoginToggleProps {
  isLogin: boolean;
  onToggle: () => void;
}

const LoginToggle: React.FC<LoginToggleProps> = ({ isLogin, onToggle }) => {
  return (
    <div className="text-center mt-4">
      <button
        type="button"
        onClick={onToggle}
        className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
      >
        {isLogin ? 'Créer un nouveau compte' : 'Déjà inscrit ? Se connecter'}
      </button>
    </div>
  );
};

export default LoginToggle;