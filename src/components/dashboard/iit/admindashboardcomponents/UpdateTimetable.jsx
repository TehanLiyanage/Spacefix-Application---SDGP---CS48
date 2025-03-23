import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig.js';

// Simple Alert Component
const Alert = ({ children, variant = 'error' }) => {
  const bgColor = variant === 'error' ? 'bg-red-100' : 'bg-blue-100';
  const textColor = variant === 'error' ? 'text-red-800' : 'text-blue-800';
  
  return (
    <div className={`p-4 ${bgColor} ${textColor} rounded-lg mb-4`}>
      {children}
    </div>
  );
};

const PasswordGate = ({ onAuthenticate }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You should replace this with your desired password
    const correctPassword = 'admin123';
    
    if (password === correctPassword) {
      onAuthenticate(true);
      localStorage.setItem('timetableAuth', 'true');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-6 p-6 bg-white rounded-md shadow">
        <div>
          <h2 className="text-center text-xl font-medium text-emerald-600">
            Timetable Management
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter the password to access the timetable
          </p>
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="rounded-md -space-y-px">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Enter password"
              />
            </div>
          </div>

          {error && (
            <Alert>{error}</Alert>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
            >
              Access Timetable
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UpdateTimeTable = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const auth = localStorage.getItem('timetableAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const timeSlots = [
    "08:30-10:30",
    "10:30-12:30",
    "13:30-15:30",
    "15:30-17:30"
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const groups = Array.from({ length: 10 }, (_, i) => `L5_CS_G${i + 1}`);

  const subjects = [
    { code: "5SENG003C", name: "Algorithms Theory Design and practice" },
    { code: "5COSC021C", name: "Software Development Group Project" },
    { code: "5COSC999C", name: "Professional Development" },
    { code: "5COSC023C", name: "Mobile Application Development" },
    { code: "5COSC024C", name: "Server-side Web Development" },
    { code: "5DATA001C", name: "Data mining and Machine learning" },
    { code: "5CCGD013C", name: "XR Multimodal Interaction" },
    { code: "5CCGD010C", name: "Maths and Physics for Games [CS]" },
    { code: "5COSC022C", name: "Client-Server Architectures [CS]" }
  ];

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

  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [timetableData, setTimetableData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadTimetableData = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(db, 'IIT', 'TimeTable', 'GroupTimeTables', selectedGroup);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setTimetableData(docSnap.data().schedule || {});
        } else {
          setTimetableData({});
        }
      } catch (error) {
        console.error('Error loading timetable:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      loadTimetableData();
    }
  }, [selectedGroup, isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('timetableAuth');
    setIsAuthenticated(false);
  };

  const handleInputChange = (day, timeSlot, field, value) => {
    setTimetableData(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [timeSlot]: {
          ...(prev[day]?.[timeSlot] || {}),
          [field]: value
        }
      }
    }));
  };

  const LecturerSelect = ({ value = '', onChange, day, timeSlot }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    
    const filteredLecturers = lecturers.filter(lecturer => 
      lecturer.name.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
      lecturer.code.toLowerCase().includes(localSearchTerm.toLowerCase())
    );

    const selectedLecturers = value.split(',').filter(Boolean);

    const toggleLecturer = (lecturerCode) => {
      let newSelectedLecturers;
      if (selectedLecturers.includes(lecturerCode)) {
        newSelectedLecturers = selectedLecturers.filter(code => code !== lecturerCode);
      } else {
        newSelectedLecturers = [...selectedLecturers, lecturerCode];
      }
      onChange(newSelectedLecturers.join(','));
    };

    return (
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-1 text-sm border rounded bg-white cursor-pointer min-h-8 flex items-center flex-wrap gap-1"
        >
          {selectedLecturers.length > 0 ? (
            selectedLecturers.map(code => (
              <span key={code} className="bg-emerald-100 px-1 rounded text-xs">
                {code}
              </span>
            ))
          ) : (
            <span className="text-gray-400">Select Lecturers</span>
          )}
        </div>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
            <div className="sticky top-0 bg-white p-2 border-b">
              <input
                type="text"
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                className="w-full p-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Search lecturers..."
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="p-1">
              {filteredLecturers.map(lecturer => (
                <div
                  key={lecturer.code}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLecturer(lecturer.code);
                  }}
                  className={`p-1 cursor-pointer hover:bg-gray-100 text-sm flex items-center ${
                    selectedLecturers.includes(lecturer.code) ? 'bg-emerald-50' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedLecturers.includes(lecturer.code)}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  <span className="font-medium mr-2">{lecturer.code}</span>
                  <span className="text-gray-600">{lecturer.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const CellInputs = ({ day, timeSlot }) => {
    const data = timetableData[day]?.[timeSlot] || {};
    
    return (
      <div className="p-2 space-y-2">
        {/* Subject Dropdown */}
        <select
          value={data.courseCode || ''}
          onChange={(e) => handleInputChange(day, timeSlot, 'courseCode', e.target.value)}
          className="w-full p-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
        >
          <option value="">Select Subject</option>
          {subjects.map(subject => (
            <option key={subject.code} value={subject.code}>
              {subject.code} - {subject.name}
            </option>
          ))}
        </select>

        {/* Class Type */}
        <select
          value={data.type || ''}
          onChange={(e) => handleInputChange(day, timeSlot, 'type', e.target.value)}
          className="w-full p-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
        >
          <option value="">Select Type</option>
          <option value="LEC">LEC</option>
          <option value="TUT">TUT</option>
          <option value="FEEDBACKSESSION">Feedback Session</option>
        </select>

        {/* Location and Room */}
        <div className="flex gap-2">
          <select
            value={data.locationType || ''}
            onChange={(e) => handleInputChange(day, timeSlot, 'locationType', e.target.value)}
            className="w-1/2 p-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
          >
            <option value="">Location</option>
            <option value="PHYSICAL">Physical</option>
            <option value="ONLINE">Online</option>
          </select>
          {data.locationType === 'PHYSICAL' && (
            <select
              value={data.room || ''}
              onChange={(e) => handleInputChange(day, timeSlot, 'room', e.target.value)}
              className="w-1/2 p-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
            >
              <option value="">Room</option>
              {Array.from({ length: 7 }, (_, i) => i + 3).map(floor =>
                ['LA', 'LB', 'LC', 'LD'].map(room => (
                  <option key={`SP-${floor}${room}`} value={`SP-${floor}${room}`}>
                    SP-{floor}{room}
                  </option>
                ))
              )}
            </select>
          )}
        </div>

        {/* Lecturers Multi-Select */}
        <LecturerSelect
          value={data.lecturers || ''}
          onChange={(value) => handleInputChange(day, timeSlot, 'lecturers', value)}
          day={day}
          timeSlot={timeSlot}
        />
      </div>
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const docRef = doc(db, 'IIT', 'TimeTable', 'GroupTimeTables', selectedGroup);
      
      await setDoc(docRef, {
        groupId: selectedGroup,
        schedule: timetableData,
        lastUpdated: new Date().toISOString()
      });

      alert('Timetable saved successfully!');
    } catch (error) {
      console.error('Error saving timetable:', error);
      alert('Error saving timetable. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return <PasswordGate onAuthenticate={setIsAuthenticated} />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-xl sm:text-2xl font-medium text-center text-emerald-600 mb-6">
        Update Timetable
      </h2>

      <div className="bg-white rounded-md shadow p-5 md:p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="mb-2 sm:mb-0">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Group
            </label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {groups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
          
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading timetable data...</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-md shadow overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 bg-gray-50 text-emerald-600 font-medium text-sm w-20">Time</th>
                  {days.map(day => (
                    <th key={day} className="border p-2 bg-gray-50 text-emerald-600 font-medium text-sm w-1/6">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map(timeSlot => (
                  <tr key={timeSlot}>
                    <td className="border p-2 font-medium text-sm bg-gray-50">
                      {timeSlot}
                    </td>
                    {days.map(day => (
                      <td key={`${day}-${timeSlot}`} className="border hover:bg-gray-50 transition-colors">
                        <CellInputs day={day} timeSlot={timeSlot} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                isSaving 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white transition-colors'
              }`}
            >
              {isSaving ? 'Saving...' : 'Save Timetable'}
            </button>
          </div>

          <div className="mt-6 bg-white rounded-md shadow p-4 mb-6">
            <h3 className="text-md font-medium text-emerald-600 mb-3">Instructions:</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
              <li>Select a group from the dropdown above</li>
              <li>Choose subject and class type for each time slot</li>
              <li>Select lecturers from the dropdown (you can select multiple)</li>
              <li>For physical classes, select a room</li>
              <li>Click Save Timetable when finished</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateTimeTable;