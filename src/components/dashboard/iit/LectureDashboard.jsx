import React, { useState, useEffect } from 'react';
import Header from './lectureDashboardComponents/Header';
import Timetable from './lectureDashboardComponents/Timetable';
import Sidebar from './lectureDashboardComponents/Sidebar';
import MiniMap from './studentDashboardComponents/MiniMap';
import SpaceBooking from './lectureDashboardComponents/SpaceBooking';

// Feature card component for the dashboard home
const FeatureCard = ({ title, description, onClick }) => (
  <div
    className="cursor-pointer bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
    onClick={onClick}
  >
    <h2 className="text-xl font-bold mb-2">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </div>
);

const LectureDashboard = ({ setCurrentPage, currentPage }) => {
  // Add state for notifications
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Set default page to home if not specified
  const activePage = currentPage || 'home';
  
  // Internal page state to ensure UI updates
  const [internalPage, setInternalPage] = useState(activePage);
  
  // Add responsive sidebar state
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
  
  // Handling page changes
  const handlePageChange = (page) => {
    console.log("Changing page to:", page); // Debug log
    setInternalPage(page);
    
    // Also call parent's setCurrentPage if it exists
    if (setCurrentPage && typeof setCurrentPage === 'function') {
      setCurrentPage(page);
    }
  };

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const features = [
    {
      title: "Space Booking",
      description: "Book lecture halls, labs, and meeting rooms. Manage your bookings in one place.",
      page: "booking"
    },
    {
      title: "Timetable",
      description: "View your personalized teaching schedule, class details, and upcoming sessions.",
      page: "timetable"
    },
    {
      title: "Mini Map",
      description: "Campus map showing building locations, room numbers, and navigation guides.",
      page: "map"
    }
  ];

  // Content to render based on the selected page
  const renderContent = () => {
    // Use internalPage for local rendering
    switch (internalPage) {
      case 'booking':
        return <SpaceBooking setCurrentPage={handlePageChange} />;
      case 'timetable':
        return <Timetable setCurrentPage={handlePageChange} />;
      case 'map':
        return <MiniMap setCurrentPage={handlePageChange} />;
      default:
        // Home dashboard with feature cards
        return (
          <div className="min-h-screen p-4">
            <div className="mb-8">
              <h1 className="text-xl sm:text-2xl font-medium text-center text-emerald-600 mb-6">Welcome to Spacefix</h1>
              <p className="text-gray-600 text-center mt-2">Select a feature to get started</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  onClick={() => handlePageChange(feature.page)}
                />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        activePage={internalPage} 
        setActivePage={handlePageChange}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />
      
      {/* Main content area - positioned absolutely to ensure it's always visible */}
      <div className="absolute inset-y-0 right-0 left-0 md:left-16 bg-gray-50 transition-all duration-300 z-10">
        {/* Header - fixed at top */}
        <div className="fixed top-0 right-0 left-0 md:left-16 z-30">
          <Header
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            toggleSidebar={toggleSidebar}
          />
        </div>
        
        {/* Main content - scrollable area */}
        <main className="mt-16 px-4 py-6 overflow-y-auto h-full">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LectureDashboard;

