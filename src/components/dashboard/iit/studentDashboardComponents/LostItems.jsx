// src/components/dashboard/iit/studentDashboardComponents/LostItems.jsx
import React, { useState, useEffect } from 'react';
import lostItemsAPI from '../../../../services/lostItemsAPI';
import { toast } from 'react-toastify'; // Make sure to install react-toastify

const LostItems = () => {
  const [activeTab, setActiveTab] = useState('report-lost');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  
  // State for items fetched from API
  const [myLostItems, setMyLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const categories = ['Select category','Student Card', 'Mobile Phones', 'Laptops', 'Other Electronics', 'Clothing', 'Helmet', 'Books', 'Personal Items', 'Wallet', 'Other'];

  // Fetch data when component mounts or tab changes
  useEffect(() => {
    if (activeTab === 'my-items') {
      fetchMyLostItems();
    } else if (activeTab === 'found-items') {
      fetchFoundItems();
    }
  }, [activeTab]);

  // Fetch user's lost items
  const fetchMyLostItems = async () => {
    setIsLoading(true);
    try {
      const response = await lostItemsAPI.getMyLostItems();
      if (response.success) {
        setMyLostItems(response.data || []);
      } else {
        toast.error(response.message || 'Failed to load your lost items');
      }
    } catch (error) {
      console.error('Error fetching my lost items:', error);
      toast.error('Failed to load your lost items. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch found items
  const fetchFoundItems = async () => {
    setIsLoading(true);
    try {
      const response = await lostItemsAPI.getFoundItems();
      if (response.success) {
        setFoundItems(response.data || []);
      } else {
        toast.error(response.message || 'Failed to load found items');
      }
    } catch (error) {
      console.error('Error fetching found items:', error);
      toast.error('Failed to load found items. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Submit a new lost item
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!itemName || !location || !selectedCategory || selectedCategory === 'Select category') {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitLoading(true);
    
    try {
      const itemData = {
        category: selectedCategory,
        name: itemName,
        location: location,
        description: description
      };

      const response = await lostItemsAPI.submitLostItem(itemData);
      
      if (response.success) {
        toast.success('Item reported successfully!');
        
        // Reset form
        setItemName('');
        setLocation('');
        setDescription('');
        setSelectedCategory('');
        
        // Switch to my items tab and refresh
        setActiveTab('my-items');
      } else {
        toast.error(response.message || 'Failed to submit item');
      }
    } catch (error) {
      console.error('Error submitting lost item:', error);
      toast.error('Failed to submit item. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Mark an item as found
  const handleMarkAsFound = async (itemId) => {
    try {
      const response = await lostItemsAPI.markAsFound(itemId);
      
      if (response.success) {
        toast.success('Item marked as found!');
        fetchMyLostItems(); // Refresh the list
      } else {
        toast.error(response.message || 'Failed to update item status');
      }
    } catch (error) {
      console.error('Error marking item as found:', error);
      toast.error('Failed to update item status. Please try again.');
    }
  };

  // Remove an item
  const handleRemoveItem = async (itemId) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      try {
        const response = await lostItemsAPI.removeItem(itemId);
        
        if (response.success) {
          toast.success('Item removed successfully!');
          fetchMyLostItems(); // Refresh the list
        } else {
          toast.error(response.message || 'Failed to remove item');
        }
      } catch (error) {
        console.error('Error removing item:', error);
        toast.error('Failed to remove item. Please try again.');
      }
    }
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow max-w-3xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-medium text-center text-emerald-600 mb-6">
        Lost and Found
      </h2>
      
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mb-4">
        <button
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === 'report-lost' ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
          }`}
          onClick={() => setActiveTab('report-lost')}
        >
          Report Lost Item
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === 'my-items' ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
          }`}
          onClick={() => setActiveTab('my-items')}
        >
          My Lost Items
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === 'found-items' ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
          }`}
          onClick={() => setActiveTab('found-items')}
        >
          Found Items
        </button>
      </div>

      {/* Report Lost Item Form */}
      {activeTab === 'report-lost' && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label htmlFor="category" className="block text-xs font-medium text-gray-700">Category</label>
            <select
              id="category"
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="itemName" className="block text-xs font-medium text-gray-700">Item Name</label>
            <input
              id="itemName"
              type="text"
              placeholder="e.g., Laptop, Backpack, Phone"
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="location" className="block text-xs font-medium text-gray-700">Last Seen Location</label>
            <input
              id="location"
              type="text"
              placeholder="e.g., Library, Cafeteria, Classroom 2LA"
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="description" className="block text-xs font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              placeholder="Provide details about the item"
              className="w-full p-2 text-sm border border-gray-300 rounded-md h-20 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-emerald-500 text-white py-2 text-sm rounded-md hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
            disabled={submitLoading}
          >
            {submitLoading ? 'Submitting...' : 'Submit Lost Item'}
          </button>
        </form>
      )}

      {/* My Lost Items List */}
      {activeTab === 'my-items' && (
        <div>
          <h3 className="text-md font-semibold text-emerald-600 mb-3">My Lost Items</h3>
          
          {isLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-500">Loading your items...</p>
            </div>
          ) : myLostItems.length === 0 ? (
            <div className="text-center py-6">
              <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-xs font-medium text-gray-900">No lost items</h3>
              <p className="text-xs text-gray-500">You haven't reported any lost items yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {myLostItems.map((item) => (
                <div key={item.id} className="bg-white rounded-md p-3 border border-gray-200 hover:border-emerald-300 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-md font-semibold text-gray-800">{item.name}</h4>
                      <div className="flex items-center mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {item.category}
                        </span>
                        <span className="mx-1 text-gray-300">•</span>
                        <span className="text-xs text-gray-500">
                          {item.dateFormatted}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-red-100 text-red-800">
                      Lost
                    </span>
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-xs text-gray-600"><span className="font-medium">Location:</span> {item.location}</p>
                    <p className="text-xs text-gray-600 mt-0.5"><span className="font-medium">Description:</span> {item.description}</p>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between">
                    <button
                      className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
                      onClick={() => handleMarkAsFound(item.id)}
                    >
                      Mark as Found
                    </button>
                    <button
                      className="text-xs font-medium text-red-600 hover:text-red-700"
                      onClick={() => handleRemoveItem(item.id)}
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

      {/* Found Items List */}
      {activeTab === 'found-items' && (
        <div>
          <h3 className="text-md font-semibold text-emerald-600 mb-3">Found Items</h3>
          
          {isLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-500">Loading found items...</p>
            </div>
          ) : foundItems.length === 0 ? (
            <div className="text-center py-6">
              <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-xs font-medium text-gray-900">No found items</h3>
              <p className="text-xs text-gray-500">No items have been marked as found yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {foundItems.map((item) => (
                <div key={item.id} className="bg-white rounded-md p-3 border border-gray-200 hover:border-emerald-300 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-md font-semibold text-gray-800">{item.name}</h4>
                      <div className="flex items-center mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {item.category}
                        </span>
                        <span className="mx-1 text-gray-300">•</span>
                        <span className="text-xs text-gray-500">
                          {item.dateFoundFormatted || item.dateFormatted}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-800">
                      Found
                    </span>
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-xs text-gray-600"><span className="font-medium">Location:</span> {item.location}</p>
                    <p className="text-xs text-gray-600 mt-0.5"><span className="font-medium">Description:</span> {item.description}</p>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <span className="text-xs font-medium text-emerald-600">
                      ✓ Marked as Found
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tips Section */}
      {activeTab === 'report-lost' && (
        <div className="mt-5 bg-blue-50 p-3 rounded-md">
          <h4 className="text-sm font-medium text-blue-800 mb-1">Tips for finding lost items:</h4>
          <ul className="text-xs text-blue-700 space-y-1 ml-4 list-disc">
            <li>Check with the reception desk at your building</li>
            <li>Revisit all locations you've been to recently</li>
            <li>Check your email for notifications about found items</li>
            <li>Provide as much detail as possible in your description</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LostItems;