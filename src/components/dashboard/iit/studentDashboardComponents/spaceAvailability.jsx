import React, { useState, useEffect } from "react";
import axios from "axios";
import { db } from '../../../../firebase/firebaseConfig';  // Adjust path as needed
import { collection, getDocs } from "firebase/firestore";

// Room capacity config
const roomCapacity = {};
Array.from({ length: 5 }, (_, i) => i + 3).forEach(floor => {
  roomCapacity[`SP-${floor}LA`] = 120;
  ['LB', 'LC', 'LD'].forEach(roomType => {
    roomCapacity[`SP-${floor}${roomType}`] = 40;
  });
});

const SpaceAvailability = () => {
  const [roomData, setRoomData] = useState([]);
  const [sortBy, setSortBy] = useState("room");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId;

    const fetchData = async () => {
      try {
        const roomsRef = collection(db, "IIT", "TimeTable", "allocatetimetable");
        const querySnapshot = await getDocs(roomsRef);
        const openRooms = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.status === "open") {
            openRooms.push({
              room: data.room.toUpperCase(),
              building: data.building,
              floor: data.floor
            });
          }
        });

        let headcountCount = 0;
        try {
          const res = await axios.get("http://127.0.0.1:5000/api/headcount/3la");
          headcountCount = res.data.count;
        } catch (err) {
          console.warn("Headcount fetch failed:", err.message);
        }

        const merged = openRooms.map((room) => {
          const totalSeats = roomCapacity[room.room] || 0;
          const occupancy = room.room === "SP-3LA" ? headcountCount : 0;
          return {
            ...room,
            totalSeats,
            currentOccupancy: occupancy
          };
        });

        setRoomData(merged);
        setLoading(false);
      } catch (error) {
        console.error("Firebase fetch error:", error.message);
        setLoading(false);
      }
    };

    fetchData();
    intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const getSortedSpaces = () => {
    const sorted = [...roomData];
    return sorted.sort((a, b) => {
      if (sortBy === "room") return a.room.localeCompare(b.room);
      if (sortBy === "availability") {
        const availA = a.totalSeats - a.currentOccupancy;
        const availB = b.totalSeats - b.currentOccupancy;
        return availB - availA;
      }
      return 0;
    });
  };

  const totalAvailableSeats = roomData.reduce(
    (acc, room) => acc + (room.totalSeats - room.currentOccupancy),
    0
  );

  if (loading) {
    return <p className="text-center text-gray-500">Loading space availability...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-xl sm:text-2xl font-medium text-center text-emerald-600 mb-6">
        Space Availability
      </h2>

      <div className="bg-white rounded-md shadow p-4 mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Total Available Seats:</span>{" "}
          <span className="text-emerald-600 font-medium">{totalAvailableSeats}</span>
        </p>
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
        {getSortedSpaces().map((data) => {
          const occupancyPercentage = data.totalSeats
            ? (data.currentOccupancy / data.totalSeats) * 100
            : 0;

          let status, statusColor, barColor;
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
            <div key={data.room} className="bg-white rounded-md shadow border border-gray-200 hover:border-emerald-300 transition-colors">
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-emerald-600">{data.room}</h3>
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
                    <div className={`${barColor} rounded-full h-2.5 transition-all duration-500`} style={{ width: `${occupancyPercentage}%` }}></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Available Seats</span>
                  <div className="flex items-center">
                    <span className="font-medium text-emerald-600 mr-2">
                      {availableSeats} seats
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      availableSeats > 50 ? "bg-emerald-100 text-emerald-800" :
                      availableSeats > 20 ? "bg-blue-100 text-blue-800" :
                      "bg-orange-100 text-orange-800"
                    }`}>
                      {availableSeats > 50 ? "Many" : availableSeats > 20 ? "Some" : "Few"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

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
