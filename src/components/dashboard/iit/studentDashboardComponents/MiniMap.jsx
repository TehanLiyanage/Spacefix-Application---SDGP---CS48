import React, { useState } from "react";

const MiniMap = () => {
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  const classrooms = [
    { id: "1LA", building: "Building A", floor: 1, map: "/images/floor1.png" },
    { id: "1LB", building: "Building A", floor: 1, map: "/images/floor1.png" },
    { id: "2LA", building: "Building B", floor: 2, map: "/images/floor2.png" },
    { id: "2LB", building: "Building B", floor: 2, map: "/images/floor2.png" },
    { id: "2LC", building: "Building B", floor: 2, map: "/images/floor2.png" },
    { id: "3LA", building: "Building C", floor: 3, map: "/images/floor3.png" },
    { id: "3LB", building: "Building C", floor: 3, map: "/images/floor3.png" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Mini Map</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classrooms.map((classroom) => (
          <button
            key={classroom.id}
            onClick={() => setSelectedClassroom(classroom)}
            className="bg-white border rounded-lg shadow p-4 hover:border-blue-500 transition-colors"
          >
            <h3 className="text-lg font-semibold">{classroom.id}</h3>
            <p className="text-sm text-gray-600">{classroom.building}</p>
          </button>
        ))}
      </div>

      {selectedClassroom && (
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">Classroom Details</h3>
          <p className="text-gray-700">
            <strong>Classroom:</strong> {selectedClassroom.id}
          </p>
          <p className="text-gray-700">
            <strong>Building:</strong> {selectedClassroom.building}
          </p>
          <p className="text-gray-700">
            <strong>Floor:</strong> {selectedClassroom.floor}
          </p>
          <div className="mt-6">
            <h4 className="text-lg font-bold mb-2">Floor Plan</h4>
            <img
  src={selectedClassroom.map}
  alt={`Floor plan for ${selectedClassroom.building}`}
  className="w-96 h-auto border rounded-lg shadow-lg object-contain"
  onError={(e) => (e.target.style.display = "none")}
/>


          </div>
          <button
            onClick={() => setSelectedClassroom(null)}
            className="mt-4 bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default MiniMap;
