import React, { useState, useEffect } from "react";
import Tasks from './labkeeperDashboardcomponents/Tasks';
import MyTasks from './labkeeperDashboardcomponents/Mytasks';
import Help from './labkeeperDashboardcomponents/Help';
import Report from './labkeeperDashboardcomponents/Report';
import Sidebar from './labkeeperDashboardcomponents/Sidebar';
import Header from './labkeeperDashboardcomponents/Header';

const LabkeeperDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
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
  const renderContent = () => {
    switch (activePage) {
      case 'tasks':
        return <Tasks />;
      case 'mytasks':
        return <MyTasks />;
      case 'help':
        return <Help />;
      case 'report':
        return <Report />;
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Welcome to Admin Dashboard</h1>
            <p className="text-gray-600">Select an option from the sidebar to get started.</p>
          </div>
        );
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
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
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default LabkeeperDashboard;