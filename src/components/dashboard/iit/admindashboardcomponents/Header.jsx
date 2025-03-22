import React from 'react';
import { User, Menu, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar, isMobile }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear local storage items related to admin authentication
    localStorage.removeItem('iit_admin_last_login');
    localStorage.removeItem('iit_admin_username');
    
    // Navigate to login page
    navigate('/iit-admin-login');
  };

  return (
    <header className="bg-white shadow-sm h-16 z-20 sticky top-0">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left section with title and mobile menu toggle */}
        <div className="flex items-center">
          {isMobile && (
            <button 
              onClick={toggleSidebar} 
              className="mr-3 p-2 rounded-lg text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
          <h2 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Admin Dashboard</h2>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="border-l border-gray-300 h-8 hidden sm:block"></div>
  
          
          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-1 p-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            aria-label="Sign Out"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;