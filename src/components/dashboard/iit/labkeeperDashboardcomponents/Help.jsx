import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

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
    alert('Help request submitted successfully!');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Help Center</h2>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-5">
        <div className="mb-4">
          <p className="text-gray-600">Select an issue or describe your problem for assistance</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="issue"
            value={formData.issue}
            onChange={handleInputChange}
            className="w-full p-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
            placeholder="Describe your issue in detail..."
            rows={6}
            className="w-full p-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
          ></textarea>

          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg text-sm text-emerald-700">
            <div className="flex items-start">
              <HelpCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>
                <span className="font-medium">Tip:</span> Providing detailed information about your issue will help us resolve it faster. Include any error messages, location details, or specific steps to reproduce the problem.
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-md hover:from-emerald-600 hover:to-cyan-600 transition-colors font-medium flex items-center justify-center space-x-2"
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