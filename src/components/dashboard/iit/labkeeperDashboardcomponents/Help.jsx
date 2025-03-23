import React, { useState } from 'react';
import { HelpCircle, Loader } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig.js'; // Adjust the import path as needed

const Help = () => {
  const [formData, setFormData] = useState({
    issue: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.issue) {
      alert('Please select an issue type');
      return;
    }
    
    if (!formData.description || formData.description.trim().length < 10) {
      alert('Please provide a detailed description (at least 10 characters)');
      return;
    }
    
    try {
      setLoading(true);
      
      // Reference to the help issues collection
      const helpIssuesCollectionRef = collection(db, 'IIT', 'TimeTable', 'helpIssues');
      
      // Prepare data to save
      const helpRequestData = {
        ...formData,
        status: 'pending', // Initial status
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      // Add document to Firestore
      await addDoc(helpIssuesCollectionRef, helpRequestData);
      
      // Reset form
      setFormData({ issue: '', description: '' });
      
      // Show success message
      alert('Help request submitted successfully!');
      
    } catch (error) {
      console.error('Error submitting help request:', error);
      alert('Failed to submit help request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-emerald-600">Help Center</h2>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-4 sm:p-5">
        <div className="mb-4">
          <p className="text-gray-600 text-sm sm:text-base">Select an issue or describe your problem for assistance</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
            <select
              id="issue"
              name="issue"
              value={formData.issue}
              onChange={handleInputChange}
              className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              disabled={loading}
            >
              <option value="">Select an issue</option>
              <option value="Cannot open the classroom">Cannot open the classroom</option>
              <option value="Key is missing">Key is missing</option>
              <option value="Room is already in use">Room is already in use</option>
              <option value="Cannot access the system">Cannot access the system</option>
              <option value="Booking system issue">Booking system issue</option>
              <option value="App not responding">App not responding</option>
              <option value="Technical issue">Technical issue</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your issue in detail..."
              rows={5}
              className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
              disabled={loading}
            ></textarea>
            <p className="mt-1 text-xs text-gray-500">
              {formData.description.length} characters (minimum 10 recommended)
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-3 sm:p-4 rounded-lg text-xs sm:text-sm text-emerald-700">
            <div className="flex items-start">
              <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>
                <span className="font-medium">Tip:</span> Providing detailed information about your issue will help us resolve it faster. Include any error messages, location details, or specific steps to reproduce the problem.
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 sm:py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-md hover:from-emerald-600 hover:to-cyan-600 transition-colors font-medium flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Submit Help Request</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Help;