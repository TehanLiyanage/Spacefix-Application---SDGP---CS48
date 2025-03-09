import React from 'react'
import { Bell, HelpCircle, User, LogOut } from "lucide-react";
import Notification from './Notification';

const Header = ({ showNotifications, setShowNotifications }) => {
  const notifications = [
    "Assignment deadline in 2 days",
    "New course material available",
  ]; // Example notifications array

  return (
    <header className="fixed top-0 right-0 left-64 bg-white h-16 border-b px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold text-gray-700">Welcome, John Doe</h2>
      </div>
      <div className="flex items-center space-x-4">
        <Notification
          notifications={notifications}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
        />
        {/* Help Center */}
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <HelpCircle className="w-6 h-6" />
        </button>
        {/* User Profile */}
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <User className="w-6 h-6" />
        </button>
        {/* Logout */}
        <button className="p-2 hover:bg-gray-100 rounded-full text-red-500">
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;