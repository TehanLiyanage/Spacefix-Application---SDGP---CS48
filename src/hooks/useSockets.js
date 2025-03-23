import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useSocket = (room) => {
  const [socket, setSocket] = useState(null);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    // Replace your current connection line:
    // const socketConnection = io('https://spacefix-application-backend-sdgp-cs48.onrender.com');
    
    // With this environment variable based connection:
    const socketConnection = io(import.meta.env.VITE_API_URL, {
      withCredentials: true
    });
    
    setSocket(socketConnection);
    
    // Connect to the specified room
    socketConnection.emit('joinRoom', room);
    
    // Listen for updates
    socketConnection.on('lecturerRequestUpdate', (data) => {
      console.log('New update:', data);
      setUpdates(prev => [...prev, data]);
    });
    
    // Cleanup on component unmount
    return () => {
      socketConnection.disconnect();
    };
  }, [room]);

  return { socket, updates };
};

export default useSocket;