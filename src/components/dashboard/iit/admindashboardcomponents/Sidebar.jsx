// import React, { useState } from 'react';
// import { Users, FileText, RefreshCcw, Info } from 'lucide-react';

// const Sidebar = ({ activePage, setActivePage }) => {
//   const [requestHandlerOpen, setRequestHandlerOpen] = useState(false);
//   const [updateInfoOpen, setUpdateInfoOpen] = useState(false);

//   return (
//     <div className="w-64 bg-white h-screen fixed left-0 shadow-lg overflow-y-auto">
//       <div className="p-4 border-b">
//         <h1 className="text-xl font-bold text-blue-600">Admin Portal</h1>
//       </div>
//       <nav className="p-4">
//         <ul className="space-y-2">
//           {/* Request Handler Dropdown */}
//           <li>
//             <button
//               onClick={() => setRequestHandlerOpen(!requestHandlerOpen)}
//               className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100"
//             >
//               <div className="flex items-center">
//                 <FileText className="w-5 h-5 mr-3" />
//                 Request Handler
//               </div>
//               <svg
//                 className={`w-4 h-4 transition-transform ${
//                   requestHandlerOpen ? 'rotate-180' : ''
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>
//             {requestHandlerOpen && (
//               <ul className="ml-6 mt-2 space-y-2">
//                 <li>
//                   <button
//                     onClick={() => setActivePage('lectures-request')}
//                     className={`w-full flex items-center p-2 rounded-lg ${
//                       activePage === 'lectures-request' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
//                     }`}
//                   >
//                     Lectures Request Handler
//                   </button>
//                 </li>
//                 <li>
//                   <button
//                     onClick={() => setActivePage('student-request')}
//                     className={`w-full flex items-center p-2 rounded-lg ${
//                       activePage === 'student-request' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
//                     }`}
//                   >
//                     Student Request Handler
//                   </button>
//                 </li>
//               </ul>
//             )}
//           </li>

//           {/* Update Timetable */}
//           <li>
//             <button
//               onClick={() => setActivePage('update-timetable')}
//               className={`w-full flex items-center p-2 rounded-lg ${
//                 activePage === 'update-timetable' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
//               }`}
//             >
//               <RefreshCcw className="w-5 h-5 mr-3" />
//               Update Timetable
//             </button>
//           </li>

//           {/* Update Info Dropdown */}
//           <li>
//             <button
//               onClick={() => setUpdateInfoOpen(!updateInfoOpen)}
//               className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100"
//             >
//               <div className="flex items-center">
//                 <Info className="w-5 h-5 mr-3" />
//                 Update Info
//               </div>
//               <svg
//                 className={`w-4 h-4 transition-transform ${
//                   updateInfoOpen ? 'rotate-180' : ''
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>
//             {updateInfoOpen && (
//               <ul className="ml-6 mt-2 space-y-2">
//                 <li>
//                   <button
//                     onClick={() => setActivePage('update-lecturer-info')}
//                     className={`w-full flex items-center p-2 rounded-lg ${
//                       activePage === 'update-lecturer-info' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
//                     }`}
//                   >
//                     Update Lecturer Info
//                   </button>
//                 </li>
//                 <li>
//                   <button
//                     onClick={() => setActivePage('update-student-info')}
//                     className={`w-full flex items-center p-2 rounded-lg ${
//                       activePage === 'update-student-info' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
//                     }`}
//                   >
//                     Update Student Info
//                   </button>
//                 </li>
//               </ul>
//             )}
//           </li>

//           {/* View Classroom Info */}
//           <li>
//             <button
//               onClick={() => setActivePage('classroom-info')}
//               className={`w-full flex items-center p-2 rounded-lg ${
//                 activePage === 'classroom-info' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
//               }`}
//             >
//               <Users className="w-5 h-5 mr-3" />
//               View Classroom Info
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;



import React, { useState, useEffect, useRef } from 'react';
import { FileText, RefreshCcw, Info, Users, ChevronLeft, Menu, X } from 'lucide-react';

const Sidebar = ({ activePage, setActivePage, isOpen, toggleSidebar, isMobile }) => {
  const [activeDropdown, setActiveDropdown] = useState(null); // "request", "update" or null
  
  // References to store dropdown button positions
  const requestButtonRef = useRef(null);
  const updateButtonRef = useRef(null);
  
  // Handle navigation click
  const handleNavClick = (page) => {
    setActivePage(page);
    setActiveDropdown(null); // Close any open dropdown
    
    if (isMobile) {
      toggleSidebar();
    }
  };

  // Handle dropdown toggles
  const handleDropdownToggle = (dropdown, event) => {
    event.stopPropagation(); // Prevent event bubbling
    
    if (activeDropdown === dropdown) {
      // If clicking the same dropdown, toggle it off
      setActiveDropdown(null);
    } else {
      // If clicking a different dropdown, set it as active
      setActiveDropdown(dropdown);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if we're clicking on a button or menu
      if (
        requestButtonRef.current?.contains(event.target) || 
        updateButtonRef.current?.contains(event.target) ||
        event.target.closest('.dropdown-menu')
      ) {
        return;
      }
      
      // Otherwise, close active dropdown
      if (activeDropdown) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  // Close dropdowns when sidebar collapses or opens
  useEffect(() => {
    setActiveDropdown(null);
  }, [isOpen]);

  // Determine if a main tab is active based on the current active page
  const isRequestActive = activePage === 'lectures-request' || activePage === 'student-request';
  const isUpdateInfoActive = activePage === 'update-lecturer-info' || activePage === 'update-student-info';

  // Calculate positions for popups
  const getPopupPosition = (ref) => {
    if (!ref.current) return { top: 0 };
    const rect = ref.current.getBoundingClientRect();
    return { top: rect.top, left: rect.right };
  };

  return (
    <div 
      className={`bg-gradient-to-br from-emerald-500 to-cyan-600 text-white fixed h-full z-50 transition-all duration-300
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
      ${isMobile ? 'w-64' : isOpen ? 'w-64' : 'w-16 md:translate-x-0'} 
      shadow-xl`}
    >
      <div className="flex items-center justify-between p-4 border-b border-cyan-400">
        {isMobile ? (
          <>
            <h1 className="text-xl text-white">S P A C E F I X</h1>
            <button onClick={toggleSidebar} className="text-gray-300 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </>
        ) : isOpen ? (
          <>
            <h1 className="text-xl text-white">S P A C E F I X</h1>
            <button onClick={toggleSidebar} className="text-gray-300 hover:text-white">
              <ChevronLeft className="w-5 h-5" />
            </button>
          </>
        ) : (
          <button onClick={toggleSidebar} className="mx-auto text-gray-300 hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <nav className="p-4 overflow-y-auto" style={{ height: 'calc(100vh - 64px)' }}>
        <ul className="space-y-4">
          {/* Request Handler Dropdown */}
          <li className="relative">
            <button
              ref={requestButtonRef}
              onClick={(e) => handleDropdownToggle('request', e)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                (isRequestActive || activeDropdown === 'request') 
                  ? "bg-emerald-100 text-emerald-600" 
                  : "text-white hover:bg-emerald-50/50 hover:text-emerald-600"
              }`}
            >
              <div className={`flex items-center ${!isOpen && !isMobile && 'justify-center w-full'}`}>
                <FileText className={`w-5 h-5 ${(isOpen || isMobile) ? 'mr-3' : 'mx-auto'}`} />
                {(isOpen || isMobile) && <span>Request Handler</span>}
              </div>
              {(isOpen || isMobile) && (
                <svg
                  className={`w-4 h-4 transition-transform ${
                    activeDropdown === 'request' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
            
            {/* Expanded sidebar dropdown for Request Handler */}
            {activeDropdown === 'request' && (isOpen || isMobile) && (
              <ul className="dropdown-menu ml-6 mt-2 space-y-2">
                <li>
                  <button
                    onClick={() => handleNavClick('lectures-request')}
                    className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                      activePage === 'lectures-request' 
                        ? "bg-emerald-100 text-emerald-600" 
                        : "text-white hover:bg-emerald-50/50 hover:text-emerald-600"
                    }`}
                  >
                    Lectures Request Handler
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('student-request')}
                    className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                      activePage === 'student-request' 
                        ? "bg-emerald-100 text-emerald-600" 
                        : "text-white hover:bg-emerald-50/50 hover:text-emerald-600"
                    }`}
                  >
                    Student Request Handler
                  </button>
                </li>
              </ul>
            )}
            
            {/* Popup menu for collapsed sidebar */}
            {activeDropdown === 'request' && !isOpen && !isMobile && (
              <div className="dropdown-menu fixed left-16 z-50 w-64 bg-white rounded-lg shadow-xl" 
                style={{ top: Math.max(requestButtonRef.current ? requestButtonRef.current.getBoundingClientRect().top : 0, 0) }}>
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-700">Request Handler</h3>
                </div>
                <ul className="p-2">
                  <li className="mb-1">
                    <button
                      onClick={() => handleNavClick('lectures-request')}
                      className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                        activePage === 'lectures-request' 
                          ? "bg-emerald-100 text-emerald-600 font-medium" 
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <FileText className="w-5 h-5 mr-2" />
                      Lectures Request Handler
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavClick('student-request')}
                      className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                        activePage === 'student-request' 
                          ? "bg-emerald-100 text-emerald-600 font-medium" 
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <FileText className="w-5 h-5 mr-2" />
                      Student Request Handler
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>

          {/* Update Timetable */}
          <li>
            <button
              onClick={() => handleNavClick('update-timetable')}
              className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                activePage === 'update-timetable' 
                  ? "bg-emerald-100 text-emerald-600" 
                  : "text-white hover:bg-emerald-50/50 hover:text-emerald-600"
              }`}
            >
              <RefreshCcw className={`w-5 h-5 ${(isOpen || isMobile) ? 'mr-3' : 'mx-auto'}`} />
              {(isOpen || isMobile) && <span>Update Timetable</span>}
            </button>
          </li>

          {/* Update Info Dropdown */}
          <li className="relative">
            <button
              ref={updateButtonRef}
              onClick={(e) => handleDropdownToggle('update', e)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                (isUpdateInfoActive || activeDropdown === 'update')
                  ? "bg-emerald-100 text-emerald-600"
                  : "text-white hover:bg-emerald-50/50 hover:text-emerald-600"
              }`}
            >
              <div className={`flex items-center ${!isOpen && !isMobile && 'justify-center w-full'}`}>
                <Info className={`w-5 h-5 ${(isOpen || isMobile) ? 'mr-3' : 'mx-auto'}`} />
                {(isOpen || isMobile) && <span>Update Info</span>}
              </div>
              {(isOpen || isMobile) && (
                <svg
                  className={`w-4 h-4 transition-transform ${
                    activeDropdown === 'update' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
            
            {/* Expanded sidebar dropdown for Update Info */}
            {activeDropdown === 'update' && (isOpen || isMobile) && (
              <ul className="dropdown-menu ml-6 mt-2 space-y-2">
                <li>
                  <button
                    onClick={() => handleNavClick('update-lecturer-info')}
                    className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                      activePage === 'update-lecturer-info' 
                        ? "bg-emerald-100 text-emerald-600" 
                        : "text-white hover:bg-emerald-50/50 hover:text-emerald-600"
                    }`}
                  >
                    Update Lecturer Info
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('update-student-info')}
                    className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                      activePage === 'update-student-info' 
                        ? "bg-emerald-100 text-emerald-600" 
                        : "text-white hover:bg-emerald-50/50 hover:text-emerald-600"
                    }`}
                  >
                    Update Student Info
                  </button>
                </li>
              </ul>
            )}
            
            {/* Popup menu for collapsed sidebar */}
            {activeDropdown === 'update' && !isOpen && !isMobile && (
              <div className="dropdown-menu fixed left-16 z-50 w-64 bg-white rounded-lg shadow-xl"
                style={{ top: Math.max(updateButtonRef.current ? updateButtonRef.current.getBoundingClientRect().top : 0, 0) }}>
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-700">Update Info</h3>
                </div>
                <ul className="p-2">
                  <li className="mb-1">
                    <button
                      onClick={() => handleNavClick('update-lecturer-info')}
                      className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                        activePage === 'update-lecturer-info' 
                          ? "bg-emerald-100 text-emerald-600 font-medium" 
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Info className="w-5 h-5 mr-2" />
                      Update Lecturer Info
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavClick('update-student-info')}
                      className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                        activePage === 'update-student-info' 
                          ? "bg-emerald-100 text-emerald-600 font-medium" 
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Info className="w-5 h-5 mr-2" />
                      Update Student Info
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>

          {/* View Classroom Info */}
          <li>
            <button
              onClick={() => handleNavClick('classroom-info')}
              className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                activePage === 'classroom-info' 
                  ? "bg-emerald-100 text-emerald-600" 
                  : "text-white hover:bg-emerald-50/50 hover:text-emerald-600"
              }`}
            >
              <Users className={`w-5 h-5 ${(isOpen || isMobile) ? 'mr-3' : 'mx-auto'}`} />
              {(isOpen || isMobile) && <span>View Classroom Info</span>}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;