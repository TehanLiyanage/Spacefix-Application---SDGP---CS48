import React, { useState } from "react";
import { Bell, HelpCircle, User, LogOut, Menu, X } from "lucide-react";
import Notifications from "./Notifications"; // Ensure Notifications component is mobile-friendly

const Header = ({ showNotifications, setShowNotifications }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const notifications = [
    "Assignment deadline in 2 days",
    "New course material available",
  ]; // Example notifications array

  return (
    <header className="fixed top-0 left-0 right-0 bg-white h-16 border-b px-6 flex items-center justify-between md:left-64">
      {/* Logo / Title */}
      <div className="flex items-center space-x-2">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-full"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <h2 className="text-lg font-semibold text-gray-700">Welcome, Student</h2>
      </div>
      
      {/* Desktop & Mobile Menu */}
      <div className={`
        absolute top-16 left-0 right-0 bg-white md:bg-transparent md:static md:flex md:items-center md:space-x-4 p-4 md:p-0 shadow-md md:shadow-none transition-transform 
        ${menuOpen ? "block" : "hidden md:flex"}`}
      >
        {/* Notifications */}
        <Notifications
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
