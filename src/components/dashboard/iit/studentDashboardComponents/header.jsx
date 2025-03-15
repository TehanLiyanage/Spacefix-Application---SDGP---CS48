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
            <h2 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Student Dashboard</h2>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
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
                    <p className="text-sm font-medium text-gray-800">Class Canceled</p>
                    <p className="text-xs text-gray-500">
                      Object Oriented Programming class is canceled tomorrow.
                    </p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50">
                    <p className="text-sm font-medium text-gray-800">New Assignment</p>
                    <p className="text-xs text-gray-500">
                      HCI assignment uploaded - due next Friday.
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-l border-gray-300 h-8 hidden sm:block"></div>

          <div className="flex items-center">
            <span className="hidden sm:block text-sm text-gray-700 mr-2">John Doe</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-100 to-cyan-100 flex items-center justify-center text-emerald-600">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;