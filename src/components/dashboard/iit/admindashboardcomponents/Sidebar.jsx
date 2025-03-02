import React, { useState } from 'react';
import { Users, FileText, RefreshCcw, Info } from 'lucide-react';

const Sidebar = ({ activePage, setActivePage }) => {
  const [requestHandlerOpen, setRequestHandlerOpen] = useState(false);
  const [updateInfoOpen, setUpdateInfoOpen] = useState(false);

  return (
    <div className="w-64 bg-white h-screen fixed left-0 shadow-lg overflow-y-auto">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">Admin Portal</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {/* Request Handler Dropdown */}
          <li>
            <button
              onClick={() => setRequestHandlerOpen(!requestHandlerOpen)}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100"
            >
              <div className="flex items-center">
                <FileText className="w-5 h-5 mr-3" />
                Request Handler
              </div>
              <svg
                className={`w-4 h-4 transition-transform ${
                  requestHandlerOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {requestHandlerOpen && (
              <ul className="ml-6 mt-2 space-y-2">
                <li>
                  <button
                    onClick={() => setActivePage('lectures-request')}
                    className={`w-full flex items-center p-2 rounded-lg ${
                      activePage === 'lectures-request' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                    }`}
                  >
                    Lectures Request Handler
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePage('student-request')}
                    className={`w-full flex items-center p-2 rounded-lg ${
                      activePage === 'student-request' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
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
              onClick={() => setActivePage('update-timetable')}
              className={`w-full flex items-center p-2 rounded-lg ${
                activePage === 'update-timetable' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              <RefreshCcw className="w-5 h-5 mr-3" />
              Update Timetable
            </button>
          </li>

          {/* Update Info Dropdown */}
          <li>
            <button
              onClick={() => setUpdateInfoOpen(!updateInfoOpen)}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100"
            >
              <div className="flex items-center">
                <Info className="w-5 h-5 mr-3" />
                Update Info
              </div>
              <svg
                className={`w-4 h-4 transition-transform ${
                  updateInfoOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {updateInfoOpen && (
              <ul className="ml-6 mt-2 space-y-2">
                <li>
                  <button
                    onClick={() => setActivePage('update-lecturer-info')}
                    className={`w-full flex items-center p-2 rounded-lg ${
                      activePage === 'update-lecturer-info' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                    }`}
                  >
                    Update Lecturer Info
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePage('update-student-info')}
                    className={`w-full flex items-center p-2 rounded-lg ${
                      activePage === 'update-student-info' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
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
              onClick={() => setActivePage('classroom-info')}
              className={`w-full flex items-center p-2 rounded-lg ${
                activePage === 'classroom-info' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              <Users className="w-5 h-5 mr-3" />
              View Classroom Info
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;