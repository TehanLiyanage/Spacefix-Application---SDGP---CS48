import React, { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import ToastContainer CSS
import MyTimetable from "./studentDashboardComponents/MyTimetable";
import SpaceAvailability from "./studentDashboardComponents/spaceAvailability";
import Sidebar from "./studentDashboardComponents/sidebar";
import Header from "./studentDashboardComponents/header";
import LostItems from "./studentDashboardComponents/LostItems";
import SpaceReservation from "./studentDashboardComponents/SpaceReservation";
import MiniMap from "./studentDashboardComponents/MiniMap";

const StudentDashboard = () => {
  const [activePage, setActivePage] = useState("timetable");
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if viewport is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-close sidebar on mobile, open on desktop
      setSidebarOpen(window.innerWidth >= 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Function to dynamically render the selected page
  const renderPage = () => {
    switch (activePage) {
      case "timetable":
        return <MyTimetable />;
      case "spaces":
        return <SpaceAvailability />;
      case "reservation":
        return <SpaceReservation />;
      case "mini-map":
        return <MiniMap />;
      case "lost-items":
        return <LostItems />;  
      default:
        return <MyTimetable />;
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      {/* Add ToastContainer for notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Sidebar component */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />
      
      {/* Main content area - positioned absolutely to ensure it's always visible */}
      <div className="absolute inset-y-0 right-0 left-0 md:left-16 bg-gray-100 transition-all duration-300 z-10">
        {/* Header - fixed at top */}
        <div className="fixed top-0 right-0 left-0 md:left-16 z-30">
          <Header
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            toggleSidebar={toggleSidebar}
          />
        </div>
        
        {/* Main content - scrollable area */}
        <main className="mt-16 px-4 py-6 overflow-y-auto h-full bg-gray-100">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;