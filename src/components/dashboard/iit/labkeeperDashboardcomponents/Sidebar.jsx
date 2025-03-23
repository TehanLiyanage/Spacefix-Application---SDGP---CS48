// Updated Sidebar.jsx
import React from "react";
import { Users, HelpCircle, AlertCircle, Menu, ChevronLeft, X } from "lucide-react";

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
            {/* My Tasks */}
            <li>
              <button
                onClick={() => handleNavClick("mytasks")}
                className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                  activePage === "mytasks" 
                    ? "bg-emerald-100 text-emerald-600" 
                    : "text-white hover:bg-emerald-50/50 hover:text-emerald-600"
                }`}
              >
                <Users className={`w-5 h-5 ${(isOpen || isMobile) ? 'mr-3' : 'mx-auto'}`} />
                {(isOpen || isMobile) && <span>My Tasks</span>}
              </button>
            </li>

            {/* Help */}
            <li>
              <button
                onClick={() => handleNavClick("help")}
                className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                  activePage === "help" 
                    ? "bg-emerald-100 text-emerald-600" 
                    : "text-white hover:bg-emerald-50/50 hover:text-emerald-600"
                }`}
              >
                <HelpCircle className={`w-5 h-5 ${(isOpen || isMobile) ? 'mr-3' : 'mx-auto'}`} />
                {(isOpen || isMobile) && <span>Help</span>}
              </button>
            </li>

            {/* Report */}
            <li>
              <button
                onClick={() => handleNavClick("report")}
                className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                  activePage === "report" 
                    ? "bg-emerald-100 text-emerald-600" 
                    : "text-white hover:bg-emerald-50/50 hover:text-emerald-600"
                }`}
              >
                <AlertCircle className={`w-5 h-5 ${(isOpen || isMobile) ? 'mr-3' : 'mx-auto'}`} />
                {(isOpen || isMobile) && <span>Report</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;