import React, { useState, useEffect } from "react";
import { Users, Clock, MapPin, Book, Calendar, Info, Check, X, MessageSquare, Home } from "lucide-react";
import useSocket from "../../../../hooks/useSockets.js";
import axios from "axios";

// Use Vite environment variable with fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
// const API_BASE_URL = "https://spacefix-application-backend-sdgp-cs48.onrender.com"

const LecturerRequestHandler = () => {
  const [requests, setRequests] = useState({
    today: [],
    upcoming: [],
    previous: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("today");
  const [approvalData, setApprovalData] = useState({
    isOpen: false,
    requestId: null,
    approvalMessage: "",
    allocatedRoom: "",
    error: null
  });
  const [rejectionData, setRejectionData] = useState({
    isOpen: false,
    requestId: null,
    rejectionReason: "",
    error: null
  });
  
  const { socket, updates } = useSocket("lecturer-requests");

  // Fetch lecturer requests from backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // const response = await axios.get("http://localhost:5000/api/lecturer/requests");
        const response = await axios.get(`${API_BASE_URL}/api/lecturer/requests`);
        setRequests(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching lecturer requests:", err);
        setError("Failed to load requests. Please try again later.");
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Handle initial data received from WebSocket
  useEffect(() => {
    if (socket) {
      socket.on('initialLecturerData', (data) => {
        console.log('Received initial data:', data);
        setRequests(data);
        setLoading(false);
      });
      
      return () => {
        socket.off('initialLecturerData');
      };
    }
  }, [socket]);

  // Listen for updates from WebSocket
  useEffect(() => {
    if (updates.length > 0) {
      const latestUpdate = updates[updates.length - 1];
      
      if (latestUpdate.type === "statusChange") {
        // Update the request in the appropriate category
        setRequests(prev => {
          const updatedRequests = { ...prev };
          
          // Find and update the request in all categories
          ['today', 'upcoming', 'previous'].forEach(category => {
            const index = updatedRequests[category].findIndex(req => req.id === latestUpdate.requestId);
            if (index !== -1) {
              updatedRequests[category][index] = {
                ...updatedRequests[category][index],
                ...latestUpdate.request
              };
            }
          });
          
          return updatedRequests;
        });
      } else if (latestUpdate.type === "created") {
        // Add new request to the appropriate category based on date
        const requestDate = new Date(latestUpdate.request.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        setRequests(prev => {
          const updatedRequests = { ...prev };
          
          if (requestDate.getTime() === today.getTime()) {
            updatedRequests.today = [...updatedRequests.today, latestUpdate.request];
          } else if (requestDate > today) {
            updatedRequests.upcoming = [...updatedRequests.upcoming, latestUpdate.request];
          } else {
            updatedRequests.previous = [...updatedRequests.previous, latestUpdate.request];
          }
          
          return updatedRequests;
        });
      } else if (latestUpdate.type === "deleted") {
        // Remove the request from all categories
        setRequests(prev => {
          const updatedRequests = { ...prev };
          
          ['today', 'upcoming', 'previous'].forEach(category => {
            updatedRequests[category] = updatedRequests[category].filter(
              req => req.id !== latestUpdate.requestId
            );
          });
          
          return updatedRequests;
        });
      } else if (latestUpdate.type === "updated") {
        // Update the request details in all categories
        setRequests(prev => {
          const updatedRequests = { ...prev };
          
          ['today', 'upcoming', 'previous'].forEach(category => {
            const index = updatedRequests[category].findIndex(req => req.id === latestUpdate.requestId);
            if (index !== -1) {
              updatedRequests[category][index] = {
                ...updatedRequests[category][index],
                ...latestUpdate.request
              };
            }
          });
          
          return updatedRequests;
        });
      }
    }
  }, [updates]);

  // Open approval dialog
  const openApprovalDialog = (requestId) => {
    setApprovalData({
      isOpen: true,
      requestId,
      approvalMessage: "",
      allocatedRoom: "",
      error: null
    });
  };

  // Open rejection dialog
  const openRejectionDialog = (requestId) => {
    setRejectionData({
      isOpen: true,
      requestId,
      rejectionReason: "",
      error: null
    });
  };

  // Close approval dialog
  const closeApprovalDialog = () => {
    setApprovalData({
      isOpen: false,
      requestId: null,
      approvalMessage: "",
      allocatedRoom: "",
      error: null
    });
  };

  // Close rejection dialog
  const closeRejectionDialog = () => {
    setRejectionData({
      isOpen: false,
      requestId: null,
      rejectionReason: "",
      error: null
    });
  };

  // Handle request approval
  const handleApprove = async (e) => {
    e.preventDefault();
    
    if (!approvalData.allocatedRoom) {
      setApprovalData(prev => ({
        ...prev,
        error: "Room allocation is required for approval"
      }));
      return;
    }
    
    try {
      // await axios.put(`http://localhost:5000/api/lecturer/requests/${approvalData.requestId}/status`, {
        await axios.put(`${API_BASE_URL}/api/lecturer/requests/${approvalData.requestId}/status`, {
        status: 'approved',
        approvalMessage: approvalData.approvalMessage,
        allocatedRoom: approvalData.allocatedRoom
      });
      
      closeApprovalDialog();
    } catch (err) {
      console.error("Error approving request:", err);
      setApprovalData(prev => ({
        ...prev,
        error: "Failed to approve request. Please try again."
      }));
    }
  };

  // Handle request rejection
  const handleReject = async (e) => {
    e.preventDefault();
    
    try {
      // await axios.put(`http://localhost:5000/api/lecturer/requests/${rejectionData.requestId}/status`, {
        await axios.put(`${API_BASE_URL}/api/lecturer/requests/${rejectionData.requestId}/status`, {
        status: 'rejected',
        rejectionReason: rejectionData.rejectionReason
      });
      
      closeRejectionDialog();
    } catch (err) {
      console.error("Error rejecting request:", err);
      setRejectionData(prev => ({
        ...prev,
        error: "Failed to reject request. Please try again."
      }));
    }
  };

  // Handle request deletion
  const handleDelete = async (requestId) => {
    if (!window.confirm("Are you sure you want to delete this request?")) {
      return;
    }
    
    try {
      // await axios.delete(`http://localhost:5000/api/lecturer/requests/${requestId}`);
      await axios.delete(`${API_BASE_URL}/api/lecturer/requests/${requestId}`);
      // No need to update state manually as we'll receive a WebSocket update
    } catch (err) {
      console.error("Error deleting request:", err);
      setError("Failed to delete request. Please try again.");
    }
  };

  // Format time range from start and end times
  const formatTimeRange = (startTime, endTime) => {
    return `${startTime} - ${endTime}`;
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading requests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-lg border border-red-200 text-center max-w-6xl mx-auto mt-6">
        <div className="text-red-600 text-xl mb-2">⚠️ {error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Get all pending requests across categories
  const pendingRequests = [
    ...requests.today.filter(request => request.status === 'pending'),
    ...requests.upcoming.filter(request => request.status === 'pending')
  ];
  
  // Get the active tab's requests
  const activeRequests = requests[activeTab] || [];
  const pendingCount = pendingRequests.length;
  const approvedCount = [...requests.today, ...requests.upcoming, ...requests.previous]
    .filter(r => r.status === 'approved').length;
  const rejectedCount = [...requests.today, ...requests.upcoming, ...requests.previous]
    .filter(r => r.status === 'rejected').length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-0">
      <h2 className="text-xl sm:text-2xl font-medium text-center text-emerald-600 mb-6">
        Lecturer Request Handler
      </h2>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-md shadow p-5">
          <h3 className="text-sm font-medium text-gray-700 mb-1">Pending Requests</h3>
          <p className="text-2xl font-bold text-emerald-600">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-md shadow p-5">
          <h3 className="text-sm font-medium text-gray-700 mb-1">Approved</h3>
          <p className="text-2xl font-bold text-emerald-600">{approvedCount}</p>
        </div>
        <div className="bg-white rounded-md shadow p-5">
          <h3 className="text-sm font-medium text-gray-700 mb-1">Rejected</h3>
          <p className="text-2xl font-bold text-emerald-600">{rejectedCount}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex overflow-x-auto pb-2 mb-4">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md border mr-2 flex-shrink-0 ${
            activeTab === 'today'
              ? "bg-emerald-500 text-white border-emerald-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab('today')}
        >
          Today
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md border mr-2 flex-shrink-0 ${
            activeTab === 'upcoming'
              ? "bg-emerald-500 text-white border-emerald-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md border mr-2 flex-shrink-0 ${
            activeTab === 'previous'
              ? "bg-emerald-500 text-white border-emerald-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab('previous')}
        >
          Previous
        </button>
      </div>

      {/* Pending Requests */}
      {activeTab !== 'previous' && (
        <div className="mb-6">
          <div className="bg-white rounded-md shadow mb-6">
            <div className="px-5 py-3 border-b border-gray-200">
              <h3 className="text-md font-medium text-emerald-600">
                {activeTab === 'today' ? "Today's" : "Upcoming"} Pending Requests
              </h3>
            </div>
            
            {activeRequests.filter(request => request.status === 'pending').length === 0 ? (
              <div className="p-5 text-center">
                <p className="text-gray-500">There are no pending requests to review for {activeTab === 'today' ? 'today' : 'upcoming dates'}.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {activeRequests
                  .filter(request => request.status === 'pending')
                  .map(request => (
                    <div key={request.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <div className="mb-4 sm:mb-0">
                          <h4 className="font-medium text-gray-800">{request.lecturerName}</h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mt-2">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-sm">Date: {formatDate(request.date)}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm">Time: {formatTimeRange(request.startTime, request.endTime)}</span>
                            </div>

                            {request.lecturer && request.lecturer.name && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Users className="w-4 h-4 text-gray-400" />
                                <span className="text-sm">Lecturer: {request.lecturer.name}</span>
                              </div>
                            )}

                            {request.studentCount && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Users className="w-4 h-4 text-gray-400" />
                                <span className="text-sm">Student Count: {request.studentCount}</span>
                              </div>
                            )}

                            {request.taskType && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Book className="w-4 h-4 text-gray-400" />
                                <span className="text-sm">Task Type: {request.taskType === "extra_lecture" ? "Extra Lecture" : request.taskType}</span>
                              </div>
                            )}

                            {request.hallSize && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Home className="w-4 h-4 text-gray-400" />
                                <span className="text-sm">Hall Size: {request.hallSize}</span>
                              </div>
                            )}

                            {request.email && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <span className="text-sm">Email: {request.email}</span>
                              </div>
                            )}

                            {request.phone && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <span className="text-sm">Phone: {request.phone}</span>
                              </div>
                            )}
                          </div>

                          {request.lectureNote && (
                            <div className="flex items-start gap-2 text-gray-600 mt-2">
                              <Info className="w-4 h-4 text-gray-400 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-gray-700">Lecture Note:</p>
                                <p className="text-sm">{request.lectureNote}</p>
                              </div>
                            </div>
                          )}

                          {request.additionalInfo && (
                            <div className="flex items-start gap-2 text-gray-600 mt-2">
                              <Info className="w-4 h-4 text-gray-400 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-gray-700">Additional Information:</p>
                                <p className="text-sm">{request.additionalInfo}</p>
                              </div>
                            </div>
                          )}

                          <div className="mt-2 text-xs text-gray-500">
                            Submitted: {new Date(request.createdAt).toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="flex flex-row sm:flex-col gap-2">
                          <button
                            onClick={() => openApprovalDialog(request.id)}
                            className="px-3 py-2 text-sm bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
                          >
                            Approve
                          </button>
                          
                          <button
                            onClick={() => openRejectionDialog(request.id)}
                            className="px-3 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                          >
                            Reject
                          </button>
                          
                          <button
                            onClick={() => handleDelete(request.id)}
                            className="px-3 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Processed Requests */}
      <div className="bg-white rounded-md shadow">
        <div className="px-5 py-3 border-b border-gray-200">
          <h3 className="text-md font-medium text-emerald-600">
            {activeTab === 'previous' ? 'Previous' : activeTab === 'today' ? "Today's" : "Upcoming"} Processed Requests
          </h3>
        </div>
        
        {activeRequests.filter(request => request.status !== 'pending').length === 0 ? (
          <div className="p-5 text-center">
            <p className="text-gray-500">There are no processed requests for {activeTab === 'today' ? 'today' : activeTab === 'upcoming' ? 'upcoming dates' : 'previous dates'}.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {activeRequests
              .filter(request => request.status !== 'pending')
              .map(request => (
                <div key={request.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div>
                      <h4 className="font-medium text-gray-800">{request.lecturerName}</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 mt-2">
                        <div className="text-sm text-gray-600">
                          <strong>Date:</strong> {formatDate(request.date)}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Time:</strong> {formatTimeRange(request.startTime, request.endTime)}
                        </div>
                        
                        {request.lecturer && request.lecturer.name && (
                          <div className="text-sm text-gray-600">
                            <strong>Lecturer:</strong> {request.lecturer.name}
                          </div>
                        )}
                        
                        {request.taskType && (
                          <div className="text-sm text-gray-600">
                            <strong>Task Type:</strong> {request.taskType === "extra_lecture" ? "Extra Lecture" : request.taskType}
                          </div>
                        )}
                        
                        {request.studentCount && (
                          <div className="text-sm text-gray-600">
                            <strong>Student Count:</strong> {request.studentCount}
                          </div>
                        )}
                      </div>
                      
                      {request.status === 'approved' && request.allocatedRoom && (
                        <div className="flex items-center gap-1 text-sm text-emerald-600 mt-2">
                          <Home className="w-4 h-4" />
                          <strong>Room:</strong> {request.allocatedRoom}
                        </div>
                      )}
                      
                      {request.status === 'approved' && request.approvalMessage && (
                        <div className="flex items-start gap-1 text-sm text-gray-600 mt-2">
                          <MessageSquare className="w-4 h-4 mt-0.5" />
                          <div>
                            <strong>Message:</strong> {request.approvalMessage}
                          </div>
                        </div>
                      )}
                      
                      {request.status === 'rejected' && request.rejectionReason && (
                        <div className="flex items-start gap-1 text-sm text-gray-600 mt-2">
                          <MessageSquare className="w-4 h-4 mt-0.5" />
                          <div>
                            <strong>Reason:</strong> {request.rejectionReason}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center mt-4 sm:mt-0">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${
                        request.status === 'approved' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {request.status === 'approved' ? 'Approved' : 'Rejected'}
                      </div>
                      
                      <button
                        onClick={() => handleDelete(request.id)}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Approval Dialog */}
      {approvalData.isOpen && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-md max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-medium text-emerald-600 mb-4">Approve Request</h3>
            
            {approvalData.error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {approvalData.error}
              </div>
            )}
            
            <form onSubmit={handleApprove}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Allocated Room <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={approvalData.allocatedRoom}
                  onChange={(e) => setApprovalData(prev => ({ ...prev, allocatedRoom: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g., A-201"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Approval Message
                </label>
                <textarea
                  value={approvalData.approvalMessage}
                  onChange={(e) => setApprovalData(prev => ({ ...prev, approvalMessage: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Add any instructions or information for the lecturer..."
                  rows="4"
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={closeApprovalDialog}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors text-sm"
                >
                  Approve
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rejection Dialog */}
      {rejectionData.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-medium text-emerald-600 mb-4">Reject Request</h3>
            
            {rejectionData.error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {rejectionData.error}
              </div>
            )}
            
            <form onSubmit={handleReject}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Rejection
                </label>
                <textarea
                  value={rejectionData.rejectionReason}
                  onChange={(e) => setRejectionData(prev => ({ ...prev, rejectionReason: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Explain why the request is being rejected..."
                  rows="4"
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={closeRejectionDialog}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
                >
                  Reject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LecturerRequestHandler;