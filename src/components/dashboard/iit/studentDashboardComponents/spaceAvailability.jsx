import React, { useState } from "react";

const spaceAvailability = {
  "1LA": { 
    capacity: 70, 
    totalSeats: 200, 
    currentOccupancy: 140,
    building: "GP Building",
    floor: 1
  },
  "2LC": { 
    capacity: 45, 
    totalSeats: 150, 
    currentOccupancy: 68,
    building: "SP Building",
    floor: 2
  },
  "1LB": { 
    capacity: 60, 
    totalSeats: 100, 
    currentOccupancy: 60,
    building: "SP Building",
    floor: 1
  },
  "3LA": { 
    capacity: 30, 
    totalSeats: 50, 
    currentOccupancy: 15,
    building: "GP Building",
    floor: 3
  },
};

const SpaceAvailability = () => {
  const [sortBy, setSortBy] = useState("room"); // Options: room, availability
  
  const getSortedSpaces = () => {
    return Object.entries(spaceAvailability).sort((a, b) => {
      if (sortBy === "room") {
        return a[0].localeCompare(b[0]);
      } else if (sortBy === "availability") {
        const availabilityA = a[1].totalSeats - a[1].currentOccupancy;
        const availabilityB = b[1].totalSeats - b[1].currentOccupancy;
        return availabilityB - availabilityA; // Descending order (most available first)
      }
      return 0;
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-xl sm:text-2xl font-medium text-center text-emerald-600 mb-6">
        Space Availability
      </h2>
      
      {/* Header with sort control */}
      <div className="bg-white rounded-md shadow p-4 mb-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Total Available Seats:</span>{" "}
            <span className="text-emerald-600 font-medium">
              {Object.values(spaceAvailability).reduce(
                (acc, space) => acc + (space.totalSeats - space.currentOccupancy),
                0
              )}
            </span>
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            className="border border-gray-300 rounded-md text-sm py-1 px-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="room">Room Number</option>
            <option value="availability">Available Seats</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {getSortedSpaces().map(([space, data]) => {
          const occupancyPercentage = (data.currentOccupancy / data.totalSeats) * 100;
          let status;
          let statusColor;
          let barColor;

          if (occupancyPercentage >= 80) {
            status = "High";
            statusColor = "bg-red-100 text-red-800";
            barColor = "bg-red-500";
          } else if (occupancyPercentage >= 50) {
            status = "Medium";
            statusColor = "bg-orange-100 text-orange-800";
            barColor = "bg-orange-500";
          } else {
            status = "Low";
            statusColor = "bg-emerald-100 text-emerald-800";
            barColor = "bg-emerald-500";
          }

          const availableSeats = data.totalSeats - data.currentOccupancy;

          return (
            <div key={space} className="bg-white rounded-md shadow border border-gray-200 hover:border-emerald-300 transition-colors">
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-emerald-600">{space}</h3>
                    <p className="text-xs text-gray-500">{data.building} • Floor {data.floor}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                    {status} Occupancy
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="text-gray-600">Current Occupancy</span>
                    <span className="font-medium">{data.currentOccupancy} / {data.totalSeats}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`${barColor} rounded-full h-2.5 transition-all duration-500`}
                      style={{ width: `${occupancyPercentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Available Seats</span>
                  <div className="flex items-center">
                    <span className="font-medium text-emerald-600 mr-2">
                      {availableSeats} seats
                    </span>
                    <span 
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        availableSeats > 50 ? "bg-emerald-100 text-emerald-800" : 
                        availableSeats > 20 ? "bg-blue-100 text-blue-800" : 
                        "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {availableSeats > 50 ? "Many" : availableSeats > 20 ? "Some" : "Few"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Occupancy Legend */}
      <div className="bg-white rounded-md shadow mt-4 p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Occupancy Legend</h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>
            <span className="text-xs text-gray-600">Low (&lt;50%)</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-orange-500 mr-2"></span>
            <span className="text-xs text-gray-600">Medium (50-80%)</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
            <span className="text-xs text-gray-600">High (&gt;80%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceAvailability;