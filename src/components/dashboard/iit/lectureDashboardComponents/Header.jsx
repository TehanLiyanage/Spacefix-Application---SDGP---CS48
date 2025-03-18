import React from "react";
import { Bell, Menu, User } from "lucide-react";

const Header = ({ showNotifications, setShowNotifications, toggleSidebar }) => {
  return (
    <header className="fixed top-0 right-0 left-0 md:left-16 bg-white/95 backdrop-blur-sm shadow-md z-10 h-16">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          {/* Only show toggle button on mobile */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors md:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="ml-0 md:ml-4">
            <h2 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Lecturer Dashboard</h2>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          

          <div className="border-l border-gray-300 h-8 hidden sm:block"></div>

          
        </div>
      </div>
    </header>
  );
};

export default Header;
