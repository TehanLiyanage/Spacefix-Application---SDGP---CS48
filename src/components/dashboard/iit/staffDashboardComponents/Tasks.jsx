import React, { useState, useEffect } from 'react';
import { Clock, MapPin } from 'lucide-react';

const Tasks = () => {
  const [pendingTasks, setPendingTasks] = useState([
    {
      id: '1',
      roomName: 'Lab 101',
      bookingTime: '09:00 - 11:00',
      floor: 1,
      building: 'Main',
      requesterName: 'John Smith',
      additionalInfo: 'Need the room setup for presentation'
    },
    {
      id: '2',
      roomName: 'Lab 203',
      bookingTime: '13:00 - 15:00',
      floor: 2,
      building: 'Science',
      requesterName: 'Emily Johnson',
      additionalInfo: null
    }
  ]);

  const handleAcceptTask = (taskId) => {
    setPendingTasks(prev => prev.filter(task => task.id !== taskId));
    // Additional logic for accepting task
  };

  const handleDeclineTask = (taskId) => {
    setPendingTasks(prev => prev.filter(task => task.id !== taskId));
    // Additional logic for declining task
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome to Spacefix</h1>
        <p className="text-gray-600 mt-1">Select a feature to get started</p>
      </div>

      {/* Pending Tasks Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Pending Tasks</h2>
        
        {pendingTasks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No pending tasks</p>
        ) : (
          <div className="space-y-4">
            {pendingTasks.map(task => (
              <div 
                key={task.id} 
                className="bg-white rounded-lg border-l-4 border-l-blue-500 shadow-sm overflow-hidden"
              >
                {/* Task Header */}
                <div className="p-4 bg-blue-50/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {task.roomName}
                      </h3>
                      <div className="space-y-1 mt-1">
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{task.bookingTime}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>Floor {task.floor}, Building {task.building}</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200">
                      New Request
                    </span>
                  </div>
                </div>

                {/* Requester Info */}
                <div className="p-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-gray-600">
                        {task.requesterName.charAt(0)}
                      </span>
                    </div>
                    <span className="text-gray-600">
                      Requested by: <span className="font-medium">{task.requesterName}</span>
                    </span>
                  </div>

                  {task.additionalInfo && (
                    <div className="mt-3 text-sm text-gray-600 italic bg-gray-50 p-3 rounded-md">
                      "{task.additionalInfo}"
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="p-4 border-t border-gray-100 flex justify-end space-x-3">
                  <button
                    onClick={() => handleDeclineTask(task.id)}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => handleAcceptTask(task.id)}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;