import React, { useState, useRef, useEffect } from "react";
import { Bell, Menu, User } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from '../../../../firebase/firebaseConfig.js'; // Adjust path as needed

const Header = ({ showNotifications, setShowNotifications, toggleSidebar }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // 🖱️ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🚪 Logout handler
  const handleLogout = async () => {
    try {
      // Sign out from Firebase (if using)
      await signOut(auth);
      
      // Remove all local storage items related to authentication
      localStorage.removeItem("iit_labkeeper_last_login");
      localStorage.removeItem("iit_labkeeper_username");
      
      // Redirect to login page
      window.location.replace("/iit-role-login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 md:left-16 bg-white/95 backdrop-blur-sm shadow-md z-10 h-16">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors md:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="ml-0 md:ml-4">
            <h2 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Labkeeper Dashboard
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4 relative">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 md:w-6 md:h-6" />
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
                      Room 101 needs to be opened at 10:00 AM.
                    </p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50">
                    <p className="text-sm font-medium text-gray-800">Lost Item Reported</p>
                    <p className="text-xs text-gray-500">
                      A student reported a lost laptop in Science Building.
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-l border-gray-300 h-8 hidden sm:block"></div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <span className="hidden sm:block text-sm text-gray-700">
                {localStorage.getItem('iit_labkeeper_username') || 'John Doe'}
              </span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-100 to-cyan-100 flex items-center justify-center text-emerald-600">
                <User className="w-5 h-5" />
              </div>
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-30 border border-gray-200 p-4">
                <p className="text-sm text-gray-800">labkeeper@example.com</p>
                <button
                  onClick={handleLogout}
                  className="mt-3 w-full bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 text-sm"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;