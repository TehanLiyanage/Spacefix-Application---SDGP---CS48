import React, { useState } from "react";

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
    { label: "8:30am - 10:30am", start: 8 * 60 + 30 },
    { label: "10:30am - 12:30pm", start: 10 * 60 + 30 },
    { label: "1:30pm - 3:30pm", start: 13 * 60 + 30 },
    { label: "3:30pm - 5:30pm", start: 15 * 60 + 30 }
  ];
  
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const todayDate = now.toISOString().split("T")[0];
  
  return selectedDate === todayDate ? timeSlots.filter(slot => slot.start > currentMinutes) : timeSlots;
};

const SpaceReservation = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const currentWeekWeekdays = getCurrentWeekWeekdays();

  const handleTimeSlotChange = (slot) => {
    setSelectedTimeSlots(prevSlots =>
      prevSlots.includes(slot)
        ? prevSlots.filter(s => s !== slot)
        : [...prevSlots, slot]
    );
  };

  const handleReservation = () => {
    if (selectedDay && selectedTimeSlots.length > 0) {
      alert(`Booking confirmed for ${selectedDay.day} (${selectedDay.date}) during ${selectedTimeSlots.join(", ")}`);
      setSelectedDay(null);
      setSelectedTimeSlots([]);
    } else {
      alert("Please fill all fields before booking.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Space Reservation</h2>
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
              onChange={(e) =>
                setSelectedDay(currentWeekWeekdays.find((day) => day.date === e.target.value))
              }
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
              {selectedDay && getAvailableTimeSlots(selectedDay.date).map((slot) => (
                <label key={slot.label} className="block">
                  <input
                    type="checkbox"
                    className="mr-2"
                    value={slot.label}
                    checked={selectedTimeSlots.includes(slot.label)}
                    onChange={() => handleTimeSlotChange(slot.label)}
                  />
                  {slot.label}
                </label>
              ))}
            </div>
          </div>

          {/* Reservation Button */}
          <button
            className="w-full bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-cyan-600 transition-colors disabled:bg-gray-400"
            disabled={!selectedDay || selectedTimeSlots.length === 0}
            onClick={handleReservation}
          >
            Book Space
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceReservation;
