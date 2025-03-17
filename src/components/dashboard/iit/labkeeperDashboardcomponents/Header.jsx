import React from "react";
import { Bell, HelpCircle, User, LogOut } from "lucide-react";

const Header = ({ showNotifications, setShowNotifications }) => {
  return (
    <header className="fixed top-0 right-0 left-0 md:left-16 bg-white/95 backdrop-blur-sm shadow-md z-10 h-16">
      <div className="flex items-center justify-between h-full px-4">
        <div className="ml-0 md:ml-4">
          <h2 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Welcome, John Doe</h2>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 md:w-6 md:h-6" />
              {/* Notification indicator */}
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 sm:w-80 bg-white rounded-lg shadow-lg py-2 z-30 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">New Task Assigned</p>
                    <p className="text-xs text-gray-500">
                      You have a new task to complete.
                    </p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Help Circle */}
          <button className="p-2 rounded-full text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
            <HelpCircle className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          {/* User Profile */}
          <button className="p-2 rounded-full text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
            <User className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          {/* Logout Button */}
          <button className="p-2 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors">
            <LogOut className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;