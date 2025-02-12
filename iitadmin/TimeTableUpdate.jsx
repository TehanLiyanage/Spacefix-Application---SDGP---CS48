import React, { useState } from 'react';
import { Save } from 'lucide-react';

const TimeTableUpdate = () => {
  const WORKING_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const TIME_SLOTS = [
    '08:30-10:30',
    '10:30-12:30',
    '13:30-15:30',
    '15:30-17:30'
  ];

  const [selectedRoom, setSelectedRoom] = useState('');
  const [timetableData, setTimetableData] = useState(() => {
    const initialData = {};
    WORKING_DAYS.forEach(day => {
      initialData[day] = {
        schedule: TIME_SLOTS.map(time => ({
          time,
          subject: {
            code: '',
            name: ''
          },
          status: 'free'
        }))
      };
    });
    return initialData;
  });

  const handleSubjectChange = (day, timeIndex, field, value) => {
    setTimetableData(prev => ({
      ...prev,
      [day]: {
        schedule: prev[day].schedule.map((slot, idx) => 
          idx === timeIndex ? {
            ...slot,
            subject: {
              ...slot.subject,
              [field]: value
            },
            status: (value && field === 'name') ? 'ongoing lecture' : slot.status
          } : slot
        )
      }
    }));
  };

  const handleSaveTimetable = async () => {
    try {
      const timetableToSave = {
        name: selectedRoom,
        capacity: 60,
        timetable: Object.entries(timetableData).reduce((acc, [day, data]) => {
          acc[day] = {
            schedule: data.schedule.map(slot => ({
              ...slot,
              status: slot.subject.name ? 'ongoing lecture' : 'free'
            }))
          };
          return acc;
        }, {})
      };
      
      console.log('Saving timetable:', timetableToSave);
      
    } catch (error) {
      console.error('Error saving timetable:', error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold">Timetable Management</h2>
      </div>
      <div className="p-6">
        <div className="mb-6">
          <select 
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            <option value="">Select Room</option>
            <option value="5LA">5LA</option>
            <option value="5LB">5LB</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 bg-gray-50 font-semibold text-left">Time Slot</th>
                {WORKING_DAYS.map(day => (
                  <th key={day} className="border p-2 bg-gray-50 font-semibold text-left">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIME_SLOTS.map((timeSlot, timeIndex) => (
                <tr key={timeSlot}>
                  <td className="border p-2 font-medium bg-gray-50">{timeSlot}</td>
                  {WORKING_DAYS.map(day => (
                    <td key={`${day}-${timeSlot}`} className="border p-2">
                      <div className="space-y-2">
                        <input
                          type="text"
                          className="w-full p-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={timetableData[day].schedule[timeIndex].subject.code}
                          onChange={(e) => handleSubjectChange(day, timeIndex, 'code', e.target.value)}
                          placeholder="Subject Code (e.g., CS101)"
                        />
                        <input
                          type="text"
                          className="w-full p-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={timetableData[day].schedule[timeIndex].subject.name}
                          onChange={(e) => handleSubjectChange(day, timeIndex, 'name', e.target.value)}
                          placeholder="Subject Name"
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            onClick={handleSaveTimetable}
            disabled={!selectedRoom}
            className={`flex items-center gap-2 px-4 py-2 rounded text-white text-sm
              ${selectedRoom 
                ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' 
                : 'bg-gray-400 cursor-not-allowed'
              }`}
          >
            <Save className="w-4 h-4" />
            Save Timetable
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeTableUpdate;