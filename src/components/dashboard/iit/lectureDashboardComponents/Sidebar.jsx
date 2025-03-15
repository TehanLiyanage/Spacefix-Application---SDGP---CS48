import React from "react";
import { Calendar, Clock, Book, LayoutDashboard } from "lucide-react";

const Sidebar = ({ activePage, setActivePage }) => {
  return (
    <div className="w-64 h-screen fixed left-0 bg-gradient-to-br from-emerald-500 to-cyan-600 text-white fixed z-50">
      <div className="p-4 border-b border-white text-center">
        <h1 className="text-xl text-white">S P A C E F I X</h1>
      </div>
      <nav className="p-4 overflow-y-auto">
        <ul className="space-y-4">
          {/* Dashboard */}
          <li>
            <button
              onClick={() => setActivePage("home")}
              className={`w-full flex items-center p-2 rounded-lg ${
                activePage === "home"
                  ? "bg-emerald-100 text-emerald-600"
                  : "text-white hover:bg-emerald-50/50 hover:text-emerald-600"
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
                  ? "bg-emerald-100 text-emerald-600"
                  : "text-white hover:bg-emerald-50/50 hover:text-emerald-600"
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
                  ? "bg-emerald-100 text-emerald-600"
                  : "text-white hover:bg-emerald-50/50 hover:text-emerald-600"
              }`}
            >
              <Clock className="w-5 h-5 mr-3" />
              Space Booking
            </button>
          </li>

          {/* Campus Map */}
          <li>
            <button
              onClick={() => setActivePage("map")}
              className={`w-full flex items-center p-2 rounded-lg ${
                activePage === "map"
                  ? "bg-emerald-100 text-emerald-600"
                  : "text-white hover:bg-emerald-50/50 hover:text-emerald-600"
              }`}
            >
              <Book className="w-5 h-5 mr-3" />
              Mini Map
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
