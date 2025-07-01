import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-amber-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 flex items-center">
              <img 
                src="/images/logo-project.png" 
                alt="Warkop Khaa" 
                className="h-12 w-auto object-contain"
                style={{ height: '50px', width: 'auto' }}
                onError={(e) => {
                  console.error('Error loading image:', e.target.src);
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <span className="text-xl font-bold text-white">Warkop Khaa</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : 'text-amber-100'}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/menu" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : 'text-amber-100'}`
              }
            >
              Menu
            </NavLink>
<NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : 'text-amber-100'}`
              }
            >
              Contact
            </NavLink>
          </div>
          
          <button className="md:hidden text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
