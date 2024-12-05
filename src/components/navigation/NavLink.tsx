import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 text-white ${
        isActive ? 'bg-blue-700' : ''
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;