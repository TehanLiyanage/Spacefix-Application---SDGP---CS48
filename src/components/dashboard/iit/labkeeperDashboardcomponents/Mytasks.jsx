import React, { useState, useEffect } from 'react';
import { Clock, MapPin, DoorOpen, DoorClosed, CheckSquare, XSquare, AlertCircle, Loader2, Filter, ChevronRight } from 'lucide-react';
import { collection, query, getDocs, doc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig.js'; // Adjust the import path as needed

const MyTasks = () => {
  const [myTasks, setMyTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReasonDialog, setShowReasonDialog] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [reason, setReason] = useState('');
  const [updating, setUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [showAllControls, setShowAllControls] = useState({});

  // Status options
  const statusOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'pending', label: 'Pending' },
    { value: 'to be open', label: 'To Be Open' },
    { value: 'open', label: 'Open' },
    { value: 'to be close', label: 'To Be Close' },
    { value: 'close', label: 'Close' },
    { value: 'complete', label: 'Complete' },
    { value: 'not complete', label: 'Not Complete' }
  ];

  // Fetch tasks from Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const tasksRef = collection(db, 'IIT', 'TimeTable', 'allocatetimetable');
        const q = query(tasksRef); // Get all tasks
        
        const querySnapshot = await getDocs(q);
        const tasks = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          tasks.push({
            id: doc.id,
            roomName: data.room || 'No Room',
            bookingTime: data.timeSlot || 'No Time',
            floor: data.floor || 'No Floor',
            building: 'IIT', // Assuming all are in IIT building
            status: data.status || 'pending',
            allocateTo: data.allocateTo || 'Not specified',
            allocationType: data.allocationType || 'Not specified',
            day: data.day || 'Not specified',
            notes: data.notes || '',
            createdAt: data.createdAt || '',
            reason: data.reason || ''
          });
        });
        
        setMyTasks(tasks);
        setError(null);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    if (newStatus === 'not complete') {
      setSelectedTaskId(taskId);
      setShowReasonDialog(true);
      return;
    }

    try {
      setUpdating(true);
      // Update in Firestore
      const taskRef = doc(db, 'IIT', 'TimeTable', 'allocatetimetable', taskId);
      await updateDoc(taskRef, {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
      
      // Update local state
      setMyTasks(prev => 
        prev.map(task => 
          task.id === taskId ? {...task, status: newStatus} : task
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const handleReasonSubmit = async () => {
    if (!reason) {
      alert('Please select a reason');
      return;
    }
    
    try {
      setUpdating(true);
      // Update in Firestore
      const taskRef = doc(db, 'IIT', 'TimeTable', 'allocatetimetable', selectedTaskId);
      await updateDoc(taskRef, {
        status: 'not complete',
        reason: reason,
        updatedAt: new Date().toISOString()
      });
      
      // Update local state
      setMyTasks(prev => 
        prev.map(task => 
          task.id === selectedTaskId 
            ? {...task, status: 'not complete', reason} 
            : task
        )
      );
      
      setShowReasonDialog(false);
      setReason('');
      setSelectedTaskId(null);
    } catch (err) {
      console.error("Error updating with reason:", err);
      alert("Failed to update. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch(status.toLowerCase()) {
      case 'not complete':
        return 'bg-red-50 text-red-700';
      case 'complete':
        return 'bg-emerald-50 text-emerald-700';
      case 'open':
      case 'to be open':
        return 'bg-emerald-50 text-emerald-700';
      case 'close':
      case 'to be close':
        return 'bg-gray-50 text-gray-700';
      case 'pending':
        return 'bg-blue-50 text-blue-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  // Toggle display of all controls for a specific task
  const toggleControls = (taskId) => {
    setShowAllControls(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  // Filter tasks based on active tab
  const filteredTasks = activeTab === 'all' 
    ? myTasks 
    : myTasks.filter(task => task.status.toLowerCase() === activeTab);

  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500 mb-4" />
        <p className="text-gray-600">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-screen">
        <AlertCircle className="h-8 w-8 text-red-500 mb-4" />
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <h2 className="text-xl sm:text-2xl font-medium text-center text-emerald-600 mb-2 sm:mb-6">
             MyTask
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 text-center">
              Manage classroom allocations and status updates
            </p>
          </div>
          
          {/* Tabs - Scrollable on mobile */}
          <div className="border-b border-gray-200 overflow-x-auto pb-px">
            <div className="flex space-x-4 sm:space-x-8 min-w-max px-1">
              {statusOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setActiveTab(option.value)}
                  className={`py-2 sm:py-3 px-2 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                    activeTab === option.value
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {option.label}
                  <span className="ml-1 sm:ml-2 text-xs font-semibold px-1.5 py-0.5 rounded-full bg-gray-100">
                    {option.value === 'all' 
                      ? myTasks.length 
                      : myTasks.filter(t => t.status.toLowerCase() === option.value).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 sm:py-12 bg-white rounded-lg shadow">
            <div className="inline-block p-4 bg-emerald-50 rounded-full mb-4">
              <Filter className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-sm text-gray-500">
              {activeTab === 'all' 
                ? "You don't have any tasks assigned yet." 
                : `No tasks with status "${activeTab}" found.`}
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map(task => (
              <div key={task.id} className="bg-white overflow-hidden shadow rounded-lg flex flex-col">
                {/* Card Header */}
                <div className="p-3 sm:p-4 flex justify-between items-start border-b border-gray-200">
                  <div>
                    <h3 className="font-medium text-sm sm:text-base text-gray-900">{task.roomName}</h3>
                    <span className="inline-block mt-1 text-xs font-medium rounded-full px-2 py-0.5 bg-blue-50 text-blue-700">
                      {task.allocateTo}
                    </span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
                
                {/* Card Body */}
                <div className="p-3 sm:p-4 flex-grow space-y-2 sm:space-y-3">
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                    <span>{task.bookingTime}</span>
                    <span className="ml-2 text-xs text-gray-500">({task.day})</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                    <span>{task.floor}, Building {task.building}</span>
                  </div>
                  {task.notes && (
                    <div className="text-xs sm:text-sm text-gray-600 pt-2 border-t border-gray-100">
                      <span className="italic block">Notes: {task.notes}</span>
                    </div>
                  )}

                  {/* Show Reason if Not Complete */}
                  {task.status.toLowerCase() === 'not complete' && task.reason && (
                    <div className="p-2 sm:p-3 bg-red-50 text-red-700 text-xs sm:text-sm rounded-lg border border-red-200 mt-2">
                      <span className="font-medium">Reason:</span> {task.reason}
                    </div>
                  )}
                  
                  {/* Reason Dialog */}
                  {showReasonDialog && selectedTaskId === task.id && (
                    <div className="mt-3 p-3 sm:p-4 bg-white rounded-lg border border-yellow-200">
                      <h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-2">
                        Select reason for not completing:
                      </h4>
                      <select
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full p-2 text-xs sm:text-sm border border-gray-200 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        disabled={updating}
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
                          className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
                          disabled={updating}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleReasonSubmit}
                          className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center"
                          disabled={updating}
                        >
                          {updating ? (
                            <>
                              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                              Submitting...
                            </>
                          ) : 'Submit'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Card Footer - Status Actions - Mobile Friendly */}
                <div className="border-t border-gray-200 p-3 sm:p-4">
                  {/* Mobile: Show initial controls with "More" option */}
                  <div className="sm:hidden">
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleStatusChange(task.id, 'open')}
                        className="p-1.5 flex items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={updating}
                      >
                        <DoorOpen className="h-3 w-3 mr-1" />
                        <span className="text-xs">Open</span>
                      </button>
                      <button
                        onClick={() => handleStatusChange(task.id, 'close')}
                        className="p-1.5 flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={updating}
                      >
                        <DoorClosed className="h-3 w-3 mr-1" />
                        <span className="text-xs">Close</span>
                      </button>
                      <button
                        onClick={() => toggleControls(task.id)}
                        className="p-1.5 flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                      >
                        <span className="text-xs mr-1">More</span>
                        <ChevronRight className={`h-3 w-3 transform transition-transform ${showAllControls[task.id] ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                    
                    {/* Additional controls when expanded */}
                    {showAllControls[task.id] && (
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        <button
                          onClick={() => handleStatusChange(task.id, 'to be open')}
                          className="p-1.5 flex items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={updating}
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          <span className="text-xs">To Be Open</span>
                        </button>
                        <button
                          onClick={() => handleStatusChange(task.id, 'to be close')}
                          className="p-1.5 flex items-center justify-center rounded-lg border border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={updating}
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          <span className="text-xs">To Be Close</span>
                        </button>
                        <button
                          onClick={() => handleStatusChange(task.id, 'not complete')}
                          className="p-1.5 flex items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={updating}
                        >
                          <XSquare className="h-3 w-3 mr-1" />
                          <span className="text-xs">Not Complete</span>
                        </button>
                        <button
                          onClick={() => handleStatusChange(task.id, 'complete')}
                          className="p-1.5 flex items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed col-span-3"
                          disabled={updating}
                        >
                          <CheckSquare className="h-3 w-3 mr-1" />
                          <span className="text-xs">Complete</span>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Tablet & Desktop: Show all controls */}
                  <div className="hidden sm:block">
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleStatusChange(task.id, 'open')}
                        className="p-2 flex items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={updating}
                      >
                        <DoorOpen className="h-4 w-4 mr-1" />
                        <span className="text-xs">Open</span>
                      </button>
                      <button
                        onClick={() => handleStatusChange(task.id, 'close')}
                        className="p-2 flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={updating}
                      >
                        <DoorClosed className="h-4 w-4 mr-1" />
                        <span className="text-xs">Close</span>
                      </button>
                      <button
                        onClick={() => handleStatusChange(task.id, 'complete')}
                        className="p-2 flex items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={updating}
                      >
                        <CheckSquare className="h-4 w-4 mr-1" />
                        <span className="text-xs">Complete</span>
                      </button>
                    </div>
                    
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleStatusChange(task.id, 'to be open')}
                        className="p-2 flex items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={updating}
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-xs">To Be Open</span>
                      </button>
                      <button
                        onClick={() => handleStatusChange(task.id, 'to be close')}
                        className="p-2 flex items-center justify-center rounded-lg border border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={updating}
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-xs">To Be Close</span>
                      </button>
                      <button
                        onClick={() => handleStatusChange(task.id, 'not complete')}
                        className="p-2 flex items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={updating}
                      >
                        <XSquare className="h-4 w-4 mr-1" />
                        <span className="text-xs">Not Complete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTasks;