import React, { useState } from "react";

const MiniMap = () => {
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [filterBuilding, setFilterBuilding] = useState("all");
  const [filterFloor, setFilterFloor] = useState("all");

  const classrooms = [
    { id: "1LA", building: "GP Building", floor: 1, map: "/images/floor1.png", capacity: 40, features: ["Projector", "Whiteboard"] },
    { id: "1LB", building: "SP Building", floor: 1, map: "/images/floor1.png", capacity: 30, features: ["Computers", "Whiteboard"] },
    { id: "2LA", building: "GP Building", floor: 2, map: "/images/floor2.png", capacity: 50, features: ["Projector", "Sound System"] },
    { id: "2LB", building: "GP Building", floor: 2, map: "/images/floor2.png", capacity: 45, features: ["Projector", "Smart Board"] },
    { id: "2LC", building: "SP Building", floor: 2, map: "/images/floor2.png", capacity: 35, features: ["Computers", "Whiteboard"] },
    { id: "3LA", building: "SP Building", floor: 3, map: "/images/floor3.png", capacity: 60, features: ["Projector", "Sound System"] },
    { id: "3LB", building: "SP Building", floor: 3, map: "/images/floor3.png", capacity: 55, features: ["Computers", "Smart Board"] },
  ];

  // Get unique buildings and floors for filters
  const buildings = [...new Set(classrooms.map(room => room.building))];
  const floors = [...new Set(classrooms.map(room => room.floor))].sort();

  // Filter classrooms based on selected filters
  const filteredClassrooms = classrooms.filter(classroom => {
    return (filterBuilding === "all" || classroom.building === filterBuilding) &&
           (filterFloor === "all" || classroom.floor === filterFloor);
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-xl sm:text-2xl font-medium text-center text-emerald-600 mb-6">
        Campus Mini Map
      </h2>
      
      {/* Filter Controls */}
      <div className="bg-white rounded-md shadow p-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <div>
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
            </div>
            <div>
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
          </div>
          
          <div>
            <span className="text-sm text-gray-600">
              Showing {filteredClassrooms.length} of {classrooms.length} classrooms
            </span>
          </div>
        </div>
      </div>
      
      {/* Classrooms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClassrooms.map((classroom) => (
          <button
            key={classroom.id}
            onClick={() => setSelectedClassroom(classroom)}
            className="bg-white border border-gray-200 rounded-md shadow-sm p-4 hover:border-emerald-300 transition-colors text-left flex flex-col h-full"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-emerald-600">{classroom.id}</h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Floor {classroom.floor}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{classroom.building}</p>
            <p className="text-sm text-gray-500 mt-1">Capacity: {classroom.capacity} students</p>
            
            <div className="mt-2 flex flex-wrap gap-1">
              {classroom.features.map((feature, index) => (
                <span key={index} className="inline-block bg-emerald-50 rounded-full px-2 py-0.5 text-xs text-emerald-600">
                  {feature}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredClassrooms.length === 0 && (
        <div className="bg-white rounded-md shadow p-8 text-center">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
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

      {/* Classroom Detail Modal */}
      {selectedClassroom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-md shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-medium text-emerald-600">Classroom {selectedClassroom.id}</h3>
                  <p className="text-sm text-gray-500">{selectedClassroom.building}, Floor {selectedClassroom.floor}</p>
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
                  <div className="mb-4">
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
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedClassroom.features.map((feature, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
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
                  className="bg-emerald-50 text-emerald-600 rounded-md py-2 px-4 hover:bg-emerald-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
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