import React, { useState } from 'react';
import { MoreHorizontal, Filter } from 'lucide-react';

// Existing SpaceBooking Component (unchanged)
const SpaceBooking = ({ setCurrentPage, onBookingSubmit }) => {
  const [formData, setFormData] = useState({
    taskType: '',
    date: '',
    hallSize: '',
    studentCount: '',
    adminNote: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the booking to the parent component's state
    onBookingSubmit(formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Space Booking</h1>

        {submitted ? (
          <div className="bg-white rounded-lg shadow p-6">
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
                    adminNote: ''
                  });
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                Submit Another Booking
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
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
              />
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
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-purple-400 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit Booking Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// BookingsManagement Component
const BookingsManagement = ({ currentLecturerId, currentLecturerName, bookings }) => {
  const lecturerBookings = bookings.filter(booking => booking.lecturerId === currentLecturerId);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'disapproved':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTaskType = (type) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Space Bookings</h2>
          <p className="text-sm text-gray-600 mt-1">Showing all bookings for {currentLecturerName}</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center px-3 py-2 text-sm border rounded-md hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {lecturerBookings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">You haven't made any bookings yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hall Size</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lecturerBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatTaskType(booking.taskType)}
                    </div>
                    {booking.adminNote && (
                      <div className="text-sm text-gray-500">{booking.adminNote}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(booking.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">{booking.hallSize}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.studentCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(booking.submittedAt).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Main Component
const LecturerSpaceManagement = () => {
  const [currentView, setCurrentView] = useState('bookings'); // 'bookings' or 'newBooking'
  const [bookings, setBookings] = useState([]); // Store bookings here
  
  // Mock lecturer data (in a real app, this would come from authentication)
  const currentLecturer = {
    id: '123',
    name: 'Dr. Smith'
  };

  const handleNewBooking = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: Date.now(),
      lecturerId: currentLecturer.id,
      lecturerName: currentLecturer.name,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    setBookings([...bookings, newBooking]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">Space Management System</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentView('bookings')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'bookings' 
                    ? 'bg-gray-200 text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setCurrentView('newBooking')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'newBooking' 
                    ? 'bg-gray-200 text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                New Booking
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'bookings' ? (
          <BookingsManagement 
            currentLecturerId={currentLecturer.id}
            currentLecturerName={currentLecturer.name}
            bookings={bookings}
          />
        ) : (
          <SpaceBooking 
            setCurrentPage={() => setCurrentView('bookings')}
            onBookingSubmit={handleNewBooking}
          />
        )}
      </div>
    </div>
  );
};

export default LecturerSpaceManagement;