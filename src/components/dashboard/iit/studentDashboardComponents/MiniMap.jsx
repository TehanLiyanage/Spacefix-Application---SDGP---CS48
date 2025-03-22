import React, { useState, useEffect } from "react";
import axios from "axios";

const MiniMap = () => {
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [filterBuilding, setFilterBuilding] = useState("all");
  const [filterFloor, setFilterFloor] = useState("all");
  const [classrooms, setClassrooms] = useState([]);
  const [filteredClassrooms, setFilteredClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000/api";

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/classrooms`);

        // Mock classroom data
        const mockClassroom = {
          id: "4LA",
          building: "GP Building",
          floor: 4,
          capacity: 40,
          features: ["Projector", "Whiteboard"],
          map: "/images/floor4.png",
        };

        // Combine real classrooms with the mock classroom
        const combinedClassrooms = [...response.data, mockClassroom];

        setClassrooms(combinedClassrooms);
        setFilteredClassrooms(combinedClassrooms);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching classrooms:", err);
        setError("Failed to load classrooms");
        setLoading(false);
      }
    };
    fetchClassrooms();
  }, []);

  useEffect(() => {
    if (classrooms.length === 0) return;

    const applyFilters = async () => {
      try {
        if (filterBuilding === "all" && filterFloor === "all") {
          setFilteredClassrooms(classrooms);
          return;
        }

        let queryParams = new URLSearchParams();
        if (filterBuilding !== "all") queryParams.append("building", filterBuilding);
        if (filterFloor !== "all") queryParams.append("floor", filterFloor);

        const response = await axios.get(`${API_URL}/classrooms/filter?${queryParams}`);

        // Add mock classroom again to filtered results
        const mockClassroom = {
          id: "Mock1A",
          building: "GP Building",
          floor: 1,
          capacity: 40,
          features: ["Projector", "Whiteboard"],
          map: "/images/floor1.png",
        };

        const filteredWithMock = [...response.data, mockClassroom];

        // Apply filters manually for mock if needed
        const finalFiltered = filteredWithMock.filter(room => {
          const matchBuilding = filterBuilding === "all" || room.building === filterBuilding;
          const matchFloor = filterFloor === "all" || room.floor === Number(filterFloor);
          return matchBuilding && matchFloor;
        });

        setFilteredClassrooms(finalFiltered);
      } catch (err) {
        console.error("Error filtering classrooms:", err);
        setError("Failed to filter classrooms");
      }
    };
    applyFilters();
  }, [filterBuilding, filterFloor, classrooms]);

  const buildings = [...new Set(classrooms.map(room => room.building))];
  const floors = [...new Set(classrooms.map(room => room.floor))].sort();

  if (loading && classrooms.length === 0) {
    return <div className="text-center py-10">Loading classrooms...</div>;
  }

  if (error && classrooms.length === 0) {
    return (
      <div className="text-center py-10 text-red-500">
        {error}
        <button 
          onClick={() => window.location.reload()}
          className="ml-2 text-emerald-600 hover:text-emerald-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-xl sm:text-2xl font-medium text-center text-emerald-600 mb-6">
        Campus Mini Map
      </h2>

      {/* Filters */}
      <div className="bg-white rounded-md shadow p-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <select
              className="border border-gray-300 rounded-md text-sm py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              value={filterBuilding}
              onChange={(e) => setFilterBuilding(e.target.value)}
            >
              <option value="all">All Buildings</option>
              {buildings.map(building => (
                <option key={building} value={building}>{building}</option>
              ))}
            </select>

            <select
              className="border border-gray-300 rounded-md text-sm py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              value={filterFloor}
              onChange={(e) => setFilterFloor(e.target.value)}
            >
              <option value="all">All Floors</option>
              {floors.map(floor => (
                <option key={floor} value={floor}>Floor {floor}</option>
              ))}
            </select>
          </div>

          <span className="text-sm text-gray-600">
            Showing {filteredClassrooms.length} of {classrooms.length} classrooms
          </span>
        </div>
      </div>

      {/* Classrooms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClassrooms.map((room) => (
          <button
            key={room.id}
            onClick={() => setSelectedClassroom(room)}
            className="bg-white border border-gray-200 rounded-md shadow-sm p-4 hover:border-emerald-300 transition-colors text-left flex flex-col h-full"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-emerald-600">{room.id}</h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Floor {room.floor}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{room.building}</p>
            <p className="text-sm text-gray-600 mt-1">Capacity: {room.capacity} students</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {room.features?.map((feature, index) => (
                <span
                  key={index}
                  className="bg-emerald-50 text-emerald-600 text-xs px-2 py-0.5 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredClassrooms.length === 0 && !loading && (
        <div className="bg-white rounded-md shadow p-8 text-center">
          <p className="text-gray-500">No classrooms match the selected filters.</p>
          <button 
            onClick={() => {
              setFilterBuilding("all");
              setFilterFloor("all");
            }}
            className="mt-3 text-sm text-emerald-600 hover:text-emerald-700"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedClassroom && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden">
      {/* Modal Header */}
      <div className="flex justify-between items-center bg-emerald-600 text-white px-6 py-4">
        <div>
          <h3 className="text-xl font-semibold">Classroom {selectedClassroom.id}</h3>
          <p className="text-sm opacity-80">
            {selectedClassroom.building}, Floor {selectedClassroom.floor}
          </p>
        </div>
        <button
          onClick={() => setSelectedClassroom(null)}
          className="hover:text-gray-300 transition"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Modal Content */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[calc(95vh-72px)]">
        {/* Classroom Info */}
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-4">Details</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><span className="font-medium text-gray-900">Building:</span> {selectedClassroom.building}</li>
            <li><span className="font-medium text-gray-900">Floor:</span> {selectedClassroom.floor}</li>
            <li><span className="font-medium text-gray-900">Capacity:</span> {selectedClassroom.capacity} students</li>
            <li>
              <span className="font-medium text-gray-900">Features:</span>
              <div className="mt-1 flex flex-wrap gap-2">
                {selectedClassroom.features?.map((feature, idx) => (
                  <span key={idx} className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
            </li>
          </ul>
        </div>

        {/* Interactive Floor Plan */}
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-4">Floor Plan</h4>
          <div className="border rounded-lg overflow-hidden bg-gray-100 relative group">
            <div className="overflow-auto max-h-[400px]">
              <img
                src={selectedClassroom.map}
                alt={`Floor plan for ${selectedClassroom.building}, floor ${selectedClassroom.floor}`}
                className="w-full object-contain transition-transform duration-300 ease-in-out transform group-hover:scale-105 cursor-zoom-in"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/floor-plan-placeholder.png";
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end px-6 py-4 bg-gray-50 border-t">
        <button
          onClick={() => setSelectedClassroom(null)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default MiniMap;
