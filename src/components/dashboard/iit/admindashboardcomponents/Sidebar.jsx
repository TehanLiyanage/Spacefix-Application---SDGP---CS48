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


import React, { useState, useEffect } from 'react';
import { FileText, RefreshCcw, Info, Users, ChevronLeft, Menu } from 'lucide-react';

const Sidebar = ({ activePage, setActivePage }) => {
  // Internal state for sidebar open/closed
  const [isOpen, setIsOpen] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null); // "request", "update" or null

  // Determine if a main tab is active based on the current active page
  const isRequestActive = activePage === 'lectures-request' || activePage === 'student-request';
  const isUpdateInfoActive = activePage === 'update-lecturer-info' || activePage === 'update-student-info';

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Handle dropdown toggles with mutual exclusivity
  const handleDropdownToggle = (dropdown) => {
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
      // Check if the click is outside any dropdown button
      if (!event.target.closest('.dropdown-button') && !event.target.closest('.dropdown-menu')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div 
        className={`bg-gradient-to-br from-emerald-500 to-cyan-600 text-white fixed left-0 top-0 h-screen z-40 transition-all duration-300
        ${isOpen ? 'w-64' : 'w-16'}`}
      >
        {isOpen ? (
          // Expanded sidebar header
          <div className="flex items-center justify-between p-4 border-b border-emerald-400/30">
            <h1 className="text-xl font-semibold">S P A C E F I X</h1>
            <button 
              onClick={toggleSidebar} 
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        ) : (
          // Collapsed sidebar header
          <div className="flex justify-center p-4 border-b border-emerald-400/30">
            <button 
              onClick={toggleSidebar} 
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Expand sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        )}

        <nav className="p-4">
          <ul className="space-y-6">
            {/* Request Handler */}
            <li className="relative">
              <button
                onClick={() => handleDropdownToggle('request')}
                className={`dropdown-button w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                  (isRequestActive || activeDropdown === 'request') 
                    ? 'bg-emerald-100 text-emerald-600' 
                    : 'text-white hover:bg-emerald-50/30 hover:text-white'
                }`}
              >
                <div className={`flex items-center ${!isOpen && 'justify-center w-full'}`}>
                  <FileText className={`w-5 h-5 ${isOpen ? 'mr-3' : ''}`} />
                  {isOpen && <span>Request Handler</span>}
                </div>
                {isOpen && (
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
              {activeDropdown === 'request' && isOpen && (
                <ul className="dropdown-menu ml-6 mt-2 space-y-2">
                  <li>
                    <button
                      onClick={() => {
                        setActivePage('lectures-request');
                        setActiveDropdown(null); // Close dropdown after selection
                      }}
                      className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                        activePage === 'lectures-request' 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'text-white hover:bg-emerald-50/30 hover:text-white'
                      }`}
                    >
                      Lectures Request Handler
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setActivePage('student-request');
                        setActiveDropdown(null); // Close dropdown after selection
                      }}
                      className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                        activePage === 'student-request' 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'text-white hover:bg-emerald-50/30 hover:text-white'
                      }`}
                    >
                      Student Request Handler
                    </button>
                  </li>
                </ul>
              )}

              {/* Collapsed sidebar dropdown for Request Handler */}
              {activeDropdown === 'request' && !isOpen && (
                <ul className="dropdown-menu absolute left-16 top-0 bg-white p-2 rounded-md shadow-lg min-w-56 z-50">
                  <li>
                    <button
                      onClick={() => {
                        setActivePage('lectures-request');
                        setActiveDropdown(null); // Close dropdown after selection
                      }}
                      className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                        activePage === 'lectures-request' 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Lectures Request Handler
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setActivePage('student-request');
                        setActiveDropdown(null); // Close dropdown after selection
                      }}
                      className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                        activePage === 'student-request' 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Student Request Handler
                    </button>
                  </li>
                </ul>
              )}
            </li>

            {/* Update Timetable */}
            <li>
              <button
                onClick={() => {
                  setActivePage('update-timetable');
                  setActiveDropdown(null); // Close any open dropdown
                }}
                className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                  activePage === 'update-timetable' 
                    ? 'bg-emerald-100 text-emerald-600' 
                    : 'text-white hover:bg-emerald-50/30 hover:text-white'
                }`}
              >
                <div className={`flex items-center ${!isOpen && 'justify-center w-full'}`}>
                  <RefreshCcw className={`w-5 h-5 ${isOpen ? 'mr-3' : ''}`} />
                  {isOpen && <span>Update Timetable</span>}
                </div>
              </button>
            </li>

            {/* Update Info */}
            <li className="relative">
              <button
                onClick={() => handleDropdownToggle('update')}
                className={`dropdown-button w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                  (isUpdateInfoActive || activeDropdown === 'update')
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'text-white hover:bg-emerald-50/30 hover:text-white'
                }`}
              >
                <div className={`flex items-center ${!isOpen && 'justify-center w-full'}`}>
                  <Info className={`w-5 h-5 ${isOpen ? 'mr-3' : ''}`} />
                  {isOpen && <span>Update Info</span>}
                </div>
                {isOpen && (
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
              {activeDropdown === 'update' && isOpen && (
                <ul className="dropdown-menu ml-6 mt-2 space-y-2">
                  <li>
                    <button
                      onClick={() => {
                        setActivePage('update-lecturer-info');
                        setActiveDropdown(null); // Close dropdown after selection
                      }}
                      className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                        activePage === 'update-lecturer-info' 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'text-white hover:bg-emerald-50/30 hover:text-white'
                      }`}
                    >
                      Update Lecturer Info
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setActivePage('update-student-info');
                        setActiveDropdown(null); // Close dropdown after selection
                      }}
                      className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                        activePage === 'update-student-info' 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'text-white hover:bg-emerald-50/30 hover:text-white'
                      }`}
                    >
                      Update Student Info
                    </button>
                  </li>
                </ul>
              )}

              {/* Collapsed sidebar dropdown for Update Info */}
              {activeDropdown === 'update' && !isOpen && (
                <ul className="dropdown-menu absolute left-16 top-0 bg-white p-2 rounded-md shadow-lg min-w-56 z-50">
                  <li>
                    <button
                      onClick={() => {
                        setActivePage('update-lecturer-info');
                        setActiveDropdown(null); // Close dropdown after selection
                      }}
                      className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                        activePage === 'update-lecturer-info' 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Update Lecturer Info
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setActivePage('update-student-info');
                        setActiveDropdown(null); // Close dropdown after selection
                      }}
                      className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                        activePage === 'update-student-info' 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Update Student Info
                    </button>
                  </li>
                </ul>
              )}
            </li>

            {/* View Classroom Info */}
            <li>
              <button
                onClick={() => {
                  setActivePage('classroom-info');
                  setActiveDropdown(null); // Close any open dropdown
                }}
                className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                  activePage === 'classroom-info' 
                    ? 'bg-emerald-100 text-emerald-600' 
                    : 'text-white hover:bg-emerald-50/30 hover:text-white'
                }`}
              >
                <div className={`flex items-center ${!isOpen && 'justify-center w-full'}`}>
                  <Users className={`w-5 h-5 ${isOpen ? 'mr-3' : ''}`} />
                  {isOpen && <span>View Classroom Info</span>}
                </div>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Invisible overlay to click away from dropdowns when they're open in collapsed mode */}
      {!isOpen && activeDropdown && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </>
  );
};

export default Sidebar;