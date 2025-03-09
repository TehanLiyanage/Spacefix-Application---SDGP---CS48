import React, { useState } from 'react';

const Report = () => {
  const [activeTab, setActiveTab] = useState('found'); // Default to found items form
  const [formData, setFormData] = useState({
    category: '',
    itemName: '',
    location: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission based on active tab
    if (activeTab === 'lost') {
      console.log('Submitting lost item:', formData);
    } else if (activeTab === 'found') {
      console.log('Submitting found item:', formData);
    }
    // Reset form
    setFormData({
      category: '',
      itemName: '',
      location: '',
      description: ''
    });
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

      {/* Report Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Lost & Found Report</h2>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('lost')}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'lost'
                ? 'bg-emerald-500 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Report Lost Item
          </button>
          <button
            onClick={() => setActiveTab('found')}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'found'
                ? 'bg-emerald-500 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Report Found Item
          </button>
          <button
            onClick={() => setActiveTab('student')}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'student'
                ? 'bg-emerald-500 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Student Lost Items
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">Select category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            <option value="accessories">Accessories</option>
            <option value="other">Other</option>
          </select>

          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleInputChange}
            placeholder="Item name"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder={activeTab === 'found' ? 'Found location' : 'Last seen location'}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Item description..."
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium"
          >
            {activeTab === 'found' ? 'Submit Found Item Report' : 'Submit Lost Item Report'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Report;