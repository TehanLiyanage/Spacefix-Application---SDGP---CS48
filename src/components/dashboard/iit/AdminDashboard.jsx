import { useState, useEffect } from 'react'
import StudentRequestHandler from './admindashboardcomponents/StudentRequestHandler';
import LecturerRequestHandler from './admindashboardcomponents/LecturerequestHandler';
import UpdateLecturerInfo from './admindashboardcomponents/UpdateLecturerInfo';
import UpdateStudentInfo from './admindashboardcomponents/UpdateStudentInfo';
import Sidebar from './admindashboardcomponents/Sidebar';
import Header from './admindashboardcomponents/Header';
import ViewClassroomInfo from './admindashboardcomponents/ViewClassRoomInfo';
import UpdateTimeTable from './admindashboardcomponents/UpdateTimetable';
import Announcements from './admindashboardcomponents/Announcements';


const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Effect to detect mobile screens and set initial state
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      
      // On larger screens, default to open sidebar
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    // Check initially
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case 'student-request':
        return <StudentRequestHandler />;
      case 'lectures-request':
        return <LecturerRequestHandler />;
      case 'update-timetable': 
        return <UpdateTimeTable />;
      case 'update-lecturer-info':
        return <UpdateLecturerInfo />;
      case 'update-student-info':
        return <UpdateStudentInfo />;
      case 'classroom-info':
        return <ViewClassroomInfo />;
      case 'announcements': // Add this case for the new component
        return <Announcements />;
      default:
        return (
          <div className="p-4 md:p-6 lg:p-8">
            {/* Dashboard content with image first, then title below */}
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
                  Select an option from the sidebar to get started.
                </p>
              </div>
              
              {/* Stats overview cards - visible on all screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-10">
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-blue-500 transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Total Students</h3>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">1800+</p>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-green-500 transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Active Lecturers</h3>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">100+</p>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-yellow-500 transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Class Rooms</h3>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">20</p>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-purple-500 transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Total Programs</h3>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">3</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />
      
      {/* Main content area */}
      <div 
        className={`flex-1 transition-all duration-300 ${
          isMobile ? 'ml-0' : (sidebarOpen ? 'ml-64' : 'ml-16')
        } relative`}
      >
        {/* Header */}
        <Header
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
        />
        
        {/* Main content */}
        <main className="pt-16 h-full overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;