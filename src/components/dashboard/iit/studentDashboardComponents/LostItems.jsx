import React, { useState } from 'react';

const LostItems = () => {
  const [activeTab, setActiveTab] = useState('report-lost');
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
      status: 'Found' // ✅ Lab Keeper has marked this as Found
    },
    {
      id: 2,
      name: 'Blue Notebook',
      category: 'Books',
      location: 'Chemistry Lab',
      description: 'Blue hardcover notebook with notes',
      status: 'Lost' // ❌ Still lost
    }
  ]);

  const categories = ['Select category','Student Card', 'Mobile Phones' , 'Laptops' ,'Other Electronics' , 'Clothing', 'Helmet' , 'Books', 'Personal Items','Wallet', 'Other'];

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
      status: 'Lost' // Default is always "Lost"
    };

    setReportedItems([...reportedItems, newItem]);
    setItemName('');
    setLocation('');
    setDescription('');
    setSelectedCategory('');
    setActiveTab('my-items');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-5">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lost & Found</h2>

        {/* Tab Navigation */}
        <div className="flex space-x-3 mb-6 ">
          <button
            className={`flex-1 py-2 text-base font-medium rounded-lg transition ${
              activeTab === 'report-lost' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('report-lost')}
          >
            Report Lost Item
          </button>
          <button
            className={`flex-1 py-2 text-base font-medium rounded-lg transition ${
              activeTab === 'my-items' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('my-items')}
          >
            My Lost Items
          </button>
        </div>

        {/* Report Lost Item Form */}
        {activeTab === 'report-lost' && (
          <form onSubmit={handleSubmit} className="bg-white p-5 rounded-md shadow-sm space-y-3">
            <select
              className="w-full p-3 text-base border border-gray-300 rounded-md"
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
              className="w-full p-3 text-base border border-gray-300 rounded-md"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last seen location"
              className="w-full p-3 text-base border border-gray-300 rounded-md"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <textarea
              placeholder="Item description..."
              className="w-full p-3 text-base border border-gray-300 rounded-md h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button className="w-full bg-blue-600 text-white py-3 text-base rounded-md hover:bg-blue-900 transition">
              Submit Lost Item
            </button>
          </form>
        )}

        {/* My Lost Items List */}
        {activeTab === 'my-items' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">My Lost Items</h3>
            {reportedItems.length === 0 ? (
              <p className="text-gray-500 text-base">No lost items reported.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {reportedItems.map((item) => (
                  <div key={item.id} className="bg-white shadow-sm rounded-md p-4 border border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.category}</p>
                        <p className="text-sm text-gray-500">Location: {item.location}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <span
                        className={`text-sm px-3 py-1 rounded-md font-medium ${
                          item.status === 'Lost' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="mt-3">
                      <button
                        className="w-full bg-red-500 text-white py-2 text-sm rounded-md hover:bg-red-600 transition"
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

export default LostItems;
