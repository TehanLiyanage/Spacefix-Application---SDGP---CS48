import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../../firebase/firebaseConfig.js';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

const MyTimetable = () => {
  const [user, setUser] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [timetableData, setTimetableData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        loadGroups();
        loadSavedPreferences();
      }
    });
    return () => unsubscribe();
  }, []);

  // Load group IDs from Firestore
  const loadGroups = async () => {
    try {
      const groupRef = collection(db, 'IIT', 'TimeTable', 'GroupTimeTables');
      const snapshot = await getDocs(groupRef);
      const groups = snapshot.docs.map(doc => doc.id);
      setGroupList(groups);
    } catch (err) {
      console.error('Error loading groups:', err.message);
      setError('Failed to load groups from the database.');
    }
  };

  const loadSavedPreferences = () => {
    try {
      const savedGroup = localStorage.getItem('selectedGroup');
      if (savedGroup) {
        setSelectedGroup(savedGroup);
        const savedTimetable = localStorage.getItem('groupTimetableData');
        if (savedTimetable) {
          setTimetableData(JSON.parse(savedTimetable));
        } else {
          setTimeout(() => loadTimetable(savedGroup), 500);
        }
      }
    } catch (error) {
      console.error("Error loading saved preferences:", error);
    }
  };

  const savePreferences = (group, data) => {
    try {
      localStorage.setItem('selectedGroup', group);
      localStorage.setItem('groupTimetableData', JSON.stringify(data));
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  const loadTimetable = async (group = null) => {
    const groupToUse = group || selectedGroup;
    if (!groupToUse) {
      setError("Please select your group.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const docRef = doc(db, 'IIT', 'TimeTable', 'GroupTimeTables', groupToUse);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setTimetableData(data.schedule || {});
        savePreferences(groupToUse, data.schedule || {});
      } else {
        setTimetableData(null);
        savePreferences(groupToUse, null);
        setError("No timetable data found for the selected group.");
      }
    } catch (err) {
      console.error("Error loading timetable:", err.message);
      setError("Failed to load timetable.");
    } finally {
      setLoading(false);
    }
  };

  const sortDays = (days) => {
    const order = {
      "Monday": 1, "Tuesday": 2, "Wednesday": 3,
      "Thursday": 4, "Friday": 5, "Saturday": 6, "Sunday": 7
    };
    return [...days].sort((a, b) => order[a] - order[b]);
  };

  const sortTimeSlots = (slots) => {
    return [...slots].sort((a, b) => a.localeCompare(b));
  };

  const renderTimetable = () => {
    if (!timetableData || Object.keys(timetableData).length === 0) {
      return <p className="text-gray-600">No timetable data found for this group.</p>;
    }

    const sortedDays = sortDays(Object.keys(timetableData));

    return (
      <div className="space-y-8">
        {sortedDays.map(day => (
          <div key={day} className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-4">{day}</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-4 border-b text-left">Time</th>
                    <th className="py-2 px-4 border-b text-left">Course Code</th>
                    <th className="py-2 px-4 border-b text-left">Type</th>
                    <th className="py-2 px-4 border-b text-left">Location Type</th>
                    <th className="py-2 px-4 border-b text-left">Room</th>
                    <th className="py-2 px-4 border-b text-left">Lecturers</th>
                  </tr>
                </thead>
                <tbody>
                  {sortTimeSlots(Object.keys(timetableData[day])).map(timeSlot => {
                    const slot = timetableData[day][timeSlot];
                    return (
                      <tr key={timeSlot} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{timeSlot}</td>
                        <td className="py-2 px-4 border-b">{slot.courseCode}</td>
                        <td className="py-2 px-4 border-b">{slot.type}</td>
                        <td className="py-2 px-4 border-b">{slot.locationType}</td>
                        <td className="py-2 px-4 border-b">{slot.room || 'N/A'}</td>
                        <td className="py-2 px-4 border-b">{slot.lecturers}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-xl sm:text-2xl font-medium text-center text-emerald-600 mb-6">My Timetable</h2>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        {user ? (
          <div className="bg-emerald-50 p-3 rounded mb-4">
            <p>Logged in as: <span className="font-medium">{user.email}</span></p>
            {selectedGroup && (
              <p className="mt-1">Selected Group: <span className="font-medium">{selectedGroup}</span></p>
            )}
          </div>
        ) : (
          <p className="text-red-500 mb-4">Please log in to view your timetable.</p>
        )}

        {user && (
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full md:w-2/3">
              <label htmlFor="group" className="block text-sm font-medium text-gray-700 mb-1">
                Select Your Group:
              </label>
              <select
                id="group"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 hover:border-emerald-300"
              >
                <option value="">- Select Group -</option>
                {groupList.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => loadTimetable()}
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${loading ? 'bg-gray-400 cursor-not-allowed disabled:opacity-50' : 'bg-emerald-600 hover:bg-emerald-700'}`}
            >
              {loading ? 'Loading...' : 'Load Timetable'}
            </button>
          </div>
        )}

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">{error}</div>}
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-xl font-semibold text-emerald-600 mb-4">Timetable Display</h3>
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            <p className="mt-2">Loading timetable data...</p>
          </div>
        ) : (
          <div>{timetableData ? renderTimetable() : (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <p className="text-lg text-gray-700">Welcome to MyTimetable</p>
              <p className="text-gray-500 mt-2">Select your group and click "Load Timetable" to view your schedule</p>
            </div>
          )}</div>
        )}
      </div>
    </div>
  );
};

export default MyTimetable;
