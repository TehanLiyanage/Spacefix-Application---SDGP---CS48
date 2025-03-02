import React, { useState, useEffect } from 'react';

const Timetable = ({ setCurrentPage }) => {
  // State for form inputs
  const [day, setDay] = useState('Monday');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [venue, setVenue] = useState('');
  const [subject, setSubject] = useState('');
  const [note, setNote] = useState('');
  
  // State for timetable data
  const [timetableData, setTimetableData] = useState(() => {
    // Try to load saved data from localStorage
    const savedData = localStorage.getItem('lecturerTimetable');
    return savedData ? JSON.parse(savedData) : [];
  });
  
  // Filter for viewing specific days
  const [filterDay, setFilterDay] = useState('All');
  
  // Save to localStorage whenever timetable data changes
  useEffect(() => {
    localStorage.setItem('lecturerTimetable', JSON.stringify(timetableData));
  }, [timetableData]);
  
  // Days of the week array
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new timetable entry
    const newEntry = {
      id: Date.now(), // Unique ID for each entry
      day,
      startTime,
      endTime,
      venue,
      subject,
      note,
      createdAt: new Date().toISOString()
    };
    
    // Add new entry to timetable data
    setTimetableData([...timetableData, newEntry]);
    
    // Reset form fields
    setVenue('');
    setSubject('');
    setNote('');
    // Keep day and time for convenience if adding multiple entries on same day
  };
  
  // Delete an entry
  const deleteEntry = (id) => {
    setTimetableData(timetableData.filter(entry => entry.id !== id));
  };
  
  // Filter timetable data by day
  const filteredData = filterDay === 'All' 
    ? timetableData 
    : timetableData.filter(entry => entry.day === filterDay);
  
  // Sort data by day and time
  const sortedData = [...filteredData].sort((a, b) => {
    // First sort by day of week
    const dayDiff = days.indexOf(a.day) - days.indexOf(b.day);
    if (dayDiff !== 0) return dayDiff;
    
    // Then sort by start time
    return a.startTime.localeCompare(b.startTime);
  });
  
  // Group entries by day for organized display
  const groupedByDay = {};
  days.forEach(day => {
    groupedByDay[day] = sortedData.filter(entry => entry.day === day);
  });
  
  return (
    <div className="min-h-screen bg-gray-100 p-4 pt-16">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => setCurrentPage('dashboard')}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          Back to Dashboard
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Timetable Management</h1>
        
        {/* Add New Entry Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Class</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
              <select 
                value={day} 
                onChange={(e) => setDay(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                {days.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input 
                type="time" 
                value={startTime} 
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input 
                type="time" 
                value={endTime} 
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
              <input 
                type="text" 
                value={venue} 
                onChange={(e) => setVenue(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="1LA"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input 
                type="text" 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="OOP"
                required
              />
            </div>
            
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
              <textarea 
                value={note} 
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Bring projector, quiz day, etc."
                rows="2"
              />
            </div>
            
            <div className="md:col-span-2 lg:col-span-3">
              <button 
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add to Timetable
              </button>
            </div>
          </form>
        </div>
        
        {/* Timetable Display */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Timetable</h2>
            <div className="flex items-center">
              <label className="mr-2 text-sm font-medium text-gray-700">Filter by day:</label>
              <select 
                value={filterDay} 
                onChange={(e) => setFilterDay(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="All">All Days</option>
                {days.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
          
          {sortedData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No classes added to your timetable yet.
            </div>
          ) : (
            filterDay === 'All' ? (
              // Display grouped by day when showing all days
              days.map(day => {
                // Skip days with no entries
                if (groupedByDay[day].length === 0) return null;
                
                return (
                  <div key={day} className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-1">{day}</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {groupedByDay[day].map(entry => (
                            <tr key={entry.id}>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.startTime} - {entry.endTime}</td>
                              <td className="px-4 py-4 text-sm text-gray-900">{entry.subject}</td>
                              <td className="px-4 py-4 text-sm text-gray-900">{entry.venue}</td>
                              <td className="px-4 py-4 text-sm text-gray-500">{entry.note || '—'}</td>
                              <td className="px-4 py-4 text-sm text-gray-500">
                                <button 
                                  onClick={() => deleteEntry(entry.id)} 
                                  className="text-red-600 hover:text-red-800"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })
            ) : (
              // Display a simple table when filtered to a specific day
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedData.map(entry => (
                      <tr key={entry.id}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.startTime} - {entry.endTime}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{entry.subject}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{entry.venue}</td>
                        <td className="px-4 py-4 text-sm text-gray-500">{entry.note || '—'}</td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          <button 
                            onClick={() => deleteEntry(entry.id)} 
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Timetable;