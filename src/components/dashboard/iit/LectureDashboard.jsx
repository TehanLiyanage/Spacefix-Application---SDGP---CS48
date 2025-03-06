import React, { useState } from 'react';
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
  
  // Handling page changes
  const handlePageChange = (page) => {
    console.log("Changing page to:", page); // Debug log
    setInternalPage(page);
    
    // Also call parent's setCurrentPage if it exists
    if (setCurrentPage && typeof setCurrentPage === 'function') {
      setCurrentPage(page);
    }
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
              <h1 className="text-3xl font-bold text-gray-900">Welcome to Spacefix</h1>
              <p className="text-gray-600 mt-2">Select a feature to get started</p>
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
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar activePage={internalPage} setActivePage={handlePageChange} />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-grow ml-64">
        <Header
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
        />
        <main className="p-6 mt-16">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};
export default LectureDashboard;