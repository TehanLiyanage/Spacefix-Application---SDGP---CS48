import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig.js'; // Adjust the import path as needed
import { Loader, Search, AlertCircle } from 'lucide-react';

const Report = () => {
  const [activeTab, setActiveTab] = useState('all-items');
  const [selectedCategory, setSelectedCategory] = useState('Select category');
  const [itemName, setItemName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [reportedItems, setReportedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Select category', 'Student Card', 'Mobile Phones', 'Laptops', 'Other Electronics', 'Clothing', 'Helmet', 'Books', 'Personal Items', 'Wallet', 'Other'];

  // Fetch lost items from Firestore
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const itemsCollectionRef = collection(db, 'IIT', 'LostItems', 'Items');
        const querySnapshot = await getDocs(itemsCollectionRef);
        
        const items = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          items.push({
            id: doc.id,
            name: data.itemName || 'No Name',
            category: data.category || 'No Category',
            location: data.location || 'Unknown',
            description: data.description || '',
            status: data.status || 'Lost',
            reporter: data.userEmail || 'Anonymous',
            date: data.date || ''
          });
        });
        
        setReportedItems(items);
        setError(null);
      } catch (err) {
        console.error("Error fetching lost items:", err);
        setError("Failed to load lost items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemName || !location || !selectedCategory || selectedCategory === 'Select category') {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      
      // Create new item data
      const newItemData = {
        itemName: itemName,
        category: selectedCategory,
        location: location,
        description: description,
        status: 'Found',
        userEmail: 'Lab Keeper', // In a real app, use actual user email
        date: new Date().toISOString().split('T')[0],
        createdAt: serverTimestamp()
      };

      // Add to Firestore
      const itemsCollectionRef = collection(db, 'IIT', 'LostItems', 'Items');
      const docRef = await addDoc(itemsCollectionRef, newItemData);
      
      // Add to local state
      const newItem = {
        id: docRef.id,
        name: itemName,
        category: selectedCategory,
        location: location,
        description: description,
        status: 'Found',
        reporter: 'Lab Keeper',
        date: new Date().toISOString().split('T')[0]
      };
      
      setReportedItems([...reportedItems, newItem]);
      
      // Reset form
      setItemName('');
      setLocation('');
      setDescription('');
      setSelectedCategory('Select category');
      
      // Show success message
      alert('Item reported as found! This information will be shared with the Student dashboard.');
      
      // Switch to found tab to see the updated list
      setActiveTab('found');
      
    } catch (err) {
      console.error("Error adding found item:", err);
      alert('Failed to report found item. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      setLoading(true);
      
      // Update in Firestore
      const itemRef = doc(db, 'IIT', 'LostItems', 'Items', id);
      await updateDoc(itemRef, {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      
      // Update local state
      setReportedItems(
        reportedItems.map(item => 
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
      
      if (newStatus === 'Found') {
        alert('Great! The item has been marked as found. The Student dashboard will be notified.');
      }
    } catch (err) {
      console.error("Error updating item status:", err);
      alert('Failed to update status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (id) => {
    if (!window.confirm('Are you sure you want to remove this item?')) {
      return;
    }
    
    try {
      setLoading(true);
      
      // Delete from Firestore
      const itemRef = doc(db, 'IIT', 'LostItems', 'Items', id);
      await deleteDoc(itemRef);
      
      // Remove from local state
      setReportedItems(reportedItems.filter((item) => item.id !== id));
      
      alert('Item removed successfully.');
    } catch (err) {
      console.error("Error removing item:", err);
      alert('Failed to remove item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter items based on status and search query
  const filteredItems = reportedItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all-items') {
      return item.status === 'Lost' && matchesSearch;
    } else if (activeTab === 'found') {
      return item.status === 'Found' && matchesSearch;
    }
    return matchesSearch;
  });

  const lostItems = filteredItems.filter(item => item.status === 'Lost');
  const foundItems = filteredItems.filter(item => item.status === 'Found');

  if (loading && reportedItems.length === 0) {
    return (
      <div className="p-4 md:p-6 bg-white rounded-lg shadow max-w-3xl mx-auto flex flex-col items-center justify-center min-h-64">
        <Loader className="h-8 w-8 animate-spin text-emerald-500 mb-4" />
        <p className="text-gray-600">Loading lost and found items...</p>
      </div>
    );
  }

  if (error && reportedItems.length === 0) {
    return (
      <div className="p-4 md:p-6 bg-white rounded-lg shadow max-w-3xl mx-auto flex flex-col items-center justify-center min-h-64">
        <AlertCircle className="h-8 w-8 text-red-500 mb-4" />
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow max-w-3xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-medium text-center text-emerald-600 mb-6">Lost & Found Management</h2>
      
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mb-4">
        <button
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === 'all-items' ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
          }`}
          onClick={() => setActiveTab('all-items')}
        >
          Reported Lost Items
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === 'found' ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
          }`}
          onClick={() => setActiveTab('found')}
        >
          Found Items
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === 'report-found' ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
          }`}
          onClick={() => setActiveTab('report-found')}
        >
          Report Found Item
        </button>
      </div>

      {/* Search bar for lists */}
      {activeTab !== 'report-found' && (
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search items..."
            className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {/* Report Found Item Form */}
      {activeTab === 'report-found' && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label htmlFor="category" className="block text-xs font-medium text-gray-700">Category</label>
            <select
              id="category"
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              disabled={submitting}
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
              disabled={submitting}
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="location" className="block text-xs font-medium text-gray-700">Location Found</label>
            <input
              id="location"
              type="text"
              placeholder="e.g., Library, Cafeteria, Classroom 2LA"
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={submitting}
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="description" className="block text-xs font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              placeholder="Item description (color, brand, distinguishing features, etc.)"
              className="w-full p-2 text-sm border border-gray-300 rounded-md h-20 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={submitting}
            ></textarea>
          </div>
          
          <button 
            className="w-full bg-emerald-500 text-white py-2 text-sm rounded-md hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader className="inline-block w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : 'Submit Found Item'}
          </button>
          
          {/* Tips Section */}
          <div className="mt-5 bg-blue-50 p-3 rounded-md">
            <h4 className="text-sm font-medium text-blue-800 mb-1">Instructions:</h4>
            <ul className="text-xs text-blue-700 space-y-1 ml-4 list-disc">
              <li>Use this form when you find items in classrooms or labs</li>
              <li>The information will be shared with the admin dashboard</li>
              <li>Provide as much detail as possible to help identify the item</li>
              <li>Include any distinguishing features in the description</li>
            </ul>
          </div>
        </form>
      )}

      {/* Lost Items List */}
      {activeTab === 'all-items' && (
        <div>
          <h3 className="text-md font-semibold text-emerald-600 mb-3">Reported Lost Items</h3>
          
          {loading && (
            <div className="flex justify-center py-4">
              <Loader className="h-6 w-6 animate-spin text-emerald-500" />
            </div>
          )}
          
          {!loading && lostItems.length === 0 ? (
            <div className="text-center py-6">
              <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-xs font-medium text-gray-900">No lost items</h3>
              <p className="text-xs text-gray-500">No items have been reported as lost yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {lostItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-md p-3 border border-gray-200 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-md font-semibold text-gray-800">{item.name}</h4>
                      <div className="flex items-center mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {item.category}
                        </span>
                        <span className="mx-1 text-gray-300">•</span>
                        <span className="text-xs text-gray-500">
                          {item.date}
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
                    <p className="text-xs text-gray-600 mt-0.5"><span className="font-medium">Reported by:</span> {item.reporter}</p>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between">
                    <button
                      className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
                      onClick={() => handleStatusChange(item.id, 'Found')}
                      disabled={loading}
                    >
                      Mark as Found
                    </button>
                    <button
                      className="text-xs font-medium text-red-600 hover:text-red-700"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={loading}
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
      {activeTab === 'found' && (
        <div>
          <h3 className="text-md font-semibold text-emerald-600 mb-3">Found Items</h3>
          
          {loading && (
            <div className="flex justify-center py-4">
              <Loader className="h-6 w-6 animate-spin text-emerald-500" />
            </div>
          )}
          
          {!loading && foundItems.length === 0 ? (
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
                <div 
                  key={item.id} 
                  className="bg-white rounded-md p-3 border border-gray-200 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-md font-semibold text-gray-800">{item.name}</h4>
                      <div className="flex items-center mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {item.category}
                        </span>
                        <span className="mx-1 text-gray-300">•</span>
                        <span className="text-xs text-gray-500">
                          {item.date}
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
                    <p className="text-xs text-gray-600 mt-0.5"><span className="font-medium">Reported by:</span> {item.reporter}</p>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between">
                    <span className="text-xs font-medium text-emerald-600">
                      ✓ Marked as Found
                    </span>
                    <button
                      className="text-xs font-medium text-red-600 hover:text-red-700"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={loading}
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
  );
};

export default Report;