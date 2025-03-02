import React, { useState } from "react";
import { Users, Clock, MapPin, Book } from "lucide-react";

const LecturerRequestHandler = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      lecturerName: "Dr. Smith",
      classroom: "4LA",
      timeSlot: "14:00 - 16:00",
      date: "2024-02-24",
      purpose: "Guest Lecture - Database Security",
      status: "pending",
      numberOfStudents: 45
    },
    {
      id: 2,
      lecturerName: "Prof. Johnson",
      classroom: "3LC",
      timeSlot: "10:00 - 12:00",
      date: "2024-02-24",
      purpose: "Special Workshop - AI Ethics",
      status: "pending",
      numberOfStudents: 30
    }
  ]);

  const [classrooms] = useState({
    "4LA": {
      capacity: 60,
      currentStatus: "available",
      timeSlots: [
        { time: "08:00 - 10:00", status: "available" },
        { time: "10:00 - 12:00", status: "occupied", lecture: "Database Systems" },
        { time: "14:00 - 16:00", status: "available" }
      ]
    },
    "3LC": {
      capacity: 50,
      currentStatus: "occupied",
      timeSlots: [
        { time: "08:00 - 10:00", status: "occupied", lecture: "Software Engineering" },
        { time: "10:00 - 12:00", status: "available" },
        { time: "14:00 - 16:00", status: "available" }
      ]
    }
  });

  const handleRequest = (requestId, action) => {
    setRequests(prev =>
      prev.map(request =>
        request.id === requestId ? { ...request, status: action } : request
      )
    );
  };

  const isTimeSlotAvailable = (classroom, timeSlot) => {
    const room = classrooms[classroom];
    if (!room) return false;
    
    const slot = room.timeSlots.find(slot => slot.time === timeSlot);
    return slot && slot.status === "available";
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Lecturer Request Handler</h1>
        <p className="text-gray-600">Manage classroom requests from lecturers</p>
      </div>

      {/* Classroom Status */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Classroom Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(classrooms).map(([roomId, data]) => (
            <div key={roomId} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Room {roomId}</h3>
                <span className={`px-2 py-1 rounded text-sm ${
                  data.currentStatus === 'available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {data.currentStatus.toUpperCase()}
                </span>
              </div>
              <div className="space-y-2">
                <div className="border-t pt-2">
                  <p className="font-medium mb-1">Time Slots:</p>
                  {data.timeSlots.map((slot, index) => (
                    <div key={index} className="flex justify-between items-center text-sm py-1">
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

      {/* Lecturer Requests */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Pending Requests</h2>
        
        {requests
          .filter(request => request.status === 'pending')
          .map(request => {
            const isAvailable = isTimeSlotAvailable(request.classroom, request.timeSlot);
            
            return (
              <div key={request.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{request.lecturerName}</h3>
                    <div className="text-sm text-gray-600 space-y-1 mt-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>Room {request.classroom}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{request.timeSlot}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{request.numberOfStudents} students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Book className="w-4 h-4" />
                        <span>{request.purpose}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {isAvailable ? (
                      <button
                        onClick={() => handleRequest(request.id, 'approved')}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                    ) : (
                      <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                        Time slot not available
                      </div>
                    )}
                    <button
                      onClick={() => handleRequest(request.id, 'rejected')}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default LecturerRequestHandler;