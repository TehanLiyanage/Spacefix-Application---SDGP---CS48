import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../../firebase/firebaseConfig.js';
import { collection, addDoc, query, where, getDocs, orderBy, limit, startAfter, Timestamp } from 'firebase/firestore';

const SpaceBooking = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    taskType: '',
    date: '',
    hallSize: '',
    studentCount: '',
    adminNote: '',
    startTime: '', 
    endTime: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingBookings, setFetchingBookings] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's previous bookings when component mounts
  useEffect(() => {
    const fetchUserBookings = async () => {
      setFetchingBookings(true);
      setError(null);
      
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log("No authenticated user found");
          setFetchingBookings(false);
          return;
        }
        
        console.log("Current user:", user.uid, user.email);

        // Create the correct reference to the collection
        const bookingsRef = collection(db, 'IIT/reservation/lecturers');
        console.log("Fetching bookings from path:", 'IIT/reservation/lecturers');
        
        // First, try a simpler query without orderBy
        const q = query(
          bookingsRef,
          where("lecturer.uid", "==", user.uid)
        );
        
        console.log("Executing query to find user bookings...");
        const querySnapshot = await getDocs(q);
        console.log("Query results:", querySnapshot.size);
        
        const fetchedBookings = [];
        querySnapshot.forEach((doc) => {
          console.log("Found document:", doc.id);
          const data = doc.data();
          
          // Format dates for display
          let formattedDate = data.submittedAtFormatted;
          if (!formattedDate && data.submittedAt) {
            // Try to parse the submittedAt string
            try {
              const date = new Date(data.submittedAt);
              formattedDate = date.toLocaleString();
            } catch (e) {
              console.log("Could not parse date:", data.submittedAt);
              formattedDate = "Unknown date";
            }
          }
          
          fetchedBookings.push({ 
            id: doc.id, 
            ...data,
            submittedAtFormatted: formattedDate
          });
        });
        
        console.log("Processed bookings:", fetchedBookings.length);
        
        // Sort bookings by submittedAt (since we couldn't use orderBy in the query)
        const sortedBookings = fetchedBookings.sort((a, b) => {
          // Try to compare timestamps if they exist
          const dateA = a.submittedAt ? new Date(a.submittedAt) : new Date(0);
          const dateB = b.submittedAt ? new Date(b.submittedAt) : new Date(0);
          return dateB - dateA; // Descending order
        });
        
        setBookings(sortedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        console.error("Error details:", error.code, error.message);
        
        // Check if this is an index-related error
        if (error.message && error.message.includes('index')) {
          const errorMessage = "Index error: You need to create a Firestore composite index for this query. Check the Firebase console for a direct link.";
          console.error(errorMessage);
          setError(errorMessage);
        } else {
          setError("Failed to fetch your bookings. Please refresh and try again.");
        }
      } finally {
        setFetchingBookings(false);
      }
    };

    fetchUserBookings();
  }, [submitted]); // Re-fetch when a new booking is submitted

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Get current user
      const user = auth.currentUser;
      if (!user) {
        console.error("No authenticated user found");
        setError("You must be logged in to submit a booking");
        setLoading(false);
        return;
      }
      
      // Create booking object with lecturer information
      const submittedAt = new Date();
      const newBooking = {
        ...formData,
        lecturer: {
          email: user.email,
          name: user.displayName || 'Unknown Lecturer',
          uid: user.uid
        },
        status: 'pending',
        submittedAt: submittedAt.toISOString(),
        submittedAtFormatted: submittedAt.toLocaleString()
      };
      
      // Ensure studentCount is saved as a string to match existing data structure
      if (newBooking.studentCount) {
        newBooking.studentCount = String(newBooking.studentCount);
      }
      
      console.log("Saving booking:", newBooking);
      
      // Save to Firestore
      const bookingsRef = collection(db, 'IIT/reservation/lecturers');
      const docRef = await addDoc(bookingsRef, newBooking);
      console.log("Booking saved with ID:", docRef.id);
      
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting booking:", error);
      setError("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600';
      case 'approved':
        return 'text-emerald-600';
      case 'rejected':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatTaskType = (type) => {
    if (!type) return 'Unknown';
    return type.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-xl sm:text-2xl font-medium text-center text-emerald-600 mb-6">
          Space Booking
        </h2>

        {/* Error Message (if any) */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md shadow mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}

        {submitted ? (
          <div className="bg-white rounded-md shadow p-4 mb-4">
            <div className="text-center">
              <div className="text-xl font-semibold text-gray-900 mb-2">Booking Request Submitted</div>
              <div className="text-gray-600 mb-4">Status: <span className="text-yellow-600 font-medium">Pending</span></div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    taskType: '',
                    date: '',
                    hallSize: '',
                    studentCount: '',
                    adminNote: '',
                    startTime: '',
                    endTime: ''
                  });
                }}
                className="text-emerald-600 hover:text-emerald-800"
              >
                Submit Another Booking
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-md shadow p-4 mb-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Scheduling Task */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="taskType">
                  Scheduling Task *
                </label>
                <select
                  id="taskType"
                  name="taskType"
                  required
                  value={formData.taskType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 hover:border-emerald-300"
                  disabled={loading}
                >
                  <option value="">Select a task type</option>
                  <option value="extra_lecture">Extra Lecture</option>
                  <option value="exam">Exam</option>
                  <option value="seminar">Seminar</option>
                  <option value="workshop">Workshop</option>
                </select>
              </div>



              {/* Time Slot (Start Time and End Time) */}
              {/* Date and Time Selection in a more user-friendly layout */}
              <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                <h3 className="text-sm font-medium text-emerald-600 mb-3">Schedule Details *</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="date">
                      Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 hover:border-emerald-300"
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="startTime">
                      Start Time *
                    </label>
                    <input
                      type="time"
                      id="startTime"
                      name="startTime"
                      required
                      value={formData.startTime}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 hover:border-emerald-300"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="endTime">
                      End Time *
                    </label>
                    <input
                      type="time"
                      id="endTime"
                      name="endTime"
                      required
                      value={formData.endTime}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 hover:border-emerald-300"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* Hall Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="hallSize">
                  Hall Size *
                </label>
                <select
                  id="hallSize"
                  name="hallSize"
                  required
                  value={formData.hallSize}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 hover:border-emerald-300"
                  disabled={loading}
                >
                  <option value="">Select hall size</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              {/* Number of Students (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="studentCount">
                  Number of Students (Optional)
                </label>
                <input
                  type="number"
                  id="studentCount"
                  name="studentCount"
                  min="1"
                  value={formData.studentCount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Enter number of students"
                  disabled={loading}
                />
              </div>

              {/* Admin Reference Note (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="adminNote">
                  Admin Reference Note (Optional)
                </label>
                <textarea
                  id="adminNote"
                  name="adminNote"
                  value={formData.adminNote}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Add any additional notes for the admin"
                  disabled={loading}
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Booking Request'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Booking History Section */}
        <div className="bg-white rounded-md shadow">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-medium text-emerald-600">Your Booking History</h2>
          </div>
          
          {fetchingBookings ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : bookings.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No bookings found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {bookings.map(booking => (
                <div key={booking.id} className="bg-white rounded-md shadow border border-gray-200 hover:border-emerald-300 transition-colors">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium text-emerald-600">{formatTaskType(booking.taskType)}</h3>
                        <p className="text-xs text-gray-500">
                          {booking.date || 'Not specified'} • {booking.startTime || '--:--'} - {booking.endTime || '--:--'}
                        </p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 
                        booking.status === 'pending' ? 'bg-orange-100 text-orange-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status ? (booking.status.charAt(0).toUpperCase() + booking.status.slice(1)) : 'Unknown'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1 text-sm">
                        <span className="text-gray-600">Hall Size</span>
                        <span className="font-medium">{booking.hallSize ? booking.hallSize.charAt(0).toUpperCase() + booking.hallSize.slice(1) : 'Not specified'}</span>
                      </div>
                      {booking.studentCount && (
                        <div className="flex justify-between items-center mb-1 text-sm">
                          <span className="text-gray-600">Students</span>
                          <span className="font-medium">{booking.studentCount}</span>
                        </div>
                      )}
                    </div>
                    
                    {booking.adminNote && (
                      <div className="text-sm text-gray-600 mt-2 border-t border-gray-100 pt-2">
                        <p className="italic">"{booking.adminNote}"</p>
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-500 mt-2 text-right">
                      Submitted: {booking.submittedAtFormatted}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Booking Status Legend */}
          <div className="bg-white rounded-md shadow-inner mt-4 p-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Status Legend</h3>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>
                <span className="text-xs text-gray-600">Approved</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-orange-500 mr-2"></span>
                <span className="text-xs text-gray-600">Pending</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                <span className="text-xs text-gray-600">Rejected</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default SpaceBooking;