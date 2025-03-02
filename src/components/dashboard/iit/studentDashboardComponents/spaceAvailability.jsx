import React from "react";

const spaceAvailability = {
  Library: { capacity: 70, totalSeats: 200, currentOccupancy: 140 },
  StudyHall: { capacity: 45, totalSeats: 150, currentOccupancy: 68 },
  ComputerLab: { capacity: 60, totalSeats: 100, currentOccupancy: 60 },
  QuietZone: { capacity: 30, totalSeats: 50, currentOccupancy: 15 },
};

const SpaceAvailability = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-6">Space Availability</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.entries(spaceAvailability).map(([space, data]) => {
        const occupancyPercentage = (data.currentOccupancy / data.totalSeats) * 100;
        let status;
        let statusColor;

        if (occupancyPercentage >= 80) {
          status = "High";
          statusColor = "bg-red-100 text-red-800";
        } else if (occupancyPercentage >= 50) {
          status = "Medium";
          statusColor = "bg-orange-100 text-orange-800";
        } else {
          status = "Low";
          statusColor = "bg-green-100 text-green-800";
        }

        return (
          <div key={space} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{space}</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${statusColor}`}>
                {status} Occupancy
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Current Occupancy (Approx.) :</span>
                <span className="font-medium">{data.currentOccupancy} / {data.totalSeats}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Available Seats (Approx.) :</span>
                <span className="font-medium text-blue-600">
                  {data.totalSeats - data.currentOccupancy} seats
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div
                  className={`${
                    status === "High"
                      ? "bg-red-500"
                      : status === "Medium"
                      ? "bg-orange-500"
                      : "bg-green-500"
                  } rounded-full h-2`}
                  style={{ width: `${occupancyPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default SpaceAvailability;
