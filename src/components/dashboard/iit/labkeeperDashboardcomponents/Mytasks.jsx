import React, { useState } from 'react';
import { Clock, MapPin, DoorOpen, DoorClosed, CheckSquare, XSquare } from 'lucide-react';

const MyTasks = () => {
  const [myTasks, setMyTasks] = useState([
    {
      id: '1',
      roomName: 'Computer Lab A',
      bookingTime: '10:00 - 12:00',
      floor: 1,
      building: 'Tech',
      status: 'To Be Opened'
    },
    {
      id: '2',
      roomName: 'Physics Lab',
      bookingTime: '14:00 - 16:00',
      floor: 3,
      building: 'Science',
      status: 'Opened'
    }
  ]);

  const [showReasonDialog, setShowReasonDialog] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [reason, setReason] = useState('');

  const handleStatusChange = (taskId, newStatus) => {
    if (newStatus === 'Not Completed') {
      setSelectedTaskId(taskId);
      setShowReasonDialog(true);
      return;
    }

    setMyTasks(prev => 
      prev.map(task => 
        task.id === taskId ? {...task, status: newStatus} : task
      )
    );
  };

  const handleReasonSubmit = () => {
    if (!reason) {
      alert('Please select a reason');
      return;
    }
    
    setMyTasks(prev => 
      prev.map(task => 
        task.id === selectedTaskId 
          ? {...task, status: 'Not Completed', reason} 
          : task
      )
    );
    setShowReasonDialog(false);
    setReason('');
    setSelectedTaskId(null);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome to Spacefix</h1>
        <p className="text-gray-600 mt-1">Select a feature to get started</p>
      </div>

      {/* Space Booking Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Space Booking</h2>
        <div className="space-y-6">
          {myTasks.map(task => (
            <div key={task.id} className="space-y-4">
              {/* Task Info Card */}
              <div className={`border-l-4 ${
                task.id === selectedTaskId && showReasonDialog 
                  ? 'border-l-yellow-500 bg-yellow-50'
                  : 'border-l-cyan-500 bg-white'
              } rounded-lg p-4`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-gray-900 font-medium">{task.roomName}</h3>
                    <div className="mt-2 space-y-1">
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
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    task.status === 'Not Completed' 
                      ? 'bg-red-50 text-red-700'
                      : 'bg-cyan-50 text-cyan-700'
                  }`}>
                    {task.status}
                  </span>
                </div>

                {/* Reason Selection Dialog */}
                {showReasonDialog && selectedTaskId === task.id && (
                  <div className="mt-4 p-4 bg-white rounded-lg border border-yellow-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Select reason for not completing:
                    </h4>
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full p-2 text-sm border border-gray-200 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="">Select a reason</option>
                      <option value="Can't open the room">Can't open the room</option>
                      <option value="Key is missing">Key is missing</option>
                      <option value="Room is already in use">Room is already in use</option>
                      <option value="Time changed">Time changed</option>
                      <option value="Booked by another person">Booked by another person</option>
                      <option value="Technical issue">Technical issue</option>
                      <option value="Security concern">Security concern</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setShowReasonDialog(false);
                          setReason('');
                          setSelectedTaskId(null);
                        }}
                        className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleReasonSubmit}
                        className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Display Reason if Not Completed */}
              {task.status === 'Not Completed' && task.reason && (
                <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                  <span className="font-medium">Reason:</span> {task.reason}
                </div>
              )}

              {/* Status Buttons Group */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleStatusChange(task.id, 'To Be Opened')}
                  className="p-2 flex items-center justify-center rounded-lg border border-cyan-200 bg-cyan-50 text-cyan-700"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  To Be Opened
                </button>
                <button
                  onClick={() => handleStatusChange(task.id, 'Opened')}
                  className="p-2 flex items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700"
                >
                  <DoorOpen className="h-4 w-4 mr-2" />
                  Opened
                </button>
                <button
                  onClick={() => handleStatusChange(task.id, 'To Be Closed')}
                  className="p-2 flex items-center justify-center rounded-lg border border-yellow-200 bg-yellow-50 text-yellow-700"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  To Be Closed
                </button>
                <button
                  onClick={() => handleStatusChange(task.id, 'Closed')}
                  className="p-2 flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-700"
                >
                  <DoorClosed className="h-4 w-4 mr-2" />
                  Closed
                </button>
                <button
                  onClick={() => handleStatusChange(task.id, 'Completed')}
                  className="p-2 flex items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700"
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Completed
                </button>
                <button
                  onClick={() => handleStatusChange(task.id, 'Not Completed')}
                  className="p-2 flex items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-700"
                >
                  <XSquare className="h-4 w-4 mr-2" />
                  Not Completed
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTasks;