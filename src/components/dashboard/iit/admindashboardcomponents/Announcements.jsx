import React, { useState, useEffect } from 'react';
import { BellRing, Plus, Edit, Trash2 } from 'lucide-react';
import { db } from '../../../../firebase/firebaseConfig.js'; 
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'medium'
  });

  // Fetch announcements from Firestore
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const announcementsRef = collection(db, 'IIT', 'Announcements', 'items');
        const q = query(announcementsRef, orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const fetchedAnnouncements = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setAnnouncements(fetchedAnnouncements);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddNew = () => {
    setFormData({
      title: '',
      content: '',
      priority: 'medium'
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (announcement) => {
    setFormData({
      title: announcement.title,
      content: announcement.content,
      priority: announcement.priority
    });
    setEditingId(announcement.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      // Reference to the specific announcement document
      const announcementRef = doc(db, 'IIT', 'Announcements', 'items', id);
      
      // Delete the document from Firestore
      await deleteDoc(announcementRef);
      
      // Update local state to reflect the deletion
      setAnnouncements(announcements.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const announcementData = {
        ...formData,
        date: new Date().toISOString().split('T')[0],
        timestamp: serverTimestamp()
      };
      
      if (editingId) {
        // Update existing announcement
        const announcementRef = doc(db, 'IIT', 'Announcements', 'items', editingId);
        await updateDoc(announcementRef, announcementData);
        
        // Update local state
        setAnnouncements(announcements.map(item => 
          item.id === editingId 
            ? { ...item, ...announcementData } 
            : item
        ));
      } else {
        // Add new announcement with auto-generated ID
        const announcementsRef = collection(db, 'IIT', 'Announcements', 'items');
        const docRef = await addDoc(announcementsRef, announcementData);
        
        // Add to local state with the Firestore document ID
        const newAnnouncement = {
          id: docRef.id,
          ...announcementData
        };
        
        setAnnouncements([newAnnouncement, ...announcements]);
      }
      
      // Reset form
      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      console.error("Error saving announcement:", error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
          <BellRing className="mr-3 h-7 w-7 text-emerald-600" />
          Announcements Management
        </h1>
        <button
          onClick={handleAddNew}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center shadow-md transition-colors"
        >
          <Plus className="h-5 w-5 mr-1" />
          <span>New Announcement</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {editingId ? 'Edit Announcement' : 'Create New Announcement'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                required
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                {editingId ? 'Update' : 'Publish'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-500">Loading announcements...</p>
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-500">No announcements available. Create a new one!</p>
          </div>
        ) : (
          announcements.map(announcement => (
            <div key={announcement.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold text-gray-800">{announcement.title}</h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEdit(announcement)}
                    className="text-gray-500 hover:text-emerald-600 transition-colors"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(announcement.id)}
                    className="text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="mt-2 mb-3 text-gray-600">{announcement.content}</div>
              
              <div className="flex justify-between items-center mt-4">
                <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(announcement.priority)}`}>
                  {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)} Priority
                </span>
                <span className="text-sm text-gray-500">
                  Published: {new Date(announcement.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcements;