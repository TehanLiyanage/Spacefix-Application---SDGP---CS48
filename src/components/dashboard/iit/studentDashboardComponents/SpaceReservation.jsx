import React, { useState, useEffect } from "react";
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  increment, 
  serverTimestamp, 
  updateDoc, 
  doc 
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../../../firebase/firebaseConfig.js";

// Helper functions remain the same
const getCurrentWeekWeekdays = () => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date();
  
  // Create an array to hold the next 14 days
  return Array.from({ length: 14 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return {
      day: daysOfWeek[date.getDay()],
      date: date.toISOString().split("T")[0],
    };
  })
    // Filter out weekends
    .filter((day) => day.day !== "Saturday" && day.day !== "Sunday");
};

const getAvailableTimeSlots = (selectedDate) => {
  const timeSlots = [
    { label: "8:30am - 10:30am", value: "08:30-10:30" },
    { label: "10:30am - 12:30pm", value: "10:30-12:30" },
    { label: "1:30pm - 3:30pm", value: "13:30-15:30" },
    { label: "3:30pm - 5:30pm", value: "15:30-17:30" }
  ];
  
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const todayDate = now.toISOString().split("T")[0];
  
  if (selectedDate === todayDate) {
    return timeSlots.filter(slot => {
      const [startHour, startMinute] = slot.value.split('-')[0].split(':').map(Number);
      return (startHour > currentHour) || (startHour === currentHour && startMinute > currentMinute);
    });
  }
  
  return timeSlots;
};

const SpaceReservation = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [existingReservations, setExistingReservations] = useState({});
  const [userReservations, setUserReservations] = useState([]);
  const [activeTab, setActiveTab] = useState("makeReservation");
  const currentWeekWeekdays = getCurrentWeekWeekdays();
  
  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        fetchUserReservations(user.uid);
      }
    });
    
    return () => unsubscribe();
  }, []);

  // Fetch existing reservations when the day changes
  useEffect(() => {
    const fetchReservations = async () => {
      if (!selectedDay) return;
      
      try {
        const reservationsRef = collection(db, "IIT", "reservation", "students");
        const q = query(reservationsRef, where("day", "==", selectedDay.day), where("date", "==", selectedDay.date));
        const querySnapshot = await getDocs(q);
        
        const reservations = {};
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          reservations[data.timeSlot] = {
            id: doc.id,
            ...data
          };
        });
        
        setExistingReservations(reservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setErrorMessage("Could not load existing reservations");
      }
    };
    
    fetchReservations();
  }, [selectedDay]);

  const fetchUserReservations = async (userId) => {
    try {
      // This is a placeholder - in reality, you'd filter by user ID
      const reservationsRef = collection(db, "IIT", "reservation", "students");
      const querySnapshot = await getDocs(reservationsRef);
      
      const reservations = [];
      querySnapshot.forEach((doc) => {
        reservations.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      // Sort reservations by date
      reservations.sort((a, b) => new Date(a.date) - new Date(b.date));
      setUserReservations(reservations.slice(0, 5)); // Get the most recent 5
    } catch (error) {
      console.error("Error fetching user reservations:", error);
    }
  };

  const handleTimeSlotChange = (slot) => {
    setSelectedTimeSlots(prevSlots =>
      prevSlots.includes(slot)
        ? prevSlots.filter(s => s !== slot)
        : [...prevSlots, slot]
    );
  };

  const handleReservation = async () => {
    if (!selectedDay || selectedTimeSlots.length === 0) {
      setErrorMessage("Please select a day and at least one time slot");
      return;
    }
    
    if (!currentUser) {
      setErrorMessage("You must be logged in to make a reservation");
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
    
    try {
      // Process each selected time slot
      for (const timeSlot of selectedTimeSlots) {
        const reservationId = `${selectedDay.day}_${timeSlot}`;
        const existingReservation = existingReservations[timeSlot];
        
        if (existingReservation) {
          // Update existing reservation count
          await updateDoc(doc(db, "IIT", "reservation", "students", existingReservation.id), {
            requestCount: increment(1),
            updatedAt: serverTimestamp()
          });
        } else {
          // Create new reservation count document - removed status and roomAssigned fields
          await addDoc(collection(db, "IIT", "reservation", "students"), {
            day: selectedDay.day,
            date: selectedDay.date,
            timeSlot: timeSlot,
            requestCount: 1,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        }
      }
      
      setSuccessMessage(`Booking request submitted for ${selectedDay.day} (${selectedDay.date})`);
      setSelectedDay(null);
      setSelectedTimeSlots([]);
      
      // Refresh user reservations
      if (currentUser) {
        fetchUserReservations(currentUser.uid);
      }
    } catch (error) {
      console.error("Error making reservation:", error);
      setErrorMessage("Failed to submit reservation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate stats for popular time slots
  const popularTimeSlots = [
    { day: "Monday", time: "10:30am - 12:30pm", requestCount: 12 },
    { day: "Wednesday", time: "1:30pm - 3:30pm", requestCount: 9 },
    { day: "Thursday", time: "3:30pm - 5:30pm", requestCount: 8 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-xl sm:text-2xl font-medium text-center text-emerald-600 mb-6">
        Space Reservation
      </h2>

      
      {/* Tab Navigation */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
              activeTab === "makeReservation"
                ? "bg-emerald-500 text-white border-emerald-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("makeReservation")}
          >
            Make Reservation
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
              activeTab === "myReservations"
                ? "bg-emerald-500 text-white border-emerald-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("myReservations")}
          >
            My Reservations
          </button>
        </div>
      </div>
      
      {successMessage && (
        <div className="bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded-md mb-4 text-sm max-w-lg mx-auto">
          <p>{successMessage}</p>
        </div>
      )}
      
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 text-sm max-w-lg mx-auto">
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Side */}
        <div className={`lg:col-span-2 ${activeTab === "makeReservation" ? "" : "hidden"}`}>
          <div className="bg-white rounded-md shadow p-5 md:p-6">
            <div className="space-y-4">
              {/* Select Day */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Day
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                  value={selectedDay?.date || ""}
                  onChange={(e) => {
                    setSelectedDay(currentWeekWeekdays.find((day) => day.date === e.target.value));
                    setSelectedTimeSlots([]);
                  }}
                  disabled={isSubmitting}
                >
                  <option value="">Select a day...</option>
                  {currentWeekWeekdays.map((day) => (
                    <option key={day.date} value={day.date}>
                      {day.day} ({day.date})
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Multiple Time Slots */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Time Slots
                </label>
                <div className="w-full border border-gray-300 rounded-md p-2 min-h-[120px]">
                  {selectedDay ? (
                    getAvailableTimeSlots(selectedDay.date).length > 0 ? (
                      getAvailableTimeSlots(selectedDay.date).map((slot) => (
                        <div key={slot.value} className="flex items-center p-2 hover:bg-gray-50 rounded">
                          <input
                            id={`slot-${slot.value}`}
                            type="checkbox"
                            className="h-4 w-4 text-emerald-500 rounded focus:ring-emerald-500"
                            value={slot.value}
                            checked={selectedTimeSlots.includes(slot.value)}
                            onChange={() => handleTimeSlotChange(slot.value)}
                            disabled={isSubmitting}
                          />
                          <label htmlFor={`slot-${slot.value}`} className="ml-2 block text-sm text-gray-900">
                            {slot.label}
                            {existingReservations[slot.value] && (
                              <span className="ml-1 text-xs text-emerald-600">
                                ({existingReservations[slot.value].requestCount} students already requested)
                              </span>
                            )}
                          </label>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 p-2 text-sm">No available time slots for today</p>
                    )
                  ) : (
                    <p className="text-gray-500 p-2 text-sm">Please select a day to see available slots</p>
                  )}
                </div>
              </div>

              {/* Reservation Button */}
              <button
                className="w-full bg-emerald-400 text-white rounded-md py-2 px-4 hover:bg-emerald-500 transition-colors disabled:opacity-50 focus:outline-none text-sm"
                disabled={!selectedDay || selectedTimeSlots.length === 0 || isSubmitting || !currentUser}
                onClick={handleReservation}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  currentUser ? "Reserve Space" : "Sign in"
                )}
              </button>
              
              {!currentUser && (
                <p className="text-sm text-red-500 text-center">You must be logged in to make a reservation</p>
              )}
            </div>
          </div>

          {/* Calendar View */}
          <div className="bg-white rounded-md shadow p-5 md:p-6 mt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Two-Week Availability</h3>
            <div className="grid grid-cols-5 gap-2 overflow-x-auto">
              {currentWeekWeekdays.map((day) => (
                <div 
                  key={day.date} 
                  className={`p-2 rounded-md border text-center cursor-pointer hover:border-emerald-500 ${
                    selectedDay?.date === day.date ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
                  }`}
                  onClick={() => {
                    setSelectedDay(day);
                    setSelectedTimeSlots([]);
                  }}
                >
                  <div className="font-medium text-sm">{day.day}</div>
                  <div className="text-xs text-gray-500">{day.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Reservations Tab Content */}
        <div className={`lg:col-span-2 ${activeTab === "myReservations" ? "" : "hidden"}`}>
          <div className="bg-white rounded-md shadow p-5 md:p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">My Reservations</h3>
            
            {userReservations.length > 0 ? (
              <div className="space-y-4">
                {userReservations.map((reservation) => (
                  <div key={reservation.id} className="border rounded-md p-3 bg-gray-50">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{reservation.day}, {reservation.date}</p>
                        <p className="text-sm text-gray-600">{reservation.timeSlot}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800">
                          Requested
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">You have no active reservations.</p>
            )}
          </div>
        </div>

        {/* Sidebar - Right Side */}
        <div className="lg:col-span-1">
          {/* Space Availability Stats */}
          <div className="bg-white rounded-md shadow p-5 mb-6">
            <h3 className="text-md font-medium text-gray-800 mb-3">Popular Time Slots</h3>
            <div className="space-y-3">
              {popularTimeSlots.map((slot, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{slot.day}</p>
                    <p className="text-xs text-gray-500">{slot.time}</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                      <div 
                        className="bg-emerald-400 h-2.5 rounded-full" 
                        style={{ width: `${Math.min(100, (slot.requestCount / 15) * 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{slot.requestCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reservation Guidelines */}
          <div className="bg-white rounded-md shadow p-5">
            <h3 className="text-md font-medium text-gray-800 mb-3">Reservation Guidelines</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <svg className="w-4 h-4 text-emerald-500 mt-0.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Bookings must be made at least 2 hours in advance
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-emerald-500 mt-0.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Maximum 2 slots per day per student
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-emerald-500 mt-0.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Room assignments will be confirmed 1 hour before slot time
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-emerald-500 mt-0.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Cancellations must be made at least 1 hour before the slot
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceReservation;