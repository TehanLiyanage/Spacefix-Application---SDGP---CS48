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
//   const [isMobile, setIsMobile] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // Function to toggle sidebar
//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };
  
//   // Effect to detect mobile screens and set initial state
//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768);
      
//       // On larger screens, default to open sidebar
//       if (window.innerWidth >= 768) {
//         setSidebarOpen(true);
//       } else {
//         setSidebarOpen(false);
//       }
//     };
    
//     // Check initially
//     checkIfMobile();
    
//     // Add resize listener
//     window.addEventListener('resize', checkIfMobile);
    
//     // Clean up
//     return () => window.removeEventListener('resize', checkIfMobile);
//   }, []);

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
//     <div className="flex h-screen overflow-hidden">
//       {/* Sidebar */}
//       <Sidebar 
//         activePage={activePage} 
//         setActivePage={setActivePage} 
//         isOpen={sidebarOpen}
//         toggleSidebar={toggleSidebar}
//         isMobile={isMobile}
//       />
      
//       {/* Main content area */}
//       <div 
//         className={`flex-1 transition-all duration-300 bg-gray-100 ${
//           isMobile ? 'ml-0' : (sidebarOpen ? 'ml-64' : 'ml-16')
//         }`}
//       >
//         {/* Header */}
//         <Header
//           showNotifications={showNotifications}
//           setShowNotifications={setShowNotifications}
//           toggleSidebar={toggleSidebar}
//           isMobile={isMobile}
//         />
        
//         {/* Main content */}
//         <main className="pt-16 px-4 md:px-6 h-full overflow-y-auto">
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


// this is real


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
//   const [isMobile, setIsMobile] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // Function to toggle sidebar
//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };
  
//   // Effect to detect mobile screens and set initial state
//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768);
      
//       // On larger screens, default to open sidebar
//       if (window.innerWidth >= 768) {
//         setSidebarOpen(true);
//       } else {
//         setSidebarOpen(false);
//       }
//     };
    
//     // Check initially
//     checkIfMobile();
    
//     // Add resize listener
//     window.addEventListener('resize', checkIfMobile);
    
//     // Clean up
//     return () => window.removeEventListener('resize', checkIfMobile);
//   }, []);

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
//           <div className="p-4 md:p-6 lg:p-8">
//             {/* Dashboard content with image first, then title below */}
//             <div className="flex flex-col">
//               {/* Image container with responsive sizing */}
//               <div className="mb-8 overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
//                 <img 
//                   src="https://images.unsplash.com/photo-1625297673112-06b459140555?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
//                   alt="Admin Dashboard Overview" 
//                   className="w-full object-cover transition-transform duration-500 hover:scale-105"
//                   style={{ height: 'clamp(200px, 40vh, 500px)' }}
//                 />
//               </div>
              
//               {/* Welcome text below image */}
//               <div className="text-center">
//                 <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-gray-800 tracking-tight">
//                   Welcome to Admin Dashboard
//                 </h1>
//                 <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">
//                   Select an option from the sidebar to get started.
//                 </p>
//               </div>
              
//               {/* Stats overview cards - visible on all screens */}
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-10">
//   <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-blue-500 transition-all duration-300 hover:shadow-lg">
//     <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Total Students</h3>
//     <p className="text-xl sm:text-2xl font-bold text-gray-800">2,543</p>
//   </div>
//   <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-green-500 transition-all duration-300 hover:shadow-lg">
//     <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Active Lecturers</h3>
//     <p className="text-xl sm:text-2xl font-bold text-gray-800">125</p>
//   </div>
//   <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-yellow-500 transition-all duration-300 hover:shadow-lg">
//     <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Classes Today</h3>
//     <p className="text-xl sm:text-2xl font-bold text-gray-800">48</p>
//   </div>
//   <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-purple-500 transition-all duration-300 hover:shadow-lg">
//     <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Pending Requests</h3>
//     <p className="text-xl sm:text-2xl font-bold text-gray-800">12</p>
//   </div>
// </div>




//             </div>
//           </div>
//         );
//     }
//   };
  
//   return (
//     <div className="flex h-screen overflow-hidden bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar 
//         activePage={activePage} 
//         setActivePage={setActivePage} 
//         isOpen={sidebarOpen}
//         toggleSidebar={toggleSidebar}
//         isMobile={isMobile}
//       />
      
//       {/* Main content area */}
//       <div 
//         className={`flex-1 transition-all duration-300 ${
//           isMobile ? 'ml-0' : (sidebarOpen ? 'ml-64' : 'ml-16')
//         } relative`}
//       >
//         {/* Header */}
//         <Header
//           showNotifications={showNotifications}
//           setShowNotifications={setShowNotifications}
//           toggleSidebar={toggleSidebar}
//           isMobile={isMobile}
//         />
        
//         {/* Main content */}
//         <main className="pt-16 h-full overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100">
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