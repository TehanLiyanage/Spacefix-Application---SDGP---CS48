import React, { useState } from 'react';

const Help = () => {
  const [formData, setFormData] = useState({
    issue: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Help request submitted:', formData);
    // Reset form
    setFormData({ issue: '', description: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome to Spacefix</h1>
        <p className="text-gray-600 mt-1">Select a feature to get started</p>
      </div>

      {/* Help Form */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h2>
        <p className="text-gray-600 mb-6">Select an issue or describe your problem</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="issue"
            value={formData.issue}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select an issue</option>
            <option value="Cannot open the classroom">Cannot open the classroom</option>
            <option value="Cannot access the system">Cannot access the system</option>
            <option value="Booking system issue">Booking system issue</option>
            <option value="App not responding">App not responding</option>
            <option value="Other">Other</option>
          </select>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your issue..."
            rows={6}
            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Submit Help Request</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Help;