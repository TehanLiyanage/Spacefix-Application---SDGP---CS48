import React, { useState } from 'react';

const SpaceBooking = ({ setCurrentPage }) => {
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
    // Here you would typically make an API call to save the booking
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => setCurrentPage('dashboard')}
          className="mb-6 text-gray-600 hover:text-gray-900 flex items-center"
        >
          <span>← Back to Dashboard</span>
        </button>
        
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
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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

export default SpaceBooking;