import React, { useState } from 'react';
import { Users,  Book, HelpCircle, AlertCircle } from 'lucide-react';

const Sidebar = ({ activePage, setActivePage }) => {

  return (
    <div className="w-64 bg-white h-screen fixed left-0 shadow-lg overflow-y-auto">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">Labkeep Portal</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {/*   Tasks tab */}
          <li>
            <button 
                onClick={() => setActivePage('tasks')}
                className={`w-full flex items-center p-2 rounded-lg ${
                    activePage === 'tasks' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                }`}
            >
                <Book className='w-5 h-5 mr-3'/>
                Tasks
            </button>
          </li>

          {/* My Tasks tab  */}
          <li>
            <button
              onClick={() => setActivePage('mytasks')}
              className={`w-full flex items-center p-2 rounded-lg ${
                activePage === 'mytasks' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              <Users className="w-5 h-5 mr-3" />
              My Tasks
            </button>
          </li>

          {/* Help tab */}
          <li>
            <button 
                onClick={() => setActivePage('help')}
                className={`w-full flex items-center p-2 rounded-lg ${
                    activePage === 'help' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                }`}
            >
                <HelpCircle className='w-5 h-5 mr-3'/>
                Help
            </button>
          </li>

          {/* Report Tab */}
          <li>
            <button
                onClick={() => setActivePage('report')}
                className={`w-full flex items-center p-2 rounded-lg ${
                    activePage === 'report' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                }`}
            >
                <AlertCircle className='w-5 h-5 mr-3'/>
                Report
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;