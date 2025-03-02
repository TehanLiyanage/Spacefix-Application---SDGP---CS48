import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Book, AlertTriangle, CheckCircle } from 'lucide-react';

const ViewClassroomInfo = () => {
  // State for selected day and floor
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedFloor, setSelectedFloor] = useState('All Floors');
  
  // Mock data - would be replaced with Firestore data
  const [classroomData, setClassroomData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const floors = ['All Floors', '1st Floor', '2nd Floor', '3rd Floor', '4th Floor', '5th Floor', '6th Floor', '7th Floor'];
  
  // Room capacity information
  const roomCapacity = {
    '3LA': 120,
    '3LB': 100,
    '3LC': 80,
    '3LD': 60,
    '4LA': 150,
    '5LA': 90
  };

  // Simulating Firestore data fetch
  useEffect(() => {
    // This would be replaced with actual Firestore query
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        // Mock data structure
        const mockData = [
          {
            id: '1',
            floor: '3rd Floor',
            room: '3LA',
            day: 'Monday',
            status: 'occupied',
            timeSlot: '08:30-10:30',
            courseCode: 'SSENG003C',
            lecturer: 'KALW',
            type: 'LEC',
            locationType: 'PHYSICAL',
            headCount: 95
          },
          {
            id: '2',
            floor: '3rd Floor',
            room: '3LB',
            day: 'Monday',
            status: 'available',
            timeSlot: '08:30-10:30'
          },
          {
            id: '3',
            floor: '3rd Floor',
            room: '3LC',
            day: 'Monday',
            status: 'event',
            timeSlot: '08:30-12:30',
            eventName: 'Computer Science Seminar',
            organizer: 'CS Department',
            headCount: 65
          },
          {
            id: '4',
            floor: '4th Floor',
            room: '4LA',
            day: 'Monday',
            status: 'student-allocated',
            timeSlot: '10:30-12:30',
            requestedBy: 'Student Council',
            purpose: 'Study Group',
            headCount: 25
          },
          {
            id: '5',
            floor: '3rd Floor',
            room: '3LD',
            day: 'Monday',
            status: 'occupied',
            timeSlot: '10:30-12:30',
            courseCode: '5COSC024C',
            lecturer: 'DRRM',
            type: 'LAB',
            locationType: 'PHYSICAL',
            headCount: 45
          },
          {
            id: '6',
            floor: '5th Floor',
            room: '5LA',
            day: 'Monday',
            status: 'maintenance',
            timeSlot: 'All Day',
            maintenanceType: 'Projector Repair'
          }
        ];
        
        setClassroomData(mockData);
        setLoading(false);
      }, 1000);
    };
    
    fetchData();
  }, [selectedDay]);
  
  // Filter data based on selected day and floor
  const filteredData = classroomData.filter(room => {
    if (selectedFloor === 'All Floors') {
      return room.day === selectedDay;
    }
    return room.day === selectedDay && room.floor === selectedFloor;
  });
  
  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      occupied: { color: 'bg-blue-100 text-blue-800', text: 'Lecture' },
      available: { color: 'bg-green-100 text-green-800', text: 'Available' },
      event: { color: 'bg-purple-100 text-purple-800', text: 'Event' },
      'student-allocated': { color: 'bg-yellow-100 text-yellow-800', text: 'Student Allocated' },
      maintenance: { color: 'bg-red-100 text-red-800', text: 'Maintenance' }
    };
    
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', text: 'Unknown' };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6">Classroom Information Dashboard</h1>
      
      {/* Day selection */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3 flex items-center">
          <Calendar className="mr-2 h-5 w-5" /> Select Day
        </h2>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedDay === day
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      
      {/* Floor selection */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3">Select Floor</h2>
        <select
          value={selectedFloor}
          onChange={(e) => setSelectedFloor(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {floors.map(floor => (
            <option key={floor} value={floor}>
              {floor}
            </option>
          ))}
        </select>
      </div>
      
      {/* Classroom grid */}
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-3">
          Classrooms for {selectedDay} - {selectedFloor}
        </h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading classroom data...</p>
            </div>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-gray-500">No classroom data available for the selected criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.map(classroom => (
              <div key={classroom.id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b bg-gray-50">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800">Room {classroom.room}</h3>
                    <StatusBadge status={classroom.status} />
                  </div>
                  <p className="text-sm text-gray-600">{classroom.floor}</p>
                </div>
                
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">{classroom.timeSlot}</span>
                    </div>
                    
                    {classroom.status === 'occupied' && (
                      <>
                        <div className="flex items-center">
                          <Book className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">
                            {classroom.courseCode} ({classroom.type})
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">
                            Lecturer: {classroom.lecturer}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">
                            {classroom.locationType}
                          </span>
                        </div>
                        <div className={`flex items-center mt-2 p-2 rounded-md ${
                          (classroom.headCount / (roomCapacity[classroom.room] || 100)) > 0.85 
                            ? 'bg-orange-50' 
                            : 'bg-blue-50'
                        }`}>
                          <Users className={`h-4 w-4 mr-2 ${
                            (classroom.headCount / (roomCapacity[classroom.room] || 100)) > 0.85
                              ? 'text-orange-500'
                              : 'text-blue-500'
                          }`} />
                          <span className={`text-sm font-medium ${
                            (classroom.headCount / (roomCapacity[classroom.room] || 100)) > 0.85
                              ? 'text-orange-700'
                              : 'text-blue-700'
                          }`}>
                            Attendance: {classroom.headCount} / {roomCapacity[classroom.room] || '-'}
                            <span className={`ml-2 text-xs ${
                              (classroom.headCount / (roomCapacity[classroom.room] || 100)) > 0.85
                                ? 'text-orange-500'
                                : 'text-blue-500'
                            }`}>
                              ({Math.round((classroom.headCount / (roomCapacity[classroom.room] || 100)) * 100)}% full)
                            </span>
                          </span>
                        </div>
                        {(classroom.headCount / (roomCapacity[classroom.room] || 100)) > 0.85 && (
                          <div className="mt-2 flex">
                            <button className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-md flex items-center hover:bg-orange-200">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Near capacity - Consider overflow room
                            </button>
                          </div>
                        )}
                      </>
                    )}
                    
                    {classroom.status === 'event' && (
                      <>
                        <div className="flex items-center">
                          <AlertTriangle className="h-4 w-4 text-purple-500 mr-2" />
                          <span className="text-sm text-gray-600">
                            {classroom.eventName}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">
                            Organizer: {classroom.organizer}
                          </span>
                        </div>
                        <div className="flex items-center mt-2 bg-purple-50 p-2 rounded-md">
                          <Users className="h-4 w-4 text-purple-500 mr-2" />
                          <span className="text-sm font-medium text-purple-700">
                            Attendance: {classroom.headCount} / {roomCapacity[classroom.room] || '-'}
                            <span className="ml-2 text-xs text-purple-500">
                              ({Math.round((classroom.headCount / (roomCapacity[classroom.room] || 100)) * 100)}% full)
                            </span>
                          </span>
                        </div>
                      </>
                    )}
                    
                    {classroom.status === 'student-allocated' && (
                      <>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-yellow-500 mr-2" />
                          <span className="text-sm text-gray-600">
                            {classroom.requestedBy}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Book className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">
                            Purpose: {classroom.purpose}
                          </span>
                        </div>
                        <div className={`flex items-center mt-2 p-2 rounded-md ${
                          (classroom.headCount / (roomCapacity[classroom.room] || 100)) < 0.3 
                            ? 'bg-red-50' 
                            : 'bg-yellow-50'
                        }`}>
                          <Users className={`h-4 w-4 mr-2 ${
                            (classroom.headCount / (roomCapacity[classroom.room] || 100)) < 0.3
                              ? 'text-red-500'
                              : 'text-yellow-500'
                          }`} />
                          <span className={`text-sm font-medium ${
                            (classroom.headCount / (roomCapacity[classroom.room] || 100)) < 0.3
                              ? 'text-red-700'
                              : 'text-yellow-700'
                          }`}>
                            Attendance: {classroom.headCount} / {roomCapacity[classroom.room] || '-'}
                            <span className={`ml-2 text-xs ${
                              (classroom.headCount / (roomCapacity[classroom.room] || 100)) < 0.3
                                ? 'text-red-500'
                                : 'text-yellow-500'
                            }`}>
                              ({Math.round((classroom.headCount / (roomCapacity[classroom.room] || 100)) * 100)}% full)
                            </span>
                          </span>
                        </div>
                        {(classroom.headCount / (roomCapacity[classroom.room] || 100)) < 0.3 && (
                          <div className="mt-2 flex">
                            <button className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-md flex items-center hover:bg-red-200">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Low utilization - Consider disallocation
                            </button>
                          </div>
                        )}
                      </>
                    )}
                    
                    {classroom.status === 'maintenance' && (
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-600">
                          {classroom.maintenanceType}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Quick Room Stats */}
      {!loading && filteredData.length > 0 && (
        <div className="mt-6 mb-6 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
            Total: {filteredData.length} rooms
          </span>
          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
            Occupied: {filteredData.filter(r => r.status === 'occupied').length}
          </span>
          <span className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
            Available: {filteredData.filter(r => r.status === 'available').length}
          </span>
          <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-lg text-sm font-medium">
            Student Allocated: {filteredData.filter(r => r.status === 'student-allocated').length}
          </span>
          <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
            Events: {filteredData.filter(r => r.status === 'event').length}
          </span>
        </div>
      )}
    </div>
  );
};

export default ViewClassroomInfo;