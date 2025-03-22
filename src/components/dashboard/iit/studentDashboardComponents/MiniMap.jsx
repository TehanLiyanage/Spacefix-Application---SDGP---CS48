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
          map: "/images/floor1.png",
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-md shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-medium text-emerald-600">
                    Classroom {selectedClassroom.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedClassroom.building}, Floor {selectedClassroom.floor}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedClassroom(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Classroom Details</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Building:</span>
                      <span className="font-medium text-gray-900">{selectedClassroom.building}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Floor:</span>
                      <span className="font-medium text-gray-900">{selectedClassroom.floor}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-medium text-gray-900">{selectedClassroom.capacity} students</span>
                    </li>
                    <li className="text-gray-600">Features:</li>
                    <li className="flex flex-wrap gap-1">
                      {selectedClassroom.features?.map((feature, idx) => (
                        <span key={idx} className="bg-emerald-50 text-emerald-600 text-xs px-2 py-0.5 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Floor Plan</h4>
                  <div className="border rounded-md overflow-hidden bg-gray-50">
                    <img
                      src={selectedClassroom.map}
                      alt={`Floor plan for ${selectedClassroom.building}, floor ${selectedClassroom.floor}`}
                      className="w-full h-auto object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/floor-plan-placeholder.png";
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedClassroom(null)}
                  className="bg-emerald-50 text-emerald-600 rounded-md py-2 px-4 hover:bg-emerald-100 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniMap;
