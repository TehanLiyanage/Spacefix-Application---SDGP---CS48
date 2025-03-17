// src/services/lostItemsAPI.js
import axios from 'axios';
import { getAuth } from 'firebase/auth';

// API base URL from environment variable or default
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance for lost items API
const lostItemsAPI = {
  // Get auth token from Firebase
  getAuthToken: async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      return user.getIdToken();
    }
    
    throw new Error('User not authenticated');
  },
  
  // Submit a new lost item
  submitLostItem: async (itemData) => {
    try {
      const token = await lostItemsAPI.getAuthToken();
      
      const response = await axios.post(
        `${API_BASE_URL}/student/lost-items`, 
        itemData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('API Error - Submit Lost Item:', error);
      throw error;
    }
  },
  
  // Get all lost items for the current user
  getMyLostItems: async () => {
    try {
      const token = await lostItemsAPI.getAuthToken();
      
      const response = await axios.get(
        `${API_BASE_URL}/student/lost-items/my-items`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('API Error - Get My Lost Items:', error);
      throw error;
    }
  },
  
  // Get all found items
  getFoundItems: async () => {
    try {
      const token = await lostItemsAPI.getAuthToken();
      
      const response = await axios.get(
        `${API_BASE_URL}/student/lost-items/found-items`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('API Error - Get Found Items:', error);
      throw error;
    }
  },
  
  // Mark a lost item as found
  markAsFound: async (itemId) => {
    try {
      const token = await lostItemsAPI.getAuthToken();
      
      const response = await axios.put(
        `${API_BASE_URL}/student/lost-items/${itemId}/mark-as-found`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('API Error - Mark As Found:', error);
      throw error;
    }
  },
  
  // Remove a lost item
  removeItem: async (itemId) => {
    try {
      const token = await lostItemsAPI.getAuthToken();
      
      const response = await axios.delete(
        `${API_BASE_URL}/student/lost-items/${itemId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('API Error - Remove Item:', error);
      throw error;
    }
  }
};

export default lostItemsAPI;