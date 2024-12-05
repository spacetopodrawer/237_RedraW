import React from 'react';

interface LoginHeaderProps {
  isLogin: boolean;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({ isLogin }) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-900">
        {isLogin ? 'Bienvenue' : 'Créer un compte'}
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Cartographie Interactive et Positionnement Assisté
      </p>
    </div>
  );
};

export default LoginHeader;