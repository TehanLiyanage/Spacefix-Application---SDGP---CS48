import React, { useState } from "react";

const mockTimetable = [
  {
    day: "Monday",
    courses: [
      { id: 1, name: "Object Oriented Programming (5COSC009)", time: "09:00 - 11:00", room: "5LA", professor: "Dr. Smith", type: "Lecture" },
      { id: 2, name: "Advanced Client-Side Development (4COCS007)", time: "13:00 - 15:00", room: "3LC", professor: "Dr. Johnson", type: "Lab" },
    ],
  },
  {
    day: "Tuesday",
    courses: [
      { id: 3, name: "Advanced Server-Side Development (3COSC009)", time: "10:00 - 12:00", room: "1LC", professor: "Dr. Brown", type: "Lecture" },
      { id: 4, name: "Human Computer Interaction (6COSC008)", time: "14:00 - 16:00", room: "4LA", professor: "Prof. Wilson", type: "Tutorial" },
    ],
  },
  {
    day: "Wednesday",
    courses: [
      { id: 5, name: "Database Systems (3COSC012)", time: "09:00 - 11:00", room: "2LA", professor: "Dr. Williams", type: "Lecture" },
    ],
  },
];

const MyTimetable = () => {
  const [group, setGroup] = useState("");
  const [batch, setBatch] = useState("");
  const [year, setYear] = useState("");
  const [timetable, setTimetable] = useState([]);
  const [activeDay, setActiveDay] = useState("all");

  const loadTimetable = () => {
    setTimetable(mockTimetable);
  };

  // Get all unique days from the timetable
  const days = timetable.map(day => day.day);
  
  // Filter timetable based on active day
  const filteredTimetable = activeDay === "all" 
    ? timetable 
    : timetable.filter(day => day.day === activeDay);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-xl sm:text-2xl font-medium text-center text-emerald-600 mb-6">
        My Timetable
      </h2>
      
      <div className="bg-white rounded-md shadow p-5 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Number
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              placeholder="Enter group number (e.g. G23)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Batch
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              placeholder="Enter batch (e.g. L5)"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter year (e.g. 2025)"
            />
          </div>
        </div>
        
        <button
          onClick={loadTimetable}
          className="w-full mt-4 bg-emerald-400 text-white rounded-md py-2 px-4 hover:bg-emerald-500 transition-colors disabled:opacity-50 focus:outline-none text-sm"
        >
          Load Timetable
        </button>
      </div>

      {timetable.length > 0 && (
        <div className="mt-6">
          {/* Day Navigation */}
          <div className="flex overflow-x-auto pb-2 mb-4">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md border mr-2 flex-shrink-0 ${
                activeDay === "all"
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setActiveDay("all")}
            >
              All Days
            </button>
            {days.map((day) => (
              <button
                key={day}
                className={`px-4 py-2 text-sm font-medium rounded-md border mr-2 flex-shrink-0 ${
                  activeDay === day
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setActiveDay(day)}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Timetable Display */}
          <div className="space-y-4">
            {filteredTimetable.map((day) => (
              <div key={day.day} className="bg-white rounded-md shadow">
                <div className="px-5 py-3 border-b border-gray-200 bg-gray-50 rounded-t-md">
                  <h3 className="text-md font-medium text-emerald-600">{day.day}</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {day.courses.map((course) => (
                    <div 
                      key={course.id} 
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div className="mb-2 sm:mb-0">
                          <div className="flex items-center">
                            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                              course.type === 'Lecture' ? 'bg-blue-400' : 
                              course.type === 'Lab' ? 'bg-purple-400' : 'bg-yellow-400'
                            }`}></span>
                            <h4 className="font-medium text-gray-800">{course.name}</h4>
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <span>{course.professor}</span>
                            <span className="mx-2">•</span>
                            <span>{course.type}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-right mr-4">
                            <p className="text-emerald-600 font-medium">{course.time}</p>
                            <p className="text-sm text-gray-500">Room {course.room}</p>
                          </div>
                          <div className="text-gray-400 hover:text-emerald-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {timetable.length === 0 && (
        <div className="bg-white rounded-md shadow p-5 mt-6 text-center">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <p className="text-gray-500">No timetable available. Please enter your details and click Load Timetable.</p>
        </div>
      )}

      {timetable.length > 0 && (
        <div className="bg-white rounded-md shadow p-4 mt-6">
          <h3 className="text-md font-medium text-emerald-600 mb-3">Class Types</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-blue-400 mr-2"></span>
              <span className="text-sm text-gray-700">Lecture</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-purple-400 mr-2"></span>
              <span className="text-sm text-gray-700">Lab</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
              <span className="text-sm text-gray-700">Tutorial</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTimetable;