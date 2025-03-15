import React from "react";
import { Calendar, Users, Clock, Book, Search, Menu, ChevronLeft, X } from "lucide-react";

const Sidebar = ({ activePage, setActivePage, isOpen, toggleSidebar, isMobile }) => {
  // Handle both setting page and closing sidebar on mobile
  const handleNavClick = (page) => {
    setActivePage(page);
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Sidebar component - higher z-index than overlay */}
      <div 
        className={`bg-gradient-to-br from-emerald-500 to-cyan-600 text-white fixed z-50 transition-all duration-300 h-screen 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        ${isMobile ? 'w-64' : isOpen ? 'w-64' : 'w-16 md:translate-x-0'} 
        shadow-xl`}
      >
        <div className="flex items-center justify-between p-4 border-b border-cyan-400">
          {isMobile ? (
            <>
              <h1 className="text-xl text-white">S P A C E F I X</h1>
              <button onClick={toggleSidebar} className="text-gray-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </>
          ) : isOpen ? (
            <>
              <h1 className="text-xl text-white">S P A C E F I X</h1>
              <button onClick={toggleSidebar} className="text-gray-300 hover:text-white">
                <ChevronLeft className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button onClick={toggleSidebar} className="mx-auto text-gray-300 hover:text-white">
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>
        <nav className="p-4 overflow-y-auto">
          <ul className="space-y-4">
            {/* My Timetable */}
            <li>
              <button
                onClick={() => handleNavClick("timetable")}
                className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                  activePage === "timetable" 
                    ? "bg-emerald-100 text-emerald-600" 
                    : "text-white hover:bg-emerald-50/50 hover:text-emerald-600"
                }`}
              >
                <Calendar className={`w-5 h-5 ${(isOpen || isMobile) ? 'mr-3' : 'mx-auto'}`} />
                {(isOpen || isMobile) && <span>My Timetable</span>}
              </button>
            </li>

            {/* Space Availability */}
            <li>
              <button
                onClick={() => handleNavClick("spaces")}
                className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                  activePage === "spaces" 
                    ? "bg-emerald-100 text-emerald-600" 
                    : "text-white hover:bg-emerald-50/50 hover:text-emerald-600"
                }`}
              >
                <Users className={`w-5 h-5 ${(isOpen || isMobile) ? 'mr-3' : 'mx-auto'}`} />
                {(isOpen || isMobile) && <span>Space Availability</span>}
              </button>
            </li>

            {/* Space Reservation */}
            <li>
              <button
                onClick={() => handleNavClick("reservation")}
                className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                  activePage === "reservation" 
                    ? "bg-emerald-100 text-emerald-600" 
                    : "text-white hover:bg-emerald-50/50 hover:text-emerald-600"
                }`}
              >
                <Clock className={`w-5 h-5 ${(isOpen || isMobile) ? 'mr-3' : 'mx-auto'}`} />
                {(isOpen || isMobile) && <span>Space Reservation</span>}
              </button>
            </li>

            {/* Mini Map */}
            <li>
              <button
                onClick={() => handleNavClick("mini-map")}
                className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                  activePage === "mini-map" 
                    ? "bg-emerald-100 text-emerald-600" 
                    : "text-white hover:bg-emerald-50/50 hover:text-emerald-600"
                }`}
              >
                <Book className={`w-5 h-5 ${(isOpen || isMobile) ? 'mr-3' : 'mx-auto'}`} />
                {(isOpen || isMobile) && <span>Mini Map</span>}
              </button>
            </li>

            {/* Lost Items */}
            <li>
              <button
                onClick={() => handleNavClick("lost-items")}
                className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                  activePage === "lost-items" 
                    ? "bg-emerald-100 text-emerald-600" 
                    : "text-white hover:bg-emerald-50/50 hover:text-emerald-600"
                }`}
              >
                <Search className={`w-5 h-5 ${(isOpen || isMobile) ? 'mr-3' : 'mx-auto'}`} />
                {(isOpen || isMobile) && <span>Lost Items</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;