import React, { useState } from 'react';

const Report = () => {
  const [activeTab, setActiveTab] = useState('all-items'); // Default to all-items view
  const [selectedCategory, setSelectedCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [reportedItems, setReportedItems] = useState([
    {
      id: 1,
      name: 'AirPods',
      category: 'Electronics',
      location: 'Library',
      description: 'White AirPods in a black case',
      status: 'Lost',
      reporter: 'John Smith (Student)'
    },
    {
      id: 2,
      name: 'Blue Notebook',
      category: 'Books',
      location: 'Chemistry Lab',
      description: 'Blue hardcover notebook with notes',
      status: 'Lost',
      reporter: 'Emma Johnson (Student)'
    },
    {
      id: 3,
      name: 'Student ID Card',
      category: 'Student Card',
      location: 'Computer Lab',
      description: 'ID card for Sarah Wilson',
      status: 'Lost',
      reporter: 'Professor Thompson'
    }
  ]);

  const categories = ['Select category', 'Student Card', 'Mobile Phones', 'Laptops', 'Other Electronics', 'Clothing', 'Helmet', 'Books', 'Personal Items', 'Wallet', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemName || !location || !selectedCategory || selectedCategory === 'Select category') {
      alert('Please fill in all required fields');
      return;
    }

    const newItem = {
      id: reportedItems.length + 1,
      name: itemName,
      category: selectedCategory,
      location: location,
      description: description,
      status: 'Found',
      reporter: 'Lab Keeper'
    };

    setReportedItems([...reportedItems, newItem]);
    setItemName('');
    setLocation('');
    setDescription('');
    setSelectedCategory('');
    
    // Show success message
    alert('Item reported as found! This information will be shared with the admin dashboard.');
    
    // Switch to all-items tab to see the updated list
    setActiveTab('all-items');
  };

  const handleStatusChange = (id, newStatus) => {
    setReportedItems(
      reportedItems.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
    
    if (newStatus === 'Found') {
      alert('Great! The item has been marked as found. The admin dashboard will be notified.');
    } else if (newStatus === 'Claimed') {
      alert('The item has been marked as claimed. This will be updated in the admin dashboard.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Lost & Found Management</h2>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-5">

        {/* Tab Navigation */}
        <div className="flex space-x-3 mb-6">
          <button
            className={`flex-1 py-2 text-base font-medium rounded-lg transition ${
              activeTab === 'all-items' ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('all-items')}
          >
            All Reported Items
          </button>
          <button
            className={`flex-1 py-2 text-base font-medium rounded-lg transition ${
              activeTab === 'found' ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('found')}
          >
            Report Found Item
          </button>
        </div>

        {/* Report Found Item Form */}
        {activeTab === 'found' && (
          <div>
            <div className="mb-4 bg-emerald-50 p-3 rounded-md border border-emerald-200 text-emerald-700 text-sm">
              <p><strong>Instructions:</strong> Use this form when you find items in classrooms or labs. The information will be shared with the admin dashboard to help reunite items with their owners.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-white p-5 rounded-md shadow-sm space-y-3">
              <select
                className="w-full p-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Item name"
                className="w-full p-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Where you found it (location)"
                className="w-full p-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <textarea
                placeholder="Item description (color, brand, distinguishing features, etc.)"
                className="w-full p-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 h-24 resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 text-base rounded-md hover:from-emerald-600 hover:to-cyan-600 transition-colors">
                Submit Found Item
              </button>
            </form>
          </div>
        )}

        {/* All Items List */}
        {activeTab === 'all-items' && (
          <div>
            <div className="mb-4 bg-emerald-50 p-3 rounded-md border border-emerald-200 text-emerald-700 text-sm">
              <p><strong>Instructions:</strong> This list shows items reported as lost by students and staff. If you find any of these items, click "Mark as Found".</p>
            </div>
            
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-700">All Reported Items</h3>
              <div className="flex space-x-2">
                <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">Lost</span>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">Found</span>
                <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">Claimed</span>
              </div>
            </div>
            
            {reportedItems.length === 0 ? (
              <p className="text-gray-500 text-base">No items reported.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {reportedItems.map((item) => (
                  <div 
                    key={item.id} 
                    className={`bg-white shadow-sm rounded-md p-4 border-l-4 ${
                      item.status === 'Lost' ? 'border-l-red-500' : 
                      item.status === 'Found' ? 'border-l-emerald-500' : 
                      'border-l-amber-500'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.category}</p>
                        <p className="text-sm text-gray-500">Location: {item.location}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                        <p className="text-sm text-gray-500 mt-1">Reported by: {item.reporter}</p>
                      </div>
                      <span
                        className={`text-sm px-3 py-1 rounded-full font-medium ${
                          item.status === 'Lost' ? 'bg-red-100 text-red-700' : 
                          item.status === 'Found' ? 'bg-emerald-100 text-emerald-700' : 
                          'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      {item.status === 'Lost' && (
                        <button
                          className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-2 text-sm rounded-md hover:from-emerald-600 hover:to-cyan-600 transition-colors"
                          onClick={() => handleStatusChange(item.id, 'Found')}
                        >
                          Mark as Found
                        </button>
                      )}
                      {item.status === 'Found' && (
                        <button
                          className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-2 text-sm rounded-md hover:from-amber-600 hover:to-yellow-600 transition-colors"
                          onClick={() => handleStatusChange(item.id, 'Claimed')}
                        >
                          Mark as Claimed
                        </button>
                      )}
                      <button
                        className="flex-1 bg-red-500 text-white py-2 text-sm rounded-md hover:bg-red-600 transition-colors"
                        onClick={() => setReportedItems(reportedItems.filter((i) => i.id !== item.id))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;