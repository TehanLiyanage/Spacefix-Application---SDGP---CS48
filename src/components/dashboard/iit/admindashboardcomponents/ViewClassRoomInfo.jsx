import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Book, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { collection, doc, getDoc, addDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig'; // Adjust path as needed

// Status badge component
const StatusBadge = ({ status, type, allocationType }) => {
  const statusConfig = {
    occupied: { 
      LEC: { color: 'bg-emerald-100 text-emerald-800', text: 'Lecture' },
      TUT: { color: 'bg-purple-100 text-purple-800', text: 'Tutorial' },
      FEEDBACKSESSION: { color: 'bg-yellow-100 text-yellow-800', text: 'Feedback' },
      default: { color: 'bg-gray-100 text-gray-800', text: 'Session' }
    },
    available: { color: 'bg-emerald-100 text-emerald-800', text: 'Available' },
    allocated: { 
      student: { color: 'bg-orange-100 text-orange-800', text: 'Student Allocated' },
      lecturer: { color: 'bg-indigo-100 text-indigo-800', text: 'Lecturer Allocated' },
      default: { color: 'bg-amber-100 text-amber-800', text: 'Allocated' }
    }
  };
  
  let config;
  if (status === 'occupied') {
    config = statusConfig.occupied[type] || statusConfig.occupied.default;
  } else if (status === 'allocated') {
    config = statusConfig.allocated[allocationType] || statusConfig.allocated.default;
  } else {
    config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', text: 'Unknown' };
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.text}
    </span>
  );
};

// Classroom Card Component
const ClassroomCard = ({ classroom, onDeallocate, onAllocate }) => (
  <div className="bg-white rounded-md shadow h-full border border-gray-100">
    <div className={`px-5 py-3 border-b ${
      classroom.status === 'available' 
        ? 'bg-emerald-50' 
        : classroom.status === 'allocated' 
          ? 'bg-amber-50' 
          : 'bg-gray-50'
    }`}>
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-800">{classroom.room}</h4>
        <StatusBadge 
          status={classroom.status} 
          type={classroom.type} 
          allocationType={classroom.allocationType}
        />
      </div>
      <p className="text-sm text-gray-600">{classroom.floor} • {classroom.timeSlot}</p>
    </div>
    
    <div className="p-4">
      <div className="space-y-2">
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-600">{classroom.timeSlot}</span>
        </div>
        
        {classroom.status === 'occupied' ? (
          <>
            <div className="flex items-center">
              <Book className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">
                {classroom.courseCode} ({classroom.type})
              </span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">
                Lecturer: {classroom.lecturer}
              </span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">
                {classroom.locationType}
              </span>
            </div>
            
            {/* This section will only render if headCount is provided by API */}
            {classroom.headCount && classroom.roomCapacity && (
              <>
                <div className={`flex items-center mt-2 p-2 rounded-md ${
                  (classroom.headCount / classroom.roomCapacity) > 0.85 
                    ? 'bg-orange-50' 
                    : 'bg-emerald-50'
                }`}>
                  <Users className={`h-4 w-4 mr-2 ${
                    (classroom.headCount / classroom.roomCapacity) > 0.85
                      ? 'text-orange-500'
                      : 'text-emerald-500'
                  }`} />
                  <span className={`text-sm font-medium ${
                    (classroom.headCount / classroom.roomCapacity) > 0.85
                      ? 'text-orange-700'
                      : 'text-emerald-700'
                  }`}>
                    Attendance: {classroom.headCount} / {classroom.roomCapacity}
                    <span className={`ml-2 text-xs ${
                      (classroom.headCount / classroom.roomCapacity) > 0.85
                        ? 'text-orange-500'
                        : 'text-emerald-500'
                    }`}>
                      ({Math.round((classroom.headCount / classroom.roomCapacity) * 100)}% full)
                    </span>
                  </span>
                </div>
                
                {(classroom.headCount / classroom.roomCapacity) > 0.85 && (
                  <div className="mt-2 flex">
                    <button className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-md flex items-center hover:bg-orange-200 transition-colors">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Near capacity - Consider overflow room
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        ) : classroom.status === 'allocated' ? (
          <>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">
                Allocated to: <span className="font-medium">{classroom.allocatedTo}</span>
              </span>
            </div>
            <div className="flex items-center">
              <Book className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">
                Type: <span className="font-medium capitalize">{classroom.allocationType}</span>
              </span>
            </div>
            {classroom.notes && (
              <div className="flex items-start">
                <Book className="h-4 w-4 text-gray-400 mr-2 mt-1" />
                <span className="text-sm text-gray-600">
                  Notes: {classroom.notes}
                </span>
              </div>
            )}
            
            {/* Attendance for allocated classrooms - only shows when API provides data */}
            {classroom.headCount && classroom.roomCapacity && (
              <div className={`flex items-center mt-2 p-2 rounded-md ${
                (classroom.headCount / classroom.roomCapacity) > 0.85 
                  ? 'bg-orange-50' 
                  : 'bg-emerald-50'
              }`}>
                <Users className={`h-4 w-4 mr-2 ${
                  (classroom.headCount / classroom.roomCapacity) > 0.85
                    ? 'text-orange-500'
                    : 'text-emerald-500'
                }`} />
                <span className={`text-sm font-medium ${
                  (classroom.headCount / classroom.roomCapacity) > 0.85
                    ? 'text-orange-700'
                    : 'text-emerald-700'
                }`}>
                  Live Count: {classroom.headCount} / {classroom.roomCapacity}
                  <span className={`ml-2 text-xs ${
                    (classroom.headCount / classroom.roomCapacity) > 0.85
                      ? 'text-orange-500'
                      : 'text-emerald-500'
                  }`}>
                    ({Math.round((classroom.headCount / classroom.roomCapacity) * 100)}% full)
                  </span>
                </span>
              </div>
            )}
           
            <div className="flex items-center mt-3">
              <span className={`text-xs px-2 py-1 rounded-full ${
                classroom.allocationStatus === 'pending' 
                  ? 'bg-blue-50 text-blue-700' 
                  : classroom.allocationStatus === 'approved' || 
                    classroom.allocationStatus === 'complete' ||
                    classroom.allocationStatus === 'open' ||
                    classroom.allocationStatus === 'to be open'
                    ? 'bg-emerald-50 text-emerald-700'
                    : classroom.allocationStatus === 'not complete' ||
                      classroom.allocationStatus === 'rejected'
                      ? 'bg-red-50 text-red-700'
                    : classroom.allocationStatus === 'close' ||
                      classroom.allocationStatus === 'to be close'
                      ? 'bg-gray-50 text-gray-700'
                    : 'bg-gray-50 text-gray-700' // default case
              }`}>
                Status: {classroom.allocationStatus || 'pending'}
              </span>
            </div>

            <div className="mt-4">
              <button 
                onClick={() => onDeallocate(classroom)}
                className="w-full bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center text-sm"
              >
                <X className="h-4 w-4 mr-1" />
                Deallocate Room
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">
                Capacity: {classroom.roomCapacity || '-'} seats
              </span>
            </div>
            <div className="mt-4">
              <button 
                onClick={() => onAllocate(classroom)}
                className="w-full bg-emerald-400 hover:bg-emerald-500 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm"
              >
                Allocate Room
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);

const ViewClassroomInfo = () => {
  // State for selected day, floor, and time slot
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedFloor, setSelectedFloor] = useState('All Floors');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  
  // State for classroom data and allocation modal
  const [classroomData, setClassroomData] = useState([]);
  const [allocationData, setAllocationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllocationModal, setShowAllocationModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [allocationType, setAllocationType] = useState('');
  const [allocateTo, setAllocateTo] = useState('');
  const [allocateNotes, setAllocateNotes] = useState('');
  
  // New state for headcount data
  const [headcountData, setHeadcountData] = useState({});
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const floors = ['All Floors', '3rd Floor', '4th Floor', '5th Floor', '6th Floor', '7th Floor'];
  
  const timeSlots = [
    '08:30-10:30',
    '10:30-12:30',
    '13:30-15:30',
    '15:30-17:30'
  ];
  
  // All available rooms by floor
  const roomsByFloor = {
    '3rd Floor': ['SP-3LA', 'SP-3LB', 'SP-3LC', 'SP-3LD'],
    '4th Floor': ['SP-4LA', 'SP-4LB', 'SP-4LC', 'SP-4LD'],
    '5th Floor': ['SP-5LA', 'SP-5LB', 'SP-5LC', 'SP-5LD'],
    '6th Floor': ['SP-6LA', 'SP-6LB', 'SP-6LC', 'SP-6LD'],
    '7th Floor': ['SP-7LA', 'SP-7LB', 'SP-7LC', 'SP-7LD']
  };
  
  // Room capacity information
  const roomCapacity = {};
  
  // Set capacity for LA rooms to 120 (floors 3-7)
  Array.from({ length: 5 }, (_, i) => i + 3).forEach(floor => {
    roomCapacity[`SP-${floor}LA`] = 120;
  });
  
  // Set capacity for LB, LC, LD rooms to 40 (floors 3-7)
  Array.from({ length: 5 }, (_, i) => i + 3).forEach(floor => {
    ['LB', 'LC', 'LD'].forEach(roomType => {
      roomCapacity[`SP-${floor}${roomType}`] = 40;
    });
  });

  // Process the group timetable data to get room occupancy
  const processGroupTimetables = (timetables) => {
    // Map to track room occupancy
    const roomOccupancy = {};
    
    // Initialize all rooms as free for all time slots
    const allRooms = Object.values(roomsByFloor).flat();
    allRooms.forEach(room => {
      roomOccupancy[room] = {};
      days.forEach(day => {
        roomOccupancy[room][day] = {};
        timeSlots.forEach(timeSlot => {
          roomOccupancy[room][day][timeSlot] = { status: 'available' };
        });
      });
    });
    
    // Fill in occupied slots from timetable data
    timetables.forEach(group => {
      const schedule = group.schedule;
      if (!schedule) return;
      
      days.forEach(day => {
        if (!schedule[day]) return;
        
        Object.entries(schedule[day]).forEach(([timeSlot, session]) => {
          if (session.locationType === 'PHYSICAL' && session.room) {
            // Only consider physical sessions with a room
            const room = session.room;
            
            if (roomOccupancy[room] && roomOccupancy[room][day] && roomOccupancy[room][day][timeSlot]) {
              roomOccupancy[room][day][timeSlot] = {
                status: 'occupied',
                courseCode: session.courseCode,
                lecturer: session.lecturers,
                type: session.type,
                locationType: session.locationType
                // Removed random headCount generation - this will come from API
              };
            }
          }
        });
      });
    });
    
    // Convert to array format for the component
    const result = [];
    
    allRooms.forEach(room => {
      // Determine which floor this room belongs to
      const floor = Object.entries(roomsByFloor).find(([floorName, rooms]) => 
        rooms.includes(room)
      )[0];
      
      days.forEach(day => {
        timeSlots.forEach(timeSlot => {
          const status = roomOccupancy[room][day][timeSlot].status;
          
          // Include all free rooms and any ongoing sessions
          if (status === 'available' || status === 'occupied') {
            result.push({
              id: `${room}-${day}-${timeSlot}`,
              room: room,
              day: day,
              floor: floor,
              timeSlot: timeSlot,
              roomCapacity: roomCapacity[room],
              ...roomOccupancy[room][day][timeSlot]
            });
          }
        });
      });
    });
    
    return result;
  };

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Array of group IDs to fetch - you can add more as needed
        const groupIds = ["L5_CS_G1", "L5_CS_G2", "L5_CS_G3", "L5_CS_G4", "L5_CS_G5"];
        const timetableData = [];
        
        // Get documents one by one using the exact path
        for (const groupId of groupIds) {
          try {
            const docRef = doc(db, "IIT", "TimeTable", "GroupTimeTables", groupId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
              timetableData.push({
                id: docSnap.id,
                ...docSnap.data()
              });
            }
          } catch (error) {
            console.error(`Error fetching group ${groupId}:`, error);
          }
        }
        
        console.log("Fetched timetable data:", timetableData);
        
        // Process the data to get room occupancy
        const processedData = processGroupTimetables(timetableData);
        
        // Get allocated rooms
        try {
          const allocateCollection = collection(db, "IIT", "TimeTable", "allocatetimetable");
          const allocatedSnapshot = await getDocs(allocateCollection);
          const fetchedAllocationData = allocatedSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          setAllocationData(fetchedAllocationData);
          
          // Mark allocated rooms as occupied
          const updatedProcessedData = processedData.map(room => {
            const isAllocated = fetchedAllocationData.some(
              allocated => 
                allocated.room === room.room && 
                allocated.day === room.day && 
                allocated.timeSlot === room.timeSlot
            );
            
            if (isAllocated && room.status === 'available') {
              const allocatedInfo = fetchedAllocationData.find(
                allocated => 
                  allocated.room === room.room && 
                  allocated.day === room.day && 
                  allocated.timeSlot === room.timeSlot
              );
              
              return {
                ...room,
                status: 'allocated',
                allocatedTo: allocatedInfo.allocateTo,
                allocationType: allocatedInfo.allocationType,
                notes: allocatedInfo.notes,
                allocationId: allocatedInfo.id,
                allocationStatus: allocatedInfo.status || 'pending'
              };
            }
            
            return room;
          });
          
          setClassroomData(updatedProcessedData);
        } catch (error) {
          console.error("Error fetching allocated rooms:", error);
          setClassroomData(processedData);
        }
      } catch (error) {
        console.error("Error fetching timetable data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // New useEffect to fetch headcount data from the API
  // Updated useEffect to match your API's response structure
useEffect(() => {
  const fetchHeadcount = async () => {
    try {
      // Use lowercase room ID to match your API's format
      const response = await fetch('http://127.0.0.1:5000/api/headcount/3la');
      if (!response.ok) {
        throw new Error('Failed to fetch headcount data');
      }
      
      const data = await response.json();
      console.log('Headcount API response:', data);
      
      // Update to use data.count instead of data.headcount
      setHeadcountData(prev => ({
        ...prev,
        'SP-3LA': data.count // Using count from your API response
      }));
      
    } catch (error) {
      console.error('Error fetching headcount data:', error);
    }
  };
  
  // Initial fetch
  fetchHeadcount();
  
  // Set up polling interval (every 1 minute)
  const interval = setInterval(fetchHeadcount, 5000);
  
  return () => clearInterval(interval);
}, []);

  
  // Filter data based on selected day, floor, and time slot
  const filteredData = classroomData.filter(room => {
    if (selectedDay !== room.day) return false;
    if (selectedFloor !== 'All Floors' && selectedFloor !== room.floor) return false;
    if (selectedTimeSlot && selectedTimeSlot !== room.timeSlot) return false;
    return true;
  });
  
  // Apply headcount data to filtered rooms
  const filteredDataWithHeadcount = filteredData.map(room => {
    // Check if we have headcount data for this room
    if (headcountData[room.room]) {
      console.log(`Applied headcount ${headcountData[room.room]} to room ${room.room}`); // Add this line
      return {
        ...room,
        headCount: headcountData[room.room]
      };
    }
    return room;
  });
  
  // Split data into available, allocated and occupied rooms
  const availableRooms = filteredDataWithHeadcount.filter(room => room.status === 'available');
  const filteredAllocatedRooms = filteredDataWithHeadcount.filter(room => room.status === 'allocated');
  const occupiedRooms = filteredDataWithHeadcount.filter(room => room.status === 'occupied');
  
  // Function to allocate a classroom
  const handleAllocateRoom = async () => {
    if (!selectedRoom || !allocationType || !allocateTo) return;
    
    try {
      const allocateCollectionRef = collection(db, "IIT", "TimeTable", "allocatetimetable");
      
      const newAllocation = {
        room: selectedRoom.room,
        day: selectedRoom.day,
        timeSlot: selectedRoom.timeSlot,
        floor: selectedRoom.floor,
        allocationType: allocationType,
        allocateTo: allocateTo,
        notes: allocateNotes,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      const docRef = await addDoc(allocateCollectionRef, newAllocation);
      
      // Update local state
      const updatedClassroomData = classroomData.map(room => {
        if (room.id === selectedRoom.id) {
          return {
            ...room,
            status: 'allocated',
            allocatedTo: allocateTo,
            allocationType: allocationType,
            notes: allocateNotes,
            allocationId: docRef.id,
            allocationStatus: 'pending'
          };
        }
        return room;
      });
      
      setClassroomData(updatedClassroomData);
      setAllocationData([...allocationData, { ...newAllocation, id: docRef.id }]);
      
      // Reset form
      setShowAllocationModal(false);
      setSelectedRoom(null);
      setAllocationType('');
      setAllocateTo('');
      setAllocateNotes('');
      
      alert('Room allocated successfully!');
    } catch (error) {
      console.error("Error allocating room:", error);
      alert('Failed to allocate room. Please try again.');
    }
  };
  
  // Function to deallocate a classroom
  const handleDeallocateRoom = async (room) => {
    if (!window.confirm(`Are you sure you want to deallocate room ${room.room}?`)) {
      return;
    }
    
    try {
      if (room.allocationId) {
        await deleteDoc(doc(db, "IIT", "TimeTable", "allocatetimetable", room.allocationId));
        
        // Update local state
        const updatedClassroomData = classroomData.map(r => {
          if (r.id === room.id) {
            const { allocatedTo, allocationType, notes, allocationId, allocationStatus, ...rest } = r;
            return {
              ...rest,
              status: 'available'
            };
          }
          return r;
        });
        
        setClassroomData(updatedClassroomData);
        setAllocationData(allocationData.filter(ar => ar.id !== room.allocationId));
        
        alert('Room deallocated successfully!');
      }
    } catch (error) {
      console.error("Error deallocating room:", error);
      alert('Failed to deallocate room. Please try again.');
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-xl sm:text-2xl font-medium text-center text-emerald-600 mb-6">
        Classroom Information Dashboard
      </h2>
      
      <div className="bg-white rounded-md shadow p-5 mb-6">
        {/* Day selection */}
        <div className="mb-4">
          <h3 className="text-md font-medium text-emerald-600 mb-2">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" /> Select Day
            </div>
          </h3>
          <div className="flex overflow-x-auto pb-2 mb-2">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 text-sm font-medium rounded-md border mr-2 flex-shrink-0 ${
                  selectedDay === day
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
        
        {/* Floor selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Floor
          </label>
          <select
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {floors.map(floor => (
              <option key={floor} value={floor}>
                {floor}
              </option>
            ))}
          </select>
        </div>
        
        {/* Time slots - selectable */}
        <div className="mb-4">
          <h3 className="text-md font-medium text-emerald-600 mb-2">
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" /> Select Time Slot
            </div>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {timeSlots.map(slot => (
              <button
                key={slot}
                onClick={() => setSelectedTimeSlot(selectedTimeSlot === slot ? null : slot)}
                className={`px-4 py-2 text-sm font-medium rounded-md border ${
                  selectedTimeSlot === slot
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
          {selectedTimeSlot && (
            <div className="mt-2 text-right">
              <button 
                onClick={() => setSelectedTimeSlot(null)} 
                className="text-sm text-emerald-600 hover:text-emerald-700"
              >
                Clear time filter
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Active Filters */}
      {!loading && (selectedFloor !== 'All Floors' || selectedTimeSlot) && (
        <div className="bg-white rounded-md shadow p-4 mb-4">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700">Active filters:</span>
            
            {selectedFloor !== 'All Floors' && (
              <span className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-md text-sm font-medium text-emerald-700 flex items-center">
                Floor: {selectedFloor}
              </span>
            )}
            
            {selectedTimeSlot && (
              <span className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-md text-sm font-medium text-emerald-700 flex items-center">
                Time: {selectedTimeSlot}
              </span>
            )}
            
            <button 
              onClick={() => {
                setSelectedFloor('All Floors');
                setSelectedTimeSlot(null);
              }}
              className="text-xs text-gray-600 hover:text-gray-800 underline"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}

      {/* Quick Room Stats */}
      {!loading && filteredDataWithHeadcount.length > 0 && (
        <div className="bg-white rounded-md shadow p-4 mb-4">
          <h3 className="text-md font-medium text-emerald-600 mb-2">Room Availability Summary</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-50 border rounded-md text-sm font-medium text-gray-700">
              Total: {filteredDataWithHeadcount.length} rooms
            </span>
            
            <span className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-md text-sm font-medium text-emerald-700">
              <span className="font-medium">Lectures:</span> {occupiedRooms.filter(r => r.type === 'LEC').length}
            </span>
            
            <span className="px-3 py-1 bg-purple-50 border border-purple-100 rounded-md text-sm font-medium text-purple-700">
              <span className="font-medium">Tutorials:</span> {occupiedRooms.filter(r => r.type === 'TUT').length}
            </span>
            
            <span className="px-3 py-1 bg-yellow-50 border border-yellow-100 rounded-md text-sm font-medium text-yellow-700">
              <span className="font-medium">Other Sessions:</span> {occupiedRooms.filter(r => r.type !== 'LEC' && r.type !== 'TUT').length}
            </span>
            
            <span className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-md text-sm font-medium text-emerald-700">
              <span className="font-medium">Available:</span> {availableRooms.length}
            </span>
          </div>
        </div>
      )}
      
      {/* Two-column layout for classrooms */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-700">Loading classroom data...</p>
          </div>
        </div>
      ) : filteredDataWithHeadcount.length === 0 ? (
        <div className="bg-white rounded-md shadow p-5 text-center">
          <p className="text-gray-500">No classroom data available for the selected criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Available Classrooms Column */}
          <div>
            <div className="bg-white rounded-md shadow mb-4">
              <div className="px-5 py-3 border-b border-gray-200">
                <h3 className="text-md font-medium text-emerald-600 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Available Classrooms ({availableRooms.length})
                </h3>
              </div>
              
              <div className="p-4">
                {availableRooms.length === 0 ? (
                  <div className="text-center p-4">
                    <p className="text-gray-500 text-sm">No available classrooms for the selected criteria.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {availableRooms.map(classroom => (
                      <ClassroomCard 
                        key={classroom.id} 
                        classroom={classroom} 
                        onAllocate={(room) => {
                          setSelectedRoom(room);
                          setShowAllocationModal(true);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Allocated and Occupied Classrooms Column */}
          <div>
            {/* Allocated Classrooms Section */}
            {filteredAllocatedRooms.length > 0 && (
              <div className="mb-4">
                <div className="bg-white rounded-md shadow mb-4">
                  <div className="px-5 py-3 border-b border-gray-200">
                    <h3 className="text-md font-medium text-emerald-600 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Allocated Classrooms ({filteredAllocatedRooms.length})
                    </h3>
                  </div>
                  
                  <div className="p-4">
                    <div className="grid grid-cols-1 gap-4">
                      {filteredAllocatedRooms.map(classroom => (
                        <ClassroomCard 
                          key={classroom.id} 
                          classroom={classroom} 
                          onDeallocate={handleDeallocateRoom}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Occupied Classrooms Section */}
            <div className="bg-white rounded-md shadow mb-4">
              <div className="px-5 py-3 border-b border-gray-200">
                <h3 className="text-md font-medium text-emerald-600 flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Ongoing Sessions ({occupiedRooms.length})
                </h3>
              </div>
              
              <div className="p-4">
                {occupiedRooms.length === 0 ? (
                  <div className="text-center p-4">
                    <p className="text-gray-500 text-sm">No ongoing sessions for the selected criteria.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {occupiedRooms.map(classroom => (
                      <ClassroomCard 
                        key={classroom.id} 
                        classroom={classroom}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Allocation Modal */}
      {showAllocationModal && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-md max-w-md w-full mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-emerald-600">
                Allocate Room: {selectedRoom.room}
              </h3>
              <button 
                onClick={() => {
                  setShowAllocationModal(false);
                  setSelectedRoom(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">{selectedRoom.floor} • {selectedRoom.timeSlot} • {selectedRoom.day}</p>
            
            <div className="space-y-4">
              {/* Allocation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Allocate For:
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="allocationType"
                      value="student"
                      checked={allocationType === 'student'}
                      onChange={() => setAllocationType('student')}
                      className="h-4 w-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-gray-700 text-sm">Students</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="allocationType"
                      value="lecturer"
                      checked={allocationType === 'lecturer'}
                      onChange={() => setAllocationType('lecturer')}
                      className="h-4 w-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-gray-700 text-sm">Lecturers</span>
                  </label>
                </div>
              </div>
              
              {/* Allocate To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Allocate To:
                </label>
                <input
                  type="text"
                  value={allocateTo}
                  onChange={(e) => setAllocateTo(e.target.value)}
                  placeholder="Enter name or group"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
              </div>
              
              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional):
                </label>
                <textarea
                  value={allocateNotes}
                  onChange={(e) => setAllocateNotes(e.target.value)}
                  placeholder="Add any additional information"
                  rows={3}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setShowAllocationModal(false);
                    setSelectedRoom(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAllocateRoom}
                  disabled={!allocationType || !allocateTo}
                  className={`px-4 py-2 rounded-md text-sm font-medium text-white transition-colors ${
                    (!allocationType || !allocateTo) 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-emerald-500 hover:bg-emerald-600'
                  }`}
                >
                  Allocate Room
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewClassroomInfo;