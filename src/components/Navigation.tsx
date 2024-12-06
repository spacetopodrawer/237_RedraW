import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Navigation() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <MapPin className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">GNSS Post-Processing</span>
          </Link>
          
          <div className="flex space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn btn-secondary">
                  Dashboard
                </Link>
                <button onClick={logout} className="btn btn-secondary">
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">
                  Connexion
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}