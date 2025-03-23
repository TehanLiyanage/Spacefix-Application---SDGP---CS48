import React, { useState, useEffect } from 'react';
import Header from './lectureDashboardComponents/Header';
import Timetable from './lectureDashboardComponents/Timetable';
import Sidebar from './lectureDashboardComponents/Sidebar';
import MiniMap from './studentDashboardComponents/MiniMap';
import SpaceBooking from './lectureDashboardComponents/SpaceBooking';

// Feature card component for the dashboard home
const FeatureCard = ({ title, description, onClick, color }) => (
  <div
    className={`cursor-pointer bg-white p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-${color}-500 transition-all duration-300 hover:shadow-lg`}
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
      page: "booking",
      color: "blue"
    },
    {
      title: "Timetable",
      description: "View your personalized teaching schedule, class details, and upcoming sessions.",
      page: "timetable",
      color: "green" 
    },
    {
      title: "Mini Map",
      description: "Campus map showing building locations, room numbers, and navigation guides.",
      page: "map",
      color: "yellow"
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
            {/* Added dashboard content with image first, then title below */}
            <div className="p-4 md:p-6 lg:p-8">
              <div className="flex flex-col">
                {/* Image container with responsive sizing */}
                <div className="mb-8 overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1625297673112-06b459140555?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Admin Dashboard Overview" 
                    className="w-full object-cover transition-transform duration-500 hover:scale-105"
                    style={{ height: 'clamp(200px, 40vh, 500px)' }}
                  />
                </div>
                
                {/* Welcome text below image */}
                <div className="text-center">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-gray-800 tracking-tight">
                    Welcome to Admin Dashboard
                  </h1>
                  <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">
                    Select an option 
                  </p>
                </div>
              </div>
            </div>

 
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-10">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  color={feature.color}
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