import React, { useState, useEffect } from 'react';
import { Clock, MapPin, DoorOpen, DoorClosed, CheckSquare, XSquare, AlertCircle, Loader2 } from 'lucide-react';
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

  // Fetch tasks from Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const tasksRef = collection(db, 'IIT', 'TimeTable', 'allocatetimetable');
        const q = query(tasksRef, where("status", "!=", "completed")); // Optionally filter by status
        
        const querySnapshot = await getDocs(q);
        const tasks = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          tasks.push({
            id: doc.id,
            roomName: data.room || 'No Room',
            bookingTime: data.timeSlot || 'No Time',
            floor: data.floor || 'No Floor',
            building: 'IIT', // Assuming all are in IIT building, adjust as needed
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
    if (newStatus === 'Not Completed') {
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
        status: 'Not Completed',
        reason: reason,
        updatedAt: new Date().toISOString()
      });
      
      // Update local state
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
    } catch (err) {
      console.error("Error updating with reason:", err);
      alert("Failed to update. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch(status.toLowerCase()) {
      case 'not completed':
        return 'bg-red-50 text-red-700';
      case 'completed':
        return 'bg-emerald-50 text-emerald-700';
      case 'opened':
      case 'to be opened':
        return 'bg-emerald-50 text-emerald-700';
      case 'closed':
      case 'to be closed':
        return 'bg-gray-50 text-gray-700';
      case 'pending':
        return 'bg-blue-50 text-blue-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500 mb-4" />
        <p className="text-gray-600">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-screen">
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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
        My Tasks
      </h2>
      
      {myTasks.length === 0 ? (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 text-center">
          <p className="text-gray-600">No tasks assigned. Check back later.</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-5">
          <div className="space-y-6">
            {myTasks.map(task => (
              <div key={task.id} className="space-y-4">
                {/* Task Info Card */}
                <div className={`border-l-4 ${
                  task.id === selectedTaskId && showReasonDialog 
                    ? 'border-l-yellow-500 bg-yellow-50'
                    : 'border-l-emerald-500 bg-white'
                } rounded-lg p-4 shadow-sm`}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <div className="flex items-start">
                        <h3 className="text-gray-900 font-medium">{task.roomName}</h3>
                        <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-700">
                          {task.allocateTo}
                        </span>
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{task.bookingTime}</span>
                          <span className="ml-2 text-sm text-gray-500">({task.day})</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{task.floor}, Building {task.building}</span>
                        </div>
                        {task.notes && (
                          <div className="flex items-start text-gray-600 mt-2">
                            <span className="text-sm italic">Notes: {task.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(task.status)}`}>
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
                        className="w-full p-2 text-sm border border-gray-200 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                          className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
                          disabled={updating}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleReasonSubmit}
                          className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center"
                          disabled={updating}
                        >
                          {updating ? (
                            <>
                              <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                              Submitting...
                            </>
                          ) : 'Submit'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Display Reason if Not Completed */}
                {task.status.toLowerCase() === 'not completed' && task.reason && (
                  <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                    <span className="font-medium">Reason:</span> {task.reason}
                  </div>
                )}

                {/* Status Buttons Group */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => handleStatusChange(task.id, 'To Be Opened')}
                    className="p-2 flex items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={updating}
                  >
                    {updating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Clock className="h-4 w-4 mr-2" />}
                    To Be Opened
                  </button>
                  <button
                    onClick={() => handleStatusChange(task.id, 'Opened')}
                    className="p-2 flex items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={updating}
                  >
                    {updating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <DoorOpen className="h-4 w-4 mr-2" />}
                    Opened
                  </button>
                  <button
                    onClick={() => handleStatusChange(task.id, 'To Be Closed')}
                    className="p-2 flex items-center justify-center rounded-lg border border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={updating}
                  >
                    {updating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Clock className="h-4 w-4 mr-2" />}
                    To Be Closed
                  </button>
                  <button
                    onClick={() => handleStatusChange(task.id, 'Closed')}
                    className="p-2 flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={updating}
                  >
                    {updating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <DoorClosed className="h-4 w-4 mr-2" />}
                    Closed
                  </button>
                  <button
                    onClick={() => handleStatusChange(task.id, 'Completed')}
                    className="p-2 flex items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={updating}
                  >
                    {updating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <CheckSquare className="h-4 w-4 mr-2" />}
                    Completed
                  </button>
                  <button
                    onClick={() => handleStatusChange(task.id, 'Not Completed')}
                    className="p-2 flex items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={updating}
                  >
                    {updating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <XSquare className="h-4 w-4 mr-2" />}
                    Not Completed
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTasks;