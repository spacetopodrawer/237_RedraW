import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">237_RedraW</Link>
          <div className="flex space-x-4">
            <Link 
              to="/gnss" 
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/gnss')}`}
            >
              GNSS
            </Link>
            <Link 
              to="/rtk" 
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/rtk')}`}
            >
              RTK
            </Link>
            <Link 
              to="/gis" 
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/gis')}`}
            >
              GIS
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;