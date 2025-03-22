import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../../../firebase/firebaseConfig'; // Adjust the import path if needed

const LostItems = () => {
  const [activeTab, setActiveTab] = useState('report-lost');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [myItems, setMyItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const categories = [
    'Select category', 'Student Card', 'Mobile Phones', 'Laptops', 'Other Electronics',
    'Clothing', 'Helmet', 'Books', 'Personal Items', 'Wallet', 'Other'
  ];

  // Fetch Logged-in User's Email
  useEffect(() => {
    const user = auth.currentUser;
    if (user && user.email) {
      setUserEmail(user.email);
      fetchMyItems(user.email);
    } else {
      console.warn('No user is logged in.');
    }
  }, []);

  // Fetch My Lost Items
  const fetchMyItems = async (email) => {
    try {
      const res = await axios.get(`${API_URL}/api/lostitems/${email}`);
      const lostItems = res.data.filter(item => item.status === 'Lost');
      setMyItems(lostItems);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch Found Items
  const fetchFoundItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/founditems`);
      setFoundItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (activeTab === 'my-items' && userEmail) fetchMyItems(userEmail);
    if (activeTab === 'found-items') fetchFoundItems();
  }, [activeTab, userEmail]);

  // Submit Lost Item
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemName || !location || !description || !selectedCategory || selectedCategory === 'Select category' || !userEmail) {
      alert('Please fill all fields');
      return;
    }

    const newItem = {
      category: selectedCategory,
      itemName,
      location,
      description,
      userEmail,
    };

    try {
      await axios.post(`${API_URL}/api/lostitems`, newItem);
      alert('Lost item reported successfully');
      setItemName('');
      setLocation('');
      setDescription('');
      setSelectedCategory('');
      fetchMyItems(userEmail);
      setActiveTab('my-items');
    } catch (err) {
      console.error(err);
      alert('Error reporting item');
    }
  };

  // Delete Item (only for My Lost Items)
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/lostitems/${id}`);
      fetchMyItems(userEmail);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow max-w-3xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-medium text-center text-emerald-600 mb-6">
        Lost and Found
      </h2>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mb-4">
        {['report-lost', 'my-items', 'found-items'].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'report-lost' ? 'Report Lost Item' : tab === 'my-items' ? 'My Lost Items' : 'Found Items'}
          </button>
        ))}
      </div>

      {/* Report Lost Item */}
      {activeTab === 'report-lost' && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label htmlFor="category" className="block text-xs font-medium text-gray-700">Category</label>
            <select
              id="category"
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-emerald-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="itemName" className="block text-xs font-medium text-gray-700">Item Name</label>
            <input
              id="itemName"
              type="text"
              placeholder="e.g., Laptop, Backpack"
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-emerald-500"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="location" className="block text-xs font-medium text-gray-700">Last Seen Location</label>
            <input
              id="location"
              type="text"
              placeholder="e.g., Library, Cafeteria"
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-emerald-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="description" className="block text-xs font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              placeholder="Describe the item"
              className="w-full p-2 text-sm border border-gray-300 rounded-md h-20 focus:ring-emerald-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button className="w-full bg-emerald-500 text-white py-2 text-sm rounded-md hover:bg-emerald-600">
            Submit Lost Item
          </button>
        </form>
      )}

      {/* My Lost Items */}
      {activeTab === 'my-items' && (
        <div>
          <h3 className="text-md font-semibold text-emerald-600 mb-3">My Lost Items</h3>
          {myItems.length === 0 ? (
            <p className="text-center text-sm text-gray-500">No lost items reported yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {myItems.map(item => (
                <div key={item.id} className="p-3 border border-gray-200 rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">{item.itemName}</h4>
                      <p className="text-xs text-gray-500">{item.category} • {item.date}</p>
                      <p className="text-xs text-gray-600 mt-1"><strong>Location:</strong> {item.location}</p>
                      <p className="text-xs text-gray-600"><strong>Description:</strong> {item.description}</p>
                      <p className="text-xs text-gray-600"><strong>User Email:</strong> {item.userEmail}</p>
                    </div>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full self-start">Lost</span>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button className="text-xs text-red-600" onClick={() => deleteItem(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Found Items */}
      {activeTab === 'found-items' && (
        <div>
          <h3 className="text-md font-semibold text-emerald-600 mb-3">Found Items</h3>
          {foundItems.length === 0 ? (
            <p className="text-center text-sm text-gray-500">No items found yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {foundItems.map(item => (
                <div key={item.id} className="p-3 border border-gray-200 rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">{item.itemName}</h4>
                      <p className="text-xs text-gray-500">{item.category} • {item.date}</p>
                      <p className="text-xs text-gray-600 mt-1"><strong>Location:</strong> {item.location}</p>
                      <p className="text-xs text-gray-600"><strong>Description:</strong> {item.description}</p>
                      <p className="text-xs text-gray-600"><strong>User Email:</strong> {item.userEmail}</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full self-start">Found</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LostItems;
