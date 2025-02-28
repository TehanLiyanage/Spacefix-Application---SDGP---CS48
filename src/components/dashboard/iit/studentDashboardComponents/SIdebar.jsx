import React from "react";
import { Calendar, Users, Clock, Book, Search } from "lucide-react";

const Sidebar = ({ activePage, setActivePage }) => {
  return (
    <div className="w-64 bg-white h-screen fixed left-0 shadow-lg">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">Student Portal</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {/* My Timetable */}
          <li>
            <button
              onClick={() => setActivePage("timetable")}
              className={`w-full flex items-center p-2 rounded-lg ${
                activePage === "timetable" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
              }`}
            >
              <Calendar className="w-5 h-5 mr-3" />
              My Timetable
            </button>
          </li>

          {/* Space Availability */}
          <li>
            <button
              onClick={() => setActivePage("spaces")}
              className={`w-full flex items-center p-2 rounded-lg ${
                activePage === "spaces" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
              }`}
            >
              <Users className="w-5 h-5 mr-3" />
              Space Availability
            </button>
          </li>

          {/* Space Reservation */}
          <li>
            <button
              onClick={() => setActivePage("reservation")}
              className={`w-full flex items-center p-2 rounded-lg ${
                activePage === "reservation" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
              }`}
            >
              <Clock className="w-5 h-5 mr-3" />
              Space Reservation
            </button>
          </li>

          {/* Mini Map */}
          <li>
            <button
              onClick={() => setActivePage("mini-map")}
              className={`w-full flex items-center p-2 rounded-lg ${
                activePage === "mini-map" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
              }`}
            >
              <Book className="w-5 h-5 mr-3" />
              Mini Map
            </button>
          </li>

          {/* Lost Items - ✅ Newly Added */}
          <li>
            <button
              onClick={() => setActivePage("lost-items")}
              className={`w-full flex items-center p-2 rounded-lg ${
                activePage === "lost-items" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
              }`}
            >
              <Search className="w-5 h-5 mr-3" />
              Lost Items
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
