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

// import { useState, useEffect } from 'react'
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
//   const [isMobileView, setIsMobileView] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   // Handle responsive behavior
//   useEffect(() => {
//     const handleResize = () => {
//       // Set mobile view if screen width is less than 768px (typical tablet breakpoint)
//       setIsMobileView(window.innerWidth < 768);
      
//       // Auto-close sidebar on small screens
//       if (window.innerWidth < 768) {
//         setIsSidebarOpen(false);
//       } else {
//         setIsSidebarOpen(true);
//       }
//     };

//     // Initial check
//     handleResize();
    
//     // Add event listener
//     window.addEventListener('resize', handleResize);
    
//     // Cleanup
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const renderContent = () => {
//     switch (activePage) {
//       case 'student-request':
//         return <StudentRequestHandler />;
//       case 'lectures-request':
//         return <LecturerRequestHandler />;
//       case 'update-timetable': 
//         return <UpdateTimeTable />;
//       case 'update-lecturer-info':
//         return <UpdateLecturerInfo />;
//       case 'update-student-info':
//         return <UpdateStudentInfo />;
//       case 'classroom-info':
//         return <ViewClassroomInfo />;
//       default:
//         return (
//           <div className="p-6">
//             <h1 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h1>
//             <p className="text-gray-600">Select an option from the sidebar to get started.</p>
//           </div>
//         );
//     }
//   };
  
//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Pass isMobileView and isSidebarOpen to Sidebar */}
//       <Sidebar 
//         activePage={activePage} 
//         setActivePage={setActivePage} 
//         isMobileView={isMobileView}
//         isOpen={isSidebarOpen}
//         setIsOpen={setIsSidebarOpen}
//       />
      
//       {/* Main content area with responsive margin/padding */}
//       <div 
//         className={`flex-1 transition-all duration-300 ${
//           isSidebarOpen ? 
//             (isMobileView ? 'ml-16' : 'ml-64') : // When sidebar is open
//             'ml-16' // When sidebar is collapsed
//         }`}
//       >
//         {/* Pass sidebar toggle function to header */}
//         <Header
//           showNotifications={showNotifications}
//           setShowNotifications={setShowNotifications}
//           toggleSidebar={toggleSidebar}
//           isMobileView={isMobileView}
//         />
        
//         {/* Overlay to close sidebar when clicking outside on mobile */}
//         {isMobileView && isSidebarOpen && (
//           <div 
//             className="fixed inset-0 bg-black bg-opacity-50 z-30"
//             onClick={() => setIsSidebarOpen(false)}
//           />
//         )}
        
//         {/* Main content with responsive padding */}
//         <main className={`pt-16 ${isMobileView ? 'px-4' : 'px-6'}`}>
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


// import { useState, useEffect } from 'react'
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
//   const [isMobileView, setIsMobileView] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   // Handle responsive behavior
//   useEffect(() => {
//     const handleResize = () => {
//       // Set mobile view if screen width is less than 768px (typical tablet breakpoint)
//       const isMobile = window.innerWidth < 768;
//       setIsMobileView(isMobile);
      
//       // Auto-close sidebar on small screens
//       if (isMobile) {
//         setIsSidebarOpen(false);
//       } else {
//         setIsSidebarOpen(true);
//       }
//     };

//     // Initial check
//     handleResize();
    
//     // Add event listener
//     window.addEventListener('resize', handleResize);
    
//     // Cleanup
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const renderContent = () => {
//     switch (activePage) {
//       case 'student-request':
//         return <StudentRequestHandler />;
//       case 'lectures-request':
//         return <LecturerRequestHandler />;
//       case 'update-timetable': 
//         return <UpdateTimeTable />;
//       case 'update-lecturer-info':
//         return <UpdateLecturerInfo />;
//       case 'update-student-info':
//         return <UpdateStudentInfo />;
//       case 'classroom-info':
//         return <ViewClassroomInfo />;
//       default:
//         return (
//           <div className="p-6">
//             <h1 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h1>
//             <p className="text-gray-600">Select an option from the sidebar to get started.</p>
//           </div>
//         );
//     }
//   };
  
//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar 
//         activePage={activePage} 
//         setActivePage={setActivePage} 
//         isMobileView={isMobileView}
//         isOpen={isSidebarOpen}
//         setIsOpen={setIsSidebarOpen}
//       />
      
//       {/* Main content area with responsive margin/padding */}
//       <div 
//         className={`flex-1 transition-all duration-300 ${
//           isSidebarOpen && !isMobileView ? 'ml-64' : 'ml-0 md:ml-16'
//         }`}
//       >
//         {/* Header with sidebar toggle */}
//         <Header
//           showNotifications={showNotifications}
//           setShowNotifications={setShowNotifications}
//           toggleSidebar={toggleSidebar}
//           isMobileView={isMobileView}
//         />
        
//         {/* Overlay to close sidebar when clicking outside on mobile */}
//         {isMobileView && isSidebarOpen && (
//           <div 
//             className="fixed inset-0 bg-black bg-opacity-50 z-40"
//             onClick={() => setIsSidebarOpen(false)}
//           />
//         )}
        
//         {/* Main content with responsive padding */}
//         <main className={`pt-16 ${isMobileView ? 'px-4' : 'px-6'}`}>
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import { useState, useEffect } from 'react'
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
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h1>
            <p className="text-gray-600">Select an option from the sidebar to get started.</p>
          </div>
        );
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
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
        className={`flex-1 transition-all duration-300 bg-gray-100 ${
          isMobile ? 'ml-0' : (sidebarOpen ? 'ml-64' : 'ml-16')
        }`}
      >
        {/* Header */}
        <Header
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
        />
        
        {/* Main content */}
        <main className="pt-16 px-4 md:px-6 h-full overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;