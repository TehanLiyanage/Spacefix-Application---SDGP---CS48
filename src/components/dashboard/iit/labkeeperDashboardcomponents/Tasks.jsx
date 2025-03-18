import React, { useState } from 'react';
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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Pending Tasks</h2>
      
      {pendingTasks.length === 0 ? (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-500 text-center py-8">No pending tasks</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {pendingTasks.map(task => (
            <div 
              key={task.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Task Header */}
              <div className="p-4 border-l-4 border-l-emerald-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
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
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                    New Request
                  </span>
                </div>
              </div>

              {/* Requester Info */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-white">
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
              <div className="p-4 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50">
                <button
                  onClick={() => handleDeclineTask(task.id)}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={() => handleAcceptTask(task.id)}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-colors"
                >
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Occupancy Legend */}
      {pendingTasks.length > 0 && (
        <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-md p-4">
          <div className="text-sm text-gray-700 font-medium mb-2">Task Priority Legend:</div>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
              <span className="text-xs text-gray-600">Low (≤30%)</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-orange-500 rounded-full mr-1"></span>
              <span className="text-xs text-gray-600">Medium (30-80%)</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span>
              <span className="text-xs text-gray-600">High (≥80%)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;