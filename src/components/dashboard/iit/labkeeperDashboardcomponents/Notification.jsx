import React from "react";
import { Bell } from "lucide-react";

const Notification = ({ notifications, showNotifications, setShowNotifications }) => {
  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="p-2 rounded-full text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 md:w-6 md:h-6" />
        {/* Notification indicator */}
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-64 sm:w-80 bg-white rounded-lg shadow-lg py-2 z-30 border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800">Notifications</h3>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div key={index} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">{notification}</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500">
                No new notifications.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;