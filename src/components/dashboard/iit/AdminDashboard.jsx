// import { useState } from 'react'
// import StudentRequestHandler from './admindashboardcomponents/StudentRequestHandler';
// import LecturerRequestHandler from './admindashboardcomponents/LecturerequestHandler';
// import UpdateLecturerInfo from './admindashboardcomponents/UpdateLecturerInfo';
// import UpdateStudentInfo from './admindashboardcomponents/UpdateStudentInfo';
// import Sidebar from './admindashboardcomponents/Sidebar';
// import Header from './admindashboardcomponents/Header';
// import ViewClassroomInfo from './admindashboardcomponents/ViewClassRoomInfo';
// import UpdateTimeTable from './admindashboardcomponents/UpdateTimetable';

// const AdminDashboard = () => {
//   const [activePage, setActivePage] = useState('dashboard');
//   const [showNotifications, setShowNotifications] = useState(false);

//   const renderContent = () => {
//     switch (activePage) {
//       case 'student-request':
//         return <StudentRequestHandler />;
//       case 'lectures-request':
//         return <LecturerRequestHandler/>;
//         case 'update-timetable': 
//         return <UpdateTimeTable/>;
//       case 'update-lecturer-info':
//         return <UpdateLecturerInfo/>;
//       case 'update-student-info':
//         return <UpdateStudentInfo/>;
//       case 'classroom-info':
//         return <ViewClassroomInfo/>;
//       default:
//         return (
//           <div className="p-6">
//             <h1 className="text-2xl font-bold">Welcome to Admin Dashboard</h1>
//             <p className="text-gray-600">Select an option from the sidebar to get started.</p>
//           </div>
//         );
//     }
//   };
  

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar activePage={activePage} setActivePage={setActivePage} />
//       <div className="flex-1 ml-64">
//       <Header
//         showNotifications={showNotifications}
//         setShowNotifications={setShowNotifications}
//       />
//         <main className="pt-16"> {/* Add padding-top to account for fixed header */}
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



import { useState, useEffect } from 'react';
import StudentRequestHandler from './admindashboardcomponents/StudentRequestHandler';
import LecturerRequestHandler from './admindashboardcomponents/LecturerequestHandler';
import UpdateLecturerInfo from './admindashboardcomponents/UpdateLecturerInfo';
import UpdateStudentInfo from './admindashboardcomponents/UpdateStudentInfo';
import Sidebar from './admindashboardcomponents/Sidebar';
import Header from './admindashboardcomponents/Header';
import ViewClassroomInfo from './admindashboardcomponents/ViewClassRoomInfo';
import UpdateTimeTable from './admindashboardcomponents/UpdateTimetable';

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  
  // State for sidebar open/closed
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // State to track if we're on mobile
  const [isMobile, setIsMobile] = useState(false);
  
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
        return <LecturerRequestHandler/>;
      case 'update-timetable': 
        return <UpdateTimeTable/>;
      case 'update-lecturer-info':
        return <UpdateLecturerInfo/>;
      case 'update-student-info':
        return <UpdateStudentInfo/>;
      case 'classroom-info':
        return <ViewClassroomInfo/>;
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Welcome to Admin Dashboard</h1>
            <p className="text-gray-600">Select an option from the sidebar to get started.</p>
          </div>
        );
    }
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />
      
      {/* Overlay for mobile - only visible when sidebar is open on mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
      
      <div className={`flex-1 transition-all duration-300 ${isMobile ? 'ml-0' : sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <Header
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          toggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />
        <main className="pt-16"> {/* Add padding-top to account for fixed header */}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;