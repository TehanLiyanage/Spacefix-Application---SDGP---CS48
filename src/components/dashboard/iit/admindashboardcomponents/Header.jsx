// // import React from 'react'
// // import { Bell, HelpCircle, User, LogOut } from "lucide-react";
// // import Notifications from './Notification';

// // const Header = ({ showNotifications, setShowNotifications }) => {
// //   const notifications = [
// //     "Assignment deadline in 2 days",
// //     "New course material available",
// //   ]; // Example notifications array

// //   return (
// //     <header className="fixed top-0 right-0 left-64 bg-white h-16 border-b px-6 flex items-center justify-between">
// //       <div className="flex items-center">
// //         <h2 className="text-lg font-semibold text-gray-700">Welcome, John Doe</h2>
// //       </div>
// //       <div className="flex items-center space-x-4">
// //         <Notifications
// //           notifications={notifications}
// //           showNotifications={showNotifications}
// //           setShowNotifications={setShowNotifications}
// //         />
// //         {/* Help Center */}
// //         <button className="p-2 hover:bg-gray-100 rounded-full">
// //           <HelpCircle className="w-6 h-6" />
// //         </button>
// //         {/* User Profile */}
// //         <button className="p-2 hover:bg-gray-100 rounded-full">
// //           <User className="w-6 h-6" />
// //         </button>
// //         {/* Logout */}
// //         <button className="p-2 hover:bg-gray-100 rounded-full text-red-500">
// //           <LogOut className="w-6 h-6" />
// //         </button>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;

// import React from 'react';
// import { Bell, User, Menu } from 'lucide-react';

// const Header = ({ showNotifications, setShowNotifications, toggleSidebar, isMobile }) => {
//   return (
//     <header className="bg-white shadow-sm h-16 z-20 sticky top-0">
//       <div className="flex items-center justify-between h-full px-4">
//         {/* Left section with title and mobile menu toggle */}
//         <div className="flex items-center">
//           {isMobile && (
//             <button 
//               onClick={toggleSidebar} 
//               className="mr-3 text-gray-600 hover:text-gray-900"
//               aria-label="Toggle sidebar"
//             >
//               <Menu className="w-6 h-6" />
//             </button>
//           )}
//           <h2 className="text-lg font-semibold text-emerald-600">Admin Dashboard</h2>
//         </div>
        
//         {/* Right section with notification and profile */}
//         <div className="flex items-center">
//           {/* Notification Bell */}
//           <div className="relative">
//             <button
//               onClick={() => setShowNotifications(!showNotifications)}
//               className="relative p-2 mx-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
//               aria-label="Notifications"
//             >
//               <Bell className="w-5 h-5" />
//               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>
            
//             {/* Notification dropdown - conditionally rendered */}
//             {showNotifications && (
//               <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-50 w-72 sm:w-80 border border-gray-200">
//                 <div className="p-3 border-b border-gray-200">
//                   <h3 className="font-semibold text-gray-800">Notifications</h3>
//                 </div>
//                 <div className="max-h-80 overflow-y-auto">
//                   <div className="p-4 border-b border-gray-100 hover:bg-gray-50">
//                     <p className="text-sm text-gray-800">New request from Student 1</p>
//                     <p className="text-xs text-gray-500 mt-1">10 minutes ago</p>
//                   </div>
//                   <div className="p-4 border-b border-gray-100 hover:bg-gray-50">
//                     <p className="text-sm text-gray-800">New request from Lecturer 2</p>
//                     <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
//                   </div>
//                   <div className="p-4 hover:bg-gray-50">
//                     <p className="text-sm text-gray-800">Schedule update notification</p>
//                     <p className="text-xs text-gray-500 mt-1">Yesterday</p>
//                   </div>
//                 </div>
//                 <div className="p-2 border-t border-gray-200 text-center">
//                   <button className="text-sm text-emerald-600 hover:text-emerald-800 font-medium">
//                     View all notifications
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
          
//           {/* User Profile */}
//           <div className="flex items-center">
//             <div className="text-sm font-medium text-gray-700 mr-2 hidden sm:block">John Doe</div>
//             <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
//               <User className="w-5 h-5" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from 'react';
import { Bell, User, Menu } from 'lucide-react';

const Header = ({ showNotifications, setShowNotifications, toggleSidebar, isMobile }) => {
  return (
    <header className="bg-white shadow-sm h-16 z-20 sticky top-0">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left section with title and mobile menu toggle */}
        <div className="flex items-center">
          {isMobile && (
            <button 
              onClick={toggleSidebar} 
              className="mr-3 p-2 rounded-lg text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
            <h2 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Admin Dashboard</h2>
            </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
                  <div className="relative">
                    <button
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="p-2 rounded-full text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                      aria-label="Notifications"
                    >
                      <Bell className="w-5 h-5 md:w-6 md:h-6" />
                      {/* Notification indicator */}
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                    </button>
        
                    {showNotifications && (
                      <div className="absolute right-0 mt-2 w-64 sm:w-80 bg-white rounded-lg shadow-lg py-2 z-30 border border-gray-200">
                        <div className="px-4 py-2 border-b border-gray-200">
                          <h3 className="font-semibold text-gray-800">Notifications</h3>
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                          <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-800">Class Canceled</p>
                            <p className="text-xs text-gray-500">
                              Object Oriented Programming class is canceled tomorrow.
                            </p>
                            <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                          </div>
                          <div className="px-4 py-3 hover:bg-gray-50">
                            <p className="text-sm font-medium text-gray-800">New Assignment</p>
                            <p className="text-xs text-gray-500">
                              HCI assignment uploaded - due next Friday.
                            </p>
                            <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
        
                  <div className="border-l border-gray-300 h-8 hidden sm:block"></div>
        
                  <div className="flex items-center">
                    <span className="text-gray-700 mr-2">Welcome Admin</span>
                  </div>
                </div>
              </div>
    </header>
  );
};

export default Header;