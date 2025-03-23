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
    priority: 'medium',
    userType: 'student' // Default value for the new field
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
      priority: 'medium',
      userType: 'student' // Reset to default
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (announcement) => {
    setFormData({
      title: announcement.title,
      content: announcement.content,
      priority: announcement.priority,
      userType: announcement.userType || 'student' // Handle existing records that might not have this field
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

  const getUserTypeLabel = (userType) => {
    return userType.charAt(0).toUpperCase() + userType.slice(1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-0">
      <h2 className="text-xl sm:text-2xl font-medium text-center text-emerald-600 mb-6">
        Announcements Management
      </h2>
      
      <div className="mb-6">
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors flex items-center"
        >
          <Plus className="mr-2 h-5 w-5" />
          <span>New Announcement</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-md shadow mb-4">
          <div className="px-5 py-3 border-b border-gray-200">
            <h3 className="text-md font-medium text-emerald-600">
              {editingId ? 'Edit Announcement' : 'Create New Announcement'}
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="p-5">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
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
              
              <div>
                <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">
                  Target Audience
                </label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="student">Student</option>
                  <option value="lecture">Lecture</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
              >
                {editingId ? 'Update' : 'Publish'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Announcements List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading announcements...</p>
        </div>
      ) : announcements.length === 0 ? (
        <div className="bg-white rounded-md shadow p-5 text-center">
          <p className="text-gray-500">No announcements available. Create a new one!</p>
        </div>
      ) : (
        <div className="mb-6">
          <div className="bg-white rounded-md shadow mb-4">
            <div className="px-5 py-3 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-medium text-emerald-600">Announcements</h3>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {announcements.length} Announcements
                </span>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {announcements.map(announcement => (
                <div key={announcement.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-800">{announcement.title}</div>
                      <div className="text-sm text-gray-500 mt-1">{announcement.content}</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(announcement.priority)}`}>
                          {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)} Priority
                        </span>
                        {announcement.userType && (
                          <span className="text-xs px-2 py-1 rounded-full border bg-emerald-100 text-emerald-800 border-emerald-300">
                            {getUserTypeLabel(announcement.userType)}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Published: {new Date(announcement.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(announcement)}
                        className="text-gray-500 hover:text-emerald-500 transition-colors"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(announcement.id)}
                        className="ml-2 bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal - We could implement this similar to the StudentRequestHandler */}
    </div>
  );
};

export default Announcements;