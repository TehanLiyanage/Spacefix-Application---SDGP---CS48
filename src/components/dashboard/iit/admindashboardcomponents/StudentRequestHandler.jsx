import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";


// Use Vite environment variable with fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const StudentRequestHandler = () => {
  const [currentAndFutureReservations, setCurrentAndFutureReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPastReservations, setShowPastReservations] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      // const response = await axios.get("http://localhost:5000/api/studentsreservation/reservations");
      const response = await axios.get(`${API_BASE_URL}/api/studentsreservation/reservations`);
      if (response.data.success) {
        setCurrentAndFutureReservations(response.data.currentAndFutureReservations);
        setPastReservations(response.data.pastReservations);
      } else {
        setError("Failed to fetch reservations");
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error("Failed to fetch reservations:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteReservation = async (id) => {
    try {
      // const response = await axios.delete(`http://localhost:5000/api/studentsreservation/reservations/${id}`);
      const response = await axios.delete(`${API_BASE_URL}/api/studentsreservation/reservations/${id}`);
      if (response.data.success) {
        // Remove the deleted reservation from the state
        setCurrentAndFutureReservations(prev => 
          prev.filter(reservation => reservation.id !== id)
        );
        setPastReservations(prev => 
          prev.filter(reservation => reservation.id !== id)
        );
        setShowDeleteConfirm(false);
      } else {
        setError("Failed to delete reservation");
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error("Failed to delete reservation:", err);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setShowDeleteConfirm(false);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMM d, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      if (timestamp instanceof Date) {
        return format(timestamp, "MMM d, yyyy h:mm a");
      }
      return "Invalid date";
    } catch (error) {
      return "Invalid date";
    }
  };

  // Group reservations by date
  const groupReservationsByDate = (reservations) => {
    const grouped = {};
    
    reservations.forEach(reservation => {
      if (!grouped[reservation.date]) {
        grouped[reservation.date] = [];
      }
      grouped[reservation.date].push(reservation);
    });
    
    // Sort each group by timeSlot
    Object.keys(grouped).forEach(date => {
      grouped[date].sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));
    });
    
    return grouped;
  };

  const currentAndFutureGrouped = groupReservationsByDate(currentAndFutureReservations);
  const pastGrouped = groupReservationsByDate(pastReservations);

  return (
    <div className="max-w-6xl mx-auto px-4 py-0">
      <h2 className="text-xl sm:text-2xl font-medium text-center text-emerald-600 mb-6">
        Student Reservation Handler
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading reservations...</p>
        </div>
      ) : error ? (
        <div className="bg-white rounded-md shadow p-5 text-center">
          <p className="text-red-600 mb-3">{error}</p>
          <button 
            onClick={fetchReservations}
            className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : (
        <div>
          {/* Current and Future Reservations */}
          <div className="mb-6">
            <div className="bg-white rounded-md shadow mb-4">
              <div className="px-5 py-3 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-medium text-emerald-600">Current & Upcoming Reservations</h3>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {currentAndFutureReservations.length} Reservations
                  </span>
                </div>
              </div>

              {Object.keys(currentAndFutureGrouped).length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {Object.keys(currentAndFutureGrouped).sort().map(date => (
                    <div key={date} className="p-4">
                      <h4 className="text-sm font-medium text-gray-800 mb-2">
                        {formatDate(date)} ({currentAndFutureGrouped[date][0].day})
                      </h4>
                      <div className="space-y-2">
                        {currentAndFutureGrouped[date].map(reservation => (
                          <div key={reservation.id} className="p-3 hover:bg-gray-50 transition-colors border border-gray-100 rounded-md">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium text-gray-800">
                                  Time Slot: {reservation.timeSlot}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Student Requests: {reservation.requestCount}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                  Created: {formatTimestamp(reservation.createdAt)}
                                </div>
                              </div>
                              <button
                                onClick={() => confirmDelete(reservation.id)}
                                className="ml-2 bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-5 text-center text-gray-500">
                  No upcoming reservations found.
                </div>
              )}
            </div>
          </div>

          {/* Past Reservations Toggle */}
          <div className="mb-4">
            <button
              onClick={() => setShowPastReservations(!showPastReservations)}
              className="flex items-center text-emerald-600 hover:text-emerald-700"
            >
              <span>{showPastReservations ? "Hide" : "Show"} Past Reservations</span>
              <svg
                className={`ml-1 h-5 w-5 transform ${showPastReservations ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Past Reservations */}
          {showPastReservations && (
            <div className="mb-6">
              <div className="bg-white rounded-md shadow mb-4">
                <div className="px-5 py-3 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-md font-medium text-emerald-600">Past Reservations</h3>
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {pastReservations.length} Reservations
                    </span>
                  </div>
                </div>

                {Object.keys(pastGrouped).length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {Object.keys(pastGrouped).sort().reverse().map(date => (
                      <div key={date} className="p-4">
                        <h4 className="text-sm font-medium text-gray-800 mb-2">
                          {formatDate(date)} ({pastGrouped[date][0].day})
                        </h4>
                        <div className="space-y-2">
                          {pastGrouped[date].map(reservation => (
                            <div key={reservation.id} className="p-3 hover:bg-gray-50 transition-colors border border-gray-100 rounded-md">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-sm font-medium text-gray-800">
                                    Time Slot: {reservation.timeSlot}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    Student Requests: {reservation.requestCount}
                                  </div>
                                  <div className="text-xs text-gray-400 mt-1">
                                    Created: {formatTimestamp(reservation.createdAt)}
                                  </div>
                                </div>
                                <button
                                  onClick={() => confirmDelete(reservation.id)}
                                  className="ml-2 bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-5 text-center text-gray-500">
                    No past reservations found.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-medium text-emerald-600 mb-4">Confirm Deletion</h3>
            <p className="text-gray-500 mb-4">
              Are you sure you want to delete this reservation? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteReservation(deleteId)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRequestHandler;

