import React, { useState } from "react";
import { Users, Clock, MapPin, AlertCircle } from "lucide-react";

const StudentRequestHandler = () => {
  const [classroomRequests, setClassroomRequests] = useState({
    "4LA": {
      room: {
        capacity: 60,
        currentStatus: "available",
        ongoingLecture: null,
        timeSlots: [
          { time: "08:00 - 10:00", status: "available" },
          { time: "10:00 - 12:00", status: "occupied", lecture: "Database Systems" },
          { time: "14:00 - 16:00", status: "available" }
        ]
      },
      requests: [
        {
          id: 1,
          groupName: "CS Group 12",
          studentCount: 35,
          timeSlot: "14:00 - 16:00",
          date: "2024-02-24",
          purpose: "Group Study - Database Design",
          status: "pending"
        },
        {
          id: 2,
          groupName: "CS Group 15",
          studentCount: 30,
          timeSlot: "14:00 - 16:00",
          date: "2024-02-24",
          purpose: "Project Discussion",
          status: "pending"
        }
      ]
    },
    "3LC": {
      room: {
        capacity: 50,
        currentStatus: "occupied",
        ongoingLecture: "Software Engineering",
        timeSlots: [
          { time: "08:00 - 10:00", status: "occupied", lecture: "Software Engineering" },
          { time: "10:00 - 12:00", status: "available" },
          { time: "14:00 - 16:00", status: "available" }
        ]
      },
      requests: [
        {
          id: 3,
          groupName: "Engineering Group 5",
          studentCount: 25,
          timeSlot: "10:00 - 12:00",
          date: "2024-02-24",
          purpose: "Project Meeting",
          status: "pending"
        }
      ]
    }
  });

  const handleBulkApproval = (roomId, timeSlot) => {
    setClassroomRequests(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        requests: prev[roomId].requests.map(request => 
          request.timeSlot === timeSlot
            ? { ...request, status: 'approved' }
            : request
        )
      }
    }));
  };

  const handleSingleRequest = (roomId, requestId, action) => {
    setClassroomRequests(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        requests: prev[roomId].requests.map(request => 
          request.id === requestId
            ? { ...request, status: action }
            : request
        )
      }
    }));
  };

  // Helper function to group requests by time slot
  const groupRequestsByTimeSlot = (requests) => {
    return requests.reduce((grouped, request) => {
      const timeSlot = request.timeSlot;
      if (!grouped[timeSlot]) {
        grouped[timeSlot] = [];
      }
      grouped[timeSlot].push(request);
      return grouped;
    }, {});
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Student Request Handler</h1>
        <p className="text-gray-600">Manage classroom requests grouped by room</p>
      </div>

      {/* Classroom Status Overview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Classroom Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(classroomRequests).map(([roomId, data]) => (
            <div key={roomId} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Room {roomId}</h3>
                <span className={`px-2 py-1 rounded text-sm ${
                  data.room.currentStatus === 'available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {data.room.currentStatus.toUpperCase()}
                </span>
              </div>
              <div className="space-y-2">
                <p>Capacity: {data.room.capacity} students</p>
                <div className="border-t pt-2">
                  <p className="font-medium mb-1">Time Slots:</p>
                  {data.room.timeSlots.map((slot, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span>{slot.time}</span>
                      <span className={`${
                        slot.status === 'available' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {slot.status === 'available' ? 'Available' : `Occupied: ${slot.lecture}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Requests By Classroom */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Requests By Classroom</h2>
        
        {Object.entries(classroomRequests).map(([roomId, data]) => {
          const pendingRequests = data.requests.filter(r => r.status === 'pending');
          if (pendingRequests.length === 0) return null;

          const groupedRequests = groupRequestsByTimeSlot(pendingRequests);

          return (
            <div key={roomId} className="bg-white rounded-lg shadow mb-6">
              <div className="border-b p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Room {roomId} Requests</h3>
                  <span className="text-sm text-gray-600">
                    {pendingRequests.length} pending requests
                  </span>
                </div>
              </div>
              <div className="p-4">
                {Object.entries(groupedRequests).map(([timeSlot, requests]) => (
                  <div key={timeSlot} className="mb-6 last:mb-0">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Time Slot: {timeSlot}</h4>
                      <div className="flex gap-2 items-center">
                        <span className="text-sm text-gray-600">
                          Total Students: {requests.reduce((sum, r) => sum + r.studentCount, 0)}
                        </span>
                        {requests.length > 1 && (
                          <button
                            onClick={() => handleBulkApproval(roomId, timeSlot)}
                            className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600"
                          >
                            Approve All
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {requests.map(request => (
                        <div key={request.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{request.groupName}</div>
                              <div className="text-sm text-gray-600 mt-1">
                                <div className="flex items-center gap-2">
                                  <Users className="w-4 h-4" />
                                  <span>{request.studentCount} students</span>
                                </div>
                                <div>{request.purpose}</div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSingleRequest(roomId, request.id, 'approved')}
                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleSingleRequest(roomId, request.id, 'rejected')}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Capacity Warning */}
                {pendingRequests.some(request => request.studentCount > data.room.capacity) && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-yellow-400 mr-2" />
                      <div>
                        <p className="font-medium text-yellow-800">Capacity Warning</p>
                        <p className="text-yellow-700">
                          Some requests exceed the room capacity of {data.room.capacity} students.
                          Consider splitting groups or assigning a larger room.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentRequestHandler;