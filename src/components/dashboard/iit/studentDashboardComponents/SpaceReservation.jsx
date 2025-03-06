// import React, { useState } from "react";

// // Helper function to get the current week's remaining weekdays
// const getCurrentWeekWeekdays = () => {
//   const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//   const today = new Date();
//   const currentDay = today.getDay();

//   // Get the start of the current week (Sunday)
//   const startOfWeek = new Date(today);
//   startOfWeek.setDate(today.getDate() - currentDay);

//   // Generate weekdays (Monday to Friday) from today onwards, including today
//   return Array.from({ length: 7 }, (_, index) => {
//     const date = new Date(startOfWeek);
//     date.setDate(startOfWeek.getDate() + index);
//     return {
//       day: daysOfWeek[index],
//       date: date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
//     };
//   })
//     .filter((day) => day.day !== "Saturday" && day.day !== "Sunday") // Exclude Saturday and Sunday
//     .filter((day) => new Date(day.date).setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0)); // Include today and future days
// };

// const getAvailableTimeSlots = (selectedDate) => {
//   const timeSlots = [
//     { label: "8:30am - 10:30am", start: 8 * 60 + 30 },
//     { label: "10:30am - 12:30pm", start: 10 * 60 + 30 },
//     { label: "1:30pm - 3:30pm", start: 13 * 60 + 30 },
//     { label: "3:30pm - 5:30pm", start: 15 * 60 + 30 }
//   ];
  
//   const now = new Date();
//   const currentMinutes = now.getHours() * 60 + now.getMinutes();
//   const todayDate = now.toISOString().split("T")[0];
  
//   return selectedDate === todayDate ? timeSlots.filter(slot => slot.start > currentMinutes) : timeSlots;
// };

// const SpaceReservation = () => {
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
//   const currentWeekWeekdays = getCurrentWeekWeekdays();

//   const handleTimeSlotChange = (slot) => {
//     setSelectedTimeSlots(prevSlots =>
//       prevSlots.includes(slot)
//         ? prevSlots.filter(s => s !== slot)
//         : [...prevSlots, slot]
//     );
//   };

//   const handleReservation = () => {
//     if (selectedDay && selectedTimeSlots.length > 0) {
//       alert(`Booking confirmed for ${selectedDay.day} (${selectedDay.date}) during ${selectedTimeSlots.join(", ")}`);
//       setSelectedDay(null);
//       setSelectedTimeSlots([]);
//     } else {
//       alert("Please fill all fields before booking.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Space Reservation</h2>
//       <div className="bg-white rounded-lg shadow p-6">
//         <div className="space-y-6">
//           {/* Select Day */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Day
//             </label>
//             <select
//               className="w-full border rounded-lg p-2"
//               value={selectedDay?.date || ""}
//               onChange={(e) =>
//                 setSelectedDay(currentWeekWeekdays.find((day) => day.date === e.target.value))
//               }
//             >
//               <option value="">Select a day...</option>
//               {currentWeekWeekdays.map((day) => (
//                 <option key={day.date} value={day.date}>
//                   {day.day} ({day.date})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Select Multiple Time Slots */}
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Time Slots
//             </label>
//             <div className="w-full border rounded-lg p-2">
//               {selectedDay ? (
//                 getAvailableTimeSlots(selectedDay.date).map((slot) => (
//                   <label key={slot.label} className="block">
//                     <input
//                       type="checkbox"
//                       className="mr-2"
//                       value={slot.label}
//                       checked={selectedTimeSlots.includes(slot.label)}
//                       onChange={() => handleTimeSlotChange(slot.label)}
//                     />
//                     {slot.label}
//                   </label>
//                 ))
//               ) : (
//                 <p className="text-gray-500 text-sm">Please select a day to see available slots</p>
//               )}
//             </div>
//           </div>

//           {/* Reservation Button */}
//           <button
//             className="w-full bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-900 transition-colors disabled:bg-gray-400"
//             disabled={!selectedDay || selectedTimeSlots.length === 0}
//             onClick={handleReservation}
//           >
//             Book Space
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SpaceReservation;


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

// Helper function to get the current week's remaining weekdays
const getCurrentWeekWeekdays = () => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date();
  const currentDay = today.getDay();

  // Get the start of the current week (Sunday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - currentDay);

  // Generate weekdays (Monday to Friday) from today onwards, including today
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);
    return {
      day: daysOfWeek[index],
      date: date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
    };
  })
    .filter((day) => day.day !== "Saturday" && day.day !== "Sunday") // Exclude Saturday and Sunday
    .filter((day) => new Date(day.date).setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0)); // Include today and future days
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
  const currentWeekWeekdays = getCurrentWeekWeekdays();
  
  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
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
          // Create new reservation count document
          await addDoc(collection(db, "IIT", "reservation", "students"), {
            day: selectedDay.day,
            date: selectedDay.date,
            timeSlot: timeSlot,
            requestCount: 1,
            status: "pending",
            roomAssigned: null,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        }
      }
      
      setSuccessMessage(`Booking request submitted for ${selectedDay.day} (${selectedDay.date})`);
      setSelectedDay(null);
      setSelectedTimeSlots([]);
    } catch (error) {
      console.error("Error making reservation:", error);
      setErrorMessage("Failed to submit reservation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Space Reservation</h2>
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>{successMessage}</p>
        </div>
      )}
      
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{errorMessage}</p>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          {/* Select Day */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Day
            </label>
            <select
              className="w-full border rounded-lg p-2"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time Slots
            </label>
            <div className="w-full border rounded-lg p-2">
              {selectedDay ? (
                getAvailableTimeSlots(selectedDay.date).length > 0 ? (
                  getAvailableTimeSlots(selectedDay.date).map((slot) => (
                    <div key={slot.value} className="flex items-center p-2 hover:bg-gray-50">
                      <input
                        id={`slot-${slot.value}`}
                        type="checkbox"
                        className="h-5 w-5 text-blue-600 rounded"
                        value={slot.value}
                        checked={selectedTimeSlots.includes(slot.value)}
                        onChange={() => handleTimeSlotChange(slot.value)}
                        disabled={isSubmitting}
                      />
                      <label htmlFor={`slot-${slot.value}`} className="ml-2 block text-sm text-gray-900">
                        {slot.label}
                        {existingReservations[slot.value] && (
                          <span className="ml-2 text-xs text-green-600">
                            ({existingReservations[slot.value].requestCount} students already requested)
                          </span>
                        )}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 p-2">No available time slots for today</p>
                )
              ) : (
                <p className="text-gray-500 p-2">Please select a day to see available slots</p>
              )}
            </div>
          </div>

          {/* Reservation Button */}
          <button
            className="w-full bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center justify-center"
            disabled={!selectedDay || selectedTimeSlots.length === 0 || isSubmitting || !currentUser}
            onClick={handleReservation}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              "Request Space"
            )}
          </button>
          
          {!currentUser && (
            <p className="text-sm text-red-500 text-center">You must be logged in to make a reservation</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpaceReservation;
