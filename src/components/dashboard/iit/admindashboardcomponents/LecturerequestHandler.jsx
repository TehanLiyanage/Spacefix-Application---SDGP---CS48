import React, { useState, useEffect } from "react";
import { Users, Clock, MapPin, Book, Calendar, Info, Check, X } from "lucide-react";
import useSocket from "../../../../hooks/useSocket.js";
import axios from "axios";

const LecturerRequestHandler = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { socket, updates } = useSocket("lecturer-requests");

  // Fetch lecturer requests from backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/lecturers/requests");
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

  // Listen for updates from WebSocket
  useEffect(() => {
    if (updates.length > 0) {
      const latestUpdate = updates[updates.length - 1];
      
      // Update the local state when a request status changes
      if (latestUpdate.type === "statusChange") {
        setRequests(prev => 
          prev.map(request => 
            request.id === latestUpdate.requestId 
              ? { ...request, status: latestUpdate.status }
              : request
          )
        );
      }
      
      // Add new request when created
      if (latestUpdate.type === "newRequest") {
        setRequests(prev => [...prev, latestUpdate.request]);
      }
    }
  }, [updates]);

  // Handle request approval or rejection
  const handleRequest = async (requestId, action) => {
    try {
      // Make API call to update status in Firebase
      await axios.put(`http://localhost:5000/api/lecturers/requests/${requestId}/status`, {
        status: action
      });
      
      // Update local state
      setRequests(prev =>
        prev.map(request =>
          request.id === requestId ? { ...request, status: action } : request
        )
      );
      
      // If using socket is preferred over waiting for the backend to emit an update:
      // socket.emit("updateLecturerRequest", { requestId, status: action });
    } catch (err) {
      console.error(`Error ${action === 'approved' ? 'approving' : 'rejecting'} request:`, err);
      setError(`Failed to ${action === 'approved' ? 'approve' : 'reject'} request. Please try again.`);
    }
  };

  // Format time range from start and end times
  const formatTimeRange = (startTime, endTime) => {
    return `${startTime} - ${endTime}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading requests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-lg border border-red-200 text-center m-6">
        <div className="text-red-600 text-xl mb-2">⚠️ {error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const pendingRequests = requests.filter(request => request.status === 'pending');
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Lecturer Request Handler</h1>
          <p className="text-gray-600">Manage and respond to classroom reservation requests</p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 font-medium mb-2">Pending Requests</h3>
            <p className="text-3xl font-bold text-blue-600">{pendingRequests.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 font-medium mb-2">Approved</h3>
            <p className="text-3xl font-bold text-green-600">
              {requests.filter(r => r.status === 'approved').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 font-medium mb-2">Rejected</h3>
            <p className="text-3xl font-bold text-red-600">
              {requests.filter(r => r.status === 'rejected').length}
            </p>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Pending Requests</h2>
          
          {pendingRequests.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-1">All caught up!</h3>
              <p className="text-gray-500">There are no pending requests to review at this time.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {pendingRequests.map(request => (
                <div key={request.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md">
                  <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 text-blue-700 font-medium">
                    {request.taskType === "extra_lecture" ? "Extra Lecture Request" : "Room Reservation"}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-wrap justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          {request.lecturer?.name || "Unknown Lecturer"}
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <span>{request.date}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-5 h-5 text-gray-400" />
                            <span>{formatTimeRange(request.startTime, request.endTime)}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-5 h-5 text-gray-400" />
                            <span>Hall Size: {request.hallSize}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-5 h-5 text-gray-400" />
                            <span>{request.studentCount} students</span>
                          </div>

                          <div className="md:col-span-2 flex items-start gap-2 text-gray-600 mt-2">
                            <Info className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-700 mb-1">Admin Note:</p>
                              <p>{request.adminNote || "No note provided"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3">
                        <button
                          onClick={() => handleRequest(request.id, 'approved')}
                          className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors min-w-40"
                        >
                          <Check className="w-5 h-5" />
                          <span>Approve</span>
                        </button>
                        
                        <button
                          onClick={() => handleRequest(request.id, 'rejected')}
                          className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors min-w-40"
                        >
                          <X className="w-5 h-5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-500">
                      Submitted: {request.submittedAtFormatted}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recently Processed Requests */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Recently Processed Requests</h2>
          
          <div className="space-y-4">
            {requests
              .filter(request => request.status !== 'pending')
              .slice(0, 5) // Show only the 5 most recent processed requests
              .map(request => (
                <div key={request.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {request.lecturer?.name || "Unknown Lecturer"}
                      </h3>
                      <div className="text-sm text-gray-500 mt-1">
                        {request.date} • {formatTimeRange(request.startTime, request.endTime)}
                      </div>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      request.status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {request.status === 'approved' ? 'Approved' : 'Rejected'}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerRequestHandler;