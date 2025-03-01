import React, { useState } from "react";

const mockTimetable = [
  {
    day: "Monday",
    courses: [
      { id: 1, name: "Mathematics", time: "09:00 - 11:00", room: "A201", professor: "Dr. Smith" },
      { id: 2, name: "Computer Science", time: "13:00 - 15:00", room: "B305", professor: "Dr. Johnson" },
    ],
  },
  {
    day: "Tuesday",
    courses: [
      { id: 3, name: "Physics", time: "10:00 - 12:00", room: "C102", professor: "Dr. Brown" },
      { id: 4, name: "English", time: "14:00 - 16:00", room: "D405", professor: "Prof. Wilson" },
    ],
  },
];

const MyTimetable = () => {
  const [group, setGroup] = useState("");
  const [semester, setSemester] = useState("");
  const [batch, setBatch] = useState("");
  const [year, setYear] = useState("");
  const [timetable, setTimetable] = useState([]);

  const loadTimetable = () => {
    const key = `${year}-${semester}-${batch}`;
    const data = mockTimetable[key] || [];
    setTimetable(data);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Timetable</h2>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Group Number</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            placeholder="Enter your group number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            placeholder="Enter your semester (e.g., A, B)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Batch</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            placeholder="Enter your batch (e.g., B1, B2)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Enter your year (e.g., 2023)"
          />
        </div>
        <button
          onClick={loadTimetable}
          className="w-full bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-cyan-600 transition-colors"
        >
          Load Timetable
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {timetable.length > 0 ? (
          timetable.map((day) => (
            <div key={day.day} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">{day.day}</h3>
              <div className="space-y-4">
                {day.courses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4 hover:border-cyan-500 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-lg">{course.name}</h4>
                        <p className="text-gray-600">{course.professor}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-cyan-500 font-medium">{course.time}</p>
                        <p className="text-gray-500">Room {course.room}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No timetable available. Please enter valid details.</p>
        )}
      </div>
    </div>
  );
};

export default MyTimetable;
