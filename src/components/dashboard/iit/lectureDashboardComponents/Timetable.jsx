import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../../firebase/firebaseConfig.js';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';

const Timetable = () => {
  const [user, setUser] = useState(null);
  const [selectedLecturerCode, setSelectedLecturerCode] = useState('');
  const [timetableData, setTimetableData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hard-coded list of lecturers
  const lecturers = [
    { code: "ADS", name: "Adshayani Pirapaharan" },
    { code: "ADSH", name: "Adshayan Balachandran" },
    { code: "AHTU", name: "Ahtshayan Udayasanthiran" },
    { code: "AKAR", name: "Akarshani Ramanayake" },
    { code: "AKSH", name: "Akarshani Amarasinghe" },
    { code: "AMMR", name: "Ammar Raneez" },
    { code: "ASIP", name: "Asith Pallemulla" },
    { code: "AYB", name: "Mohamed Ayoob" },
    { code: "BAL", name: "Bala Sathianathan" },
    { code: "BHD", name: "Bhathiya Dissanayake" },
    { code: "BNU", name: "Banu Athuraliya" },
    { code: "BUD", name: "Buddhika Premarathne" },
    { code: "CAS", name: "Cassim Farook" },
    { code: "CHAJ", name: "Charitha Jayampathy" },
    { code: "CLAW", name: "Claudia Warnakulaarachich" },
    { code: "DAS", name: "Dasun Arandalage" },
    { code: "DES", name: "Deshan Sumanathilaka" },
    { code: "DILL", name: "Dilani Lunugalage" },
    { code: "DLK", name: "Dileeka Alwis" },
    { code: "GANR", name: "Gangulie Ranawaka" },
    { code: "HASI", name: "Hasindu Ramanayake" },
    { code: "HIR", name: "Hiruni Samarage" },
    { code: "HIRUK", name: "Hiruni Kasthuriarachchi" },
    { code: "IMA", name: "Imani Randuli" },
    { code: "IMESH", name: "Imesh Pathirana" },
    { code: "JIE", name: "Jiehfeng Hsu" },
    { code: "JOH", name: "John Sriskandarajah" },
    { code: "KALW", name: "Kalhari Walawage" },
    { code: "KASUW", name: "Dr Kasuni Welihinda" },
    { code: "KELUM", name: "Kelum De Silva" },
    { code: "KRIPA", name: "Krishnakripa Jayakumar" },
    { code: "KRISH", name: "Krishnamurthi Caucidheesan" },
    { code: "KUS", name: "Kushan Bhareti" },
    { code: "MAL", name: "Malsha Fernando" },
    { code: "MANU", name: "Manul Singhe" },
    { code: "MITHU", name: "Mithushan Jalangan" },
    { code: "MJAN", name: "Mohanadas Jananie" },
    { code: "MOSH", name: "Mohamed Shazeen" },
    { code: "NEVI", name: "Nevindu Jayathilake" },
    { code: "NPU", name: "Nipuna Senanayake" },
    { code: "ODHS", name: "Odhith Seneviratne" },
    { code: "PJN", name: "Pubudu Janith" },
    { code: "PRMU", name: "Prashastha Mudannayake" },
    { code: "PRSH", name: "Prashan Rathnayaka" },
    { code: "PUBD", name: "Pubudu De Silva" },
    { code: "PUSH", name: "Pushpika Prasad Liyanaarachchi" },
    { code: "RAJ", name: "Rajeiha Sutharsan" },
    { code: "RUW", name: "Ruwan Egodawatte" },
    { code: "RUZK", name: "Ruzaik Seyed" },
    { code: "SAADH", name: "Saadh Jawwadh" },
    { code: "SACB", name: "Sachini Bambaranda" },
    { code: "SACHT", name: "Sachithra Thilakarathne" },
    { code: "SAHDI", name: "Sahdiya Hussain" },
    { code: "SAHP", name: "Sahan Priyanayana" },
    { code: "SALIP", name: "Salitha Perera" },
    { code: "SANDU", name: "Sandunika Rasanjalee" },
    { code: "SANM", name: "Santhusha Mallawatantri" },
    { code: "SAP", name: "Sapna Kumarapathirage" },
    { code: "SARK", name: "Saranga Kumarapeli" },
    { code: "SAVH", name: "Savinu Hasanlanka" },
    { code: "SAVM", name: "Savin Madapatha" },
    { code: "SLR", name: "Sulari Fernando" },
    { code: "SUR", name: "Suresh Peris" },
    { code: "SUVE", name: "Suvetha Suvendran" },
    { code: "THARR", name: "Thashin Rahuman" },
    { code: "THE", name: "Theja Perera" },
    { code: "THLG", name: "Thilanga Liyanage" },
    { code: "TOR", name: "Torin Weerasinghe" },
    { code: "UTHP", name: "Uthpala Nimanthi" },
    { code: "UVI", name: "Uvini Abeyasinghe" },
    { code: "VATD", name: "Vathila De Silva" },
    { code: "VISHM", name: "Vishmi Embuldeniya" },
    { code: "WIM", name: "Prof Prasad Wimalaratne" },
    { code: "YAS", name: "Yasiru Rashan" }
  ];

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      // If user is logged in, load saved preferences
      if (currentUser) {
        loadSavedPreferences();
      }
    });

    return () => unsubscribe();
  }, []);

  // Load saved preferences from localStorage
  const loadSavedPreferences = () => {
    try {
      // Get saved lecturer code
      const savedLecturerCode = localStorage.getItem('selectedLecturerCode');
      if (savedLecturerCode) {
        setSelectedLecturerCode(savedLecturerCode);
        
        // Get saved timetable data
        const savedTimetableData = localStorage.getItem('timetableData');
        if (savedTimetableData) {
          setTimetableData(JSON.parse(savedTimetableData));
        } else {
          // If we have a code but no data, load the timetable
          setTimeout(() => {
            loadTimetable(savedLecturerCode);
          }, 500); // Small delay to ensure state is updated
        }
      }
    } catch (error) {
      console.error("Error loading saved preferences:", error);
    }
  };

  // Save preferences to localStorage
  const savePreferences = (lecturerCode, data) => {
    try {
      localStorage.setItem('selectedLecturerCode', lecturerCode);
      localStorage.setItem('timetableData', JSON.stringify(data));
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  // Log important events to console only
  const logInfo = (message) => {
    console.log(message);
  };

  // Load timetable for the selected lecturer code
  const loadTimetable = async (lecturerCode = null) => {
    const codeToUse = lecturerCode || selectedLecturerCode;
    
    if (!codeToUse) {
      setError("Please select a lecturer code to load timetable data");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      logInfo(`Starting timetable search for lecturer: ${codeToUse}`);
      
      // Using the correct path: /IIT/TimeTable/GroupTimeTables
      try {
        const groupTimeTablesRef = collection(db, 'IIT', 'TimeTable', 'GroupTimeTables');
        const groupTimeTablesSnapshot = await getDocs(groupTimeTablesRef);
        
        logInfo(`Found ${groupTimeTablesSnapshot.docs.length} documents in GroupTimeTables collection`);
        
        if (groupTimeTablesSnapshot.docs.length === 0) {
          setError("No timetable data found in the database.");
          setLoading(false);
          return;
        }

        // Process timetable documents
        const timetableResults = {};
        
        for (const timetableDoc of groupTimeTablesSnapshot.docs) {
          const timetableId = timetableDoc.id;
          const timetableData = timetableDoc.data();
          
          logInfo(`Processing timetable: ${timetableId}`);
          
          // Check if schedule exists
          if (!timetableData.schedule) {
            logInfo(`No schedule found in timetable: ${timetableId}`);
            continue;
          }
          
          // Create filtered schedule
          const filteredSchedule = {};
          let timetableHasMatches = false;
          
          // Process each day in the schedule
          for (const [day, daySchedule] of Object.entries(timetableData.schedule)) {
            const filteredDaySchedule = {};
            let dayHasMatches = false;
            
            // Process each time slot in the day
            for (const [timeSlot, slotData] of Object.entries(daySchedule)) {
              // Check if lecturers field exists
              if (!slotData.lecturers) {
                continue;
              }
              
              // Check for lecturer match
              const lecturerCodes = slotData.lecturers.split(',').map(code => code.trim());
              
              if (lecturerCodes.includes(codeToUse)) {
                logInfo(`Match found: ${codeToUse} in ${timetableId} > ${day} > ${timeSlot}`);
                filteredDaySchedule[timeSlot] = slotData;
                dayHasMatches = true;
                timetableHasMatches = true;
              }
            }
            
            // Only add days with matching slots
            if (dayHasMatches) {
              filteredSchedule[day] = filteredDaySchedule;
            }
          }
          
          // Only add timetables with matching data
          if (timetableHasMatches) {
            timetableResults[timetableId] = filteredSchedule;
          }
        }
        
        // Set the timetable data
        if (Object.keys(timetableResults).length === 0) {
          setTimetableData(null);
          // If no data found, clear the saved data
          savePreferences(codeToUse, null);
        } else {
          setTimetableData(timetableResults);
          // Save the preferences to localStorage
          savePreferences(codeToUse, timetableResults);
        }
        
      } catch (err) {
        console.error(`Error accessing GroupTimeTables collection: ${err.message}`);
        setError(`Error accessing timetable collection: ${err.message}`);
      }

      setLoading(false);
    } catch (err) {
      console.error(`Error: ${err.message}`);
      setError(`Error: ${err.message}`);
      setLoading(false);
    }
  };
  
  // Handle lecturer code selection
  const handleLecturerCodeChange = (e) => {
    setSelectedLecturerCode(e.target.value);
  };

  // Sort days of the week in correct order
  const sortDays = (days) => {
    const dayOrder = {
      "Monday": 1,
      "Tuesday": 2,
      "Wednesday": 3,
      "Thursday": 4,
      "Friday": 5,
      "Saturday": 6,
      "Sunday": 7
    };
    
    return [...days].sort((a, b) => dayOrder[a] - dayOrder[b]);
  };
  
  // Sort time slots in chronological order
  const sortTimeSlots = (timeSlots) => {
    return [...timeSlots].sort((a, b) => {
      const aStart = a.split('-')[0];
      const bStart = b.split('-')[0];
      return aStart.localeCompare(bStart);
    });
  };

  // Render timetable organized by days of the week
  const renderTimetable = () => {
    if (!timetableData || Object.keys(timetableData).length === 0) {
      return <p className="text-gray-600">No timetable data found for this lecturer code.</p>;
    }

    // Organize data by days rather than by groups
    const dayBasedSchedule = {};
    
    // Collect all data across all groups, organized by days
    Object.entries(timetableData).forEach(([timetableId, timetable]) => {
      Object.entries(timetable).forEach(([day, daySchedule]) => {
        if (!dayBasedSchedule[day]) {
          dayBasedSchedule[day] = {};
        }
        
        Object.entries(daySchedule).forEach(([timeSlot, slotData]) => {
          const uniqueKey = `${timeSlot}-${timetableId}`;
          dayBasedSchedule[day][uniqueKey] = {
            ...slotData,
            group: timetableId  // Add group information to each slot
          };
        });
      });
    });
    
    // Sort days of the week
    const sortedDays = sortDays(Object.keys(dayBasedSchedule));
    
    return (
      <div className="space-y-8">
        {sortedDays.map((day) => (
          <div key={day} className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-4">{day}</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-4 border-b text-left">Time</th>
                    <th className="py-2 px-4 border-b text-left">Group</th>
                    <th className="py-2 px-4 border-b text-left">Course Code</th>
                    <th className="py-2 px-4 border-b text-left">Type</th>
                    <th className="py-2 px-4 border-b text-left">Location Type</th>
                    <th className="py-2 px-4 border-b text-left">Room</th>
                    <th className="py-2 px-4 border-b text-left">All Lecturers</th>
                  </tr>
                </thead>
                <tbody>
                  {sortTimeSlots(Object.keys(dayBasedSchedule[day])).map((uniqueKey) => {
                    const slotData = dayBasedSchedule[day][uniqueKey];
                    const timeSlot = uniqueKey.split('-')[0]; // Extract time from the unique key
                    
                    return (
                      <tr key={uniqueKey} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{timeSlot}</td>
                        <td className="py-2 px-4 border-b">{slotData.group}</td>
                        <td className="py-2 px-4 border-b">{slotData.courseCode}</td>
                        <td className="py-2 px-4 border-b">{slotData.type}</td>
                        <td className="py-2 px-4 border-b">{slotData.locationType}</td>
                        <td className="py-2 px-4 border-b">{slotData.room || 'N/A'}</td>
                        <td className="py-2 px-4 border-b">{slotData.lecturers}</td>
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
      <h2 className="text-2xl font-bold mb-6">Timetable</h2>
      
      {user ? (
        <div className="bg-gray-50 p-3 rounded mb-6">
          <p>Logged in as: <span className="font-medium">{user.email}</span></p>
          {selectedLecturerCode && (
            <p className="mt-1">Showing timetable for: <span className="font-medium">{selectedLecturerCode} - {lecturers.find(l => l.code === selectedLecturerCode)?.name || ''}</span></p>
          )}
        </div>
      ) : (
        <p className="text-red-500 mb-6">Please log in to view your timetable.</p>
      )}
      
      {user && (
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
          <div className="w-full md:w-2/3">
            <label htmlFor="lecturerCode" className="block text-sm font-medium text-gray-700 mb-1">
              Select Lecturer Code:
            </label>
            <select 
              id="lecturerCode" 
              value={selectedLecturerCode} 
              onChange={handleLecturerCodeChange}
              disabled={loading}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">- Select Lecturer Code -</option>
              {lecturers.map(lecturer => (
                <option key={lecturer.code} value={lecturer.code}>
                  {lecturer.code} - {lecturer.name}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            onClick={() => loadTimetable()} 
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Loading...' : 'Load Timetable'}
          </button>
        </div>
      )}
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      
      {loading ? (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-2">Loading...</p>
        </div>
      ) : (
        <div className="mt-4">
          {timetableData ? renderTimetable() : (
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p className="text-lg text-gray-700">No timetable data to display</p>
              <p className="text-gray-500 mt-2">Select a lecturer code and click "Load Timetable" to view their schedule</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Timetable;