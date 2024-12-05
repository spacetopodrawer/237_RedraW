import React from 'react';
import { useAuthStore } from '../../store/authStore';

const AuthButton = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-white">{user?.email}</span>
      <button
        onClick={logout}
        className="px-3 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600 text-white"
      >
        Déconnexion
      </button>
    </div>
  );
};

export default AuthButton;