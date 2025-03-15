// src/hooks/useSocket.js
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useSocket = (room) => {
  const [socket, setSocket] = useState(null);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    // Create socket connection
    const socketConnection = io('http://localhost:5000');
    setSocket(socketConnection);
    
    // Connect to the specified room
    socketConnection.emit('joinRoom', room);
    
    // Listen for updates
    socketConnection.on('lecturerRequestUpdate', (data) => {
      console.log('New update:', data);
      setUpdates(prev => [...prev, data]);
      // You can add more specific handling here
    });
    
    // Cleanup on component unmount
    return () => {
      socketConnection.disconnect();
    };
  }, [room]);

  return { socket, updates };
};

export default useSocket;