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
      <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-emerald-500 mb-4" />
        <p className="text-gray-600">Loading lost and found items...</p>
      </div>
    );
  }

  if (error && reportedItems.length === 0) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <AlertCircle className="h-8 w-8 text-red-500 mb-4" />
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-emerald-600">Lost & Found Management</h2>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-4 sm:p-5">

        {/* Tab Navigation */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:space-x-3 mb-6">
          <button
            className={`flex-1 py-2 text-sm sm:text-base font-medium rounded-lg transition ${
              activeTab === 'all-items' ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('all-items')}
          >
            Reported Lost Items
          </button>
          <button
            className={`flex-1 py-2 text-sm sm:text-base font-medium rounded-lg transition ${
              activeTab === 'found' ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('found')}
          >
            Found Items
          </button>
          <button
            className={`flex-1 py-2 text-sm sm:text-base font-medium rounded-lg transition ${
              activeTab === 'report-found' ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white' : 'bg-gray-200 text-gray-700'
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        {/* Report Found Item Form */}
        {activeTab === 'report-found' && (
          <div>
            <div className="mb-4 bg-emerald-50 p-3 rounded-md border border-emerald-200 text-emerald-700 text-sm">
              <p><strong>Instructions:</strong> Use this form when you find items in classrooms or labs. The information will be shared with the admin dashboard to help reunite items with their owners.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-white p-3 sm:p-5 rounded-md shadow-sm space-y-3">
              <select
                className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
              <input
                type="text"
                placeholder="Item name"
                className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                disabled={submitting}
              />
              <input
                type="text"
                placeholder="Where you found it (location)"
                className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={submitting}
              />
              <textarea
                placeholder="Item description (color, brand, distinguishing features, etc.)"
                className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 h-24 resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={submitting}
              ></textarea>
              <button 
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-2 sm:py-3 text-sm sm:text-base rounded-md hover:from-emerald-600 hover:to-cyan-600 transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader className="animate-spin h-4 w-4 mr-2" />
                    Submitting...
                  </>
                ) : 'Submit Found Item'}
              </button>
            </form>
          </div>
        )}

        {/* Lost Items List */}
        {activeTab === 'all-items' && (
          <div>
            <div className="mb-4 bg-emerald-50 p-3 rounded-md border border-emerald-200 text-emerald-700 text-sm">
              <p><strong>Instructions:</strong> This list shows items reported as lost by students and staff. If you find any of these items, click "Mark as Found".</p>
            </div>
            
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-700">Reported Lost Items</h3>
              <div className="flex space-x-2">
                <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">Lost</span>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">Found</span>
              </div>
            </div>
            
            {loading && <div className="flex justify-center py-4"><Loader className="h-6 w-6 animate-spin text-emerald-500" /></div>}
            
            {!loading && lostItems.length === 0 ? (
              <p className="text-gray-500 text-sm sm:text-base py-4 text-center">No lost items reported.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
                {lostItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white shadow-sm rounded-md p-3 sm:p-4 border-l-4 border-l-red-500"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold">{item.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">{item.category}</p>
                        <p className="text-xs sm:text-sm text-gray-500">Location: {item.location}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{item.description}</p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          Reported by: {item.reporter}
                          {item.date && <span className="ml-2">({item.date})</span>}
                        </p>
                      </div>
                      <span className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full font-medium bg-red-100 text-red-700">
                        {item.status}
                      </span>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-2 text-xs sm:text-sm rounded-md hover:from-emerald-600 hover:to-cyan-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        onClick={() => handleStatusChange(item.id, 'Found')}
                        disabled={loading}
                      >
                        {loading ? 'Updating...' : 'Mark as Found'}
                      </button>
                      <button
                        className="flex-1 bg-red-500 text-white py-2 text-xs sm:text-sm rounded-md hover:bg-red-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={loading}
                      >
                        {loading ? 'Removing...' : 'Remove'}
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
            <div className="mb-4 bg-emerald-50 p-3 rounded-md border border-emerald-200 text-emerald-700 text-sm">
              <p><strong>Instructions:</strong> This list shows all items that have been found. These items have been reported to the admin dashboard.</p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Found Items</h3>
            </div>
            
            {loading && <div className="flex justify-center py-4"><Loader className="h-6 w-6 animate-spin text-emerald-500" /></div>}
            
            {!loading && foundItems.length === 0 ? (
              <p className="text-gray-500 text-sm sm:text-base py-4 text-center">No found items to display.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
                {foundItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white shadow-sm rounded-md p-3 sm:p-4 border-l-4 border-l-emerald-500"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold">{item.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">{item.category}</p>
                        <p className="text-xs sm:text-sm text-gray-500">Location: {item.location}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{item.description}</p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          Reported by: {item.reporter}
                          {item.date && <span className="ml-2">({item.date})</span>}
                        </p>
                      </div>
                      <span className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full font-medium bg-emerald-100 text-emerald-700">
                        {item.status}
                      </span>
                    </div>
                    <div className="mt-3">
                      <button
                        className="w-full bg-red-500 text-white py-2 text-xs sm:text-sm rounded-md hover:bg-red-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={loading}
                      >
                        {loading ? 'Removing...' : 'Remove'}
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