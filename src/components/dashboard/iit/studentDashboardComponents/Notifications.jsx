import React from "react";

const Notifications = ({ notifications, showNotifications, setShowNotifications }) => (
  <div className="relative">
    <button
      onClick={() => setShowNotifications(!showNotifications)}
      className="p-2 hover:bg-gray-100 rounded-full relative"
    >
      <span className="w-6 h-6">🔔</span>
      {notifications.length > 0 && (
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
      )}
    </button>
    {showNotifications && (
      <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border p-4">
        <h3 className="font-semibold mb-2">Notifications</h3>
        {notifications.length > 0 ? (
          notifications.map((note, index) => (
            <div key={index} className="p-2 bg-blue-50 rounded">
              <p className="text-sm">{note}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No new notifications.</p>
        )}
      </div>
    )}
  </div>
);

export default Notifications;
