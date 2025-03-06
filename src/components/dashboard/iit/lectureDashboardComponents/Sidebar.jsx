import React from "react";
import { Calendar, Users, Map, LayoutDashboard } from "lucide-react";

const Sidebar = ({ activePage, setActivePage }) => {
  return (
    <div className="w-64 bg-white h-screen fixed left-0 shadow-lg z-10">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">Lecture Portal</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <button
              onClick={() => setActivePage("home")}
              className={`w-full flex items-center p-2 rounded-lg ${
                activePage === "home"
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard
            </button>
          </li>

          {/* Timetable */}
          <li>
            <button
              onClick={() => setActivePage("timetable")}
              className={`w-full flex items-center p-2 rounded-lg ${
                activePage === "timetable"
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <Calendar className="w-5 h-5 mr-3" />
              Timetable
            </button>
          </li>

          {/* Space Booking */}
          <li>
            <button
              onClick={() => setActivePage("booking")}
              className={`w-full flex items-center p-2 rounded-lg ${
                activePage === "booking"
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <Users className="w-5 h-5 mr-3" />
              Space Booking
            </button>
          </li>

          {/* Campus Map */}
          <li>
            <button
              onClick={() => setActivePage("map")}
              className={`w-full flex items-center p-2 rounded-lg ${
                activePage === "map"
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <Map className="w-5 h-5 mr-3" />
              Mini Map
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
