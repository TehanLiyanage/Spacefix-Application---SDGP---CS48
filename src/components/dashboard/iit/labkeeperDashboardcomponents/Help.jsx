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
    <div className="p-4 md:p-6 bg-white rounded-lg shadow max-w-3xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-medium text-center text-emerald-600 mb-6">
        Help Center
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <label htmlFor="issue" className="block text-xs font-medium text-gray-700">Issue Type</label>
          <select
            id="issue"
            name="issue"
            value={formData.issue}
            onChange={handleInputChange}
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
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

        <div className="space-y-1">
          <label htmlFor="description" className="block text-xs font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your issue in detail..."
            rows={5}
            className="w-full p-2 text-sm border border-gray-300 rounded-md h-20 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
            disabled={loading}
          ></textarea>
          <p className="text-xs text-gray-500">
            {formData.description.length} characters (minimum 10 recommended)
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 text-white py-2 text-sm rounded-md hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className="w-4 h-4 inline-block mr-1 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <span>Submit Help Request</span>
          )}
        </button>
      </form>

      {/* Tips Section - matches the styling from LostItems component */}
      <div className="mt-5 bg-blue-50 p-3 rounded-md">
        <h4 className="text-sm font-medium text-blue-800 mb-1">Help request tips:</h4>
        <div className="flex items-start">
          <HelpCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-blue-700" />
          <p className="text-xs text-blue-700">
            Providing detailed information about your issue will help us resolve it faster. Include any error messages, location details, or specific steps to reproduce the problem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;