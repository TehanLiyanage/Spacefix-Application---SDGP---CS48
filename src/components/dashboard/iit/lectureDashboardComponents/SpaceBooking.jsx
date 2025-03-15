import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../../firebase/firebaseConfig.js';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';

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

  // Fetch user's previous bookings when component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const bookingsRef = collection(db, 'IIT/reservation/lecturers');
        const q = query(
          bookingsRef,
          where("lecturer.uid", "==", user.uid),
          orderBy("submittedAt", "desc")
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedBookings = [];
        querySnapshot.forEach((doc) => {
          fetchedBookings.push({ id: doc.id, ...doc.data() });
        });
        
        setBookings(fetchedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

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
    
    try {
      // Get current user
      const user = auth.currentUser;
      if (!user) {
        console.error("No authenticated user found");
        setLoading(false);
        return;
      }
      
      // Create booking object with lecturer information
      const newBooking = {
        ...formData,
        lecturer: {
          email: user.email,
          name: user.displayName || 'Unknown Lecturer',
          uid: user.uid
        },
        status: 'pending',
        submittedAt: new Date().toISOString(),
        submittedAtFormatted: new Date().toLocaleString()
      };
      
      // Save to Firestore
      const bookingsRef = collection(db, 'IIT/reservation/lecturers');
      const docRef = await addDoc(bookingsRef, newBooking);
      
      // Add to local state with the Firestore document ID
      setBookings(prev => [{ id: docRef.id, ...newBooking }, ...prev]);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600';
      case 'approved':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatTaskType = (type) => {
    return type.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 pt-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Space Booking</h1>

        {submitted ? (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
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
                className="text-blue-600 hover:text-blue-800"
              >
                Submit Another Booking
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6 mb-6">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                <option value="">Select a task type</option>
                <option value="extra_lecture">Extra Lecture</option>
                <option value="exam">Exam</option>
                <option value="seminar">Seminar</option>
                <option value="workshop">Workshop</option>
              </select>
            </div>

            {/* Date Selection */}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            {/* Time Slot (Start Time and End Time) */}
            <div className="space-y-4">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add any additional notes for the admin"
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Booking Request'}
              </button>
            </div>
          </form>
        )}

        {/* Booking History Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Booking History</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-600 text-center">No bookings yet</p>
          ) : (
            <div className="space-y-4">
              {bookings.map(booking => (
                <div key={booking.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{formatTaskType(booking.taskType)}</h3>
                      <p className="text-sm text-gray-600">Date: {booking.date}</p>
                      <p className="text-sm text-gray-600">Time Slot: {booking.startTime} - {booking.endTime}</p>
                      <p className="text-sm text-gray-600">Hall Size: {booking.hallSize}</p>
                      {booking.studentCount && (
                        <p className="text-sm text-gray-600">Students: {booking.studentCount}</p>
                      )}
                      {booking.adminNote && (
                        <p className="text-sm text-gray-600 mt-2">Note: {booking.adminNote}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className={`font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{booking.submittedAtFormatted || booking.submittedAt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpaceBooking;