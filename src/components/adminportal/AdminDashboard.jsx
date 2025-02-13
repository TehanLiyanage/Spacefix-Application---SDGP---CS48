import React from 'react';
import { useNavigate } from 'react-router-dom';

// Fallback icons if lucide-react is not installed
const IconFallback = ({ className }) => (
  <div className={`${className} flex items-center justify-center bg-blue-100 rounded-lg`}>
    <span className="text-blue-600">🔍</span>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 1,
      title: 'Timetable Management',
      description: 'Update and manage class schedules',
      path: '/timetable-update' 
    },
    {
      id: 2,
      title: 'Classroom Allocation',
      description: 'Assign and manage classroom spaces',
      path: '/classrooms'
    },
    {
      id: 3,
      title: 'Lab Scheduling',
      description: 'Manage laboratory sessions',
      path: '/labs'
    },
    {
      id: 4,
      title: 'Event Spaces',
      description: 'Book and manage event venues',
      path: '/events'
    },
    {
      id: 5,
      title: 'Study Areas',
      description: 'Monitor and manage study spaces',
      path: '/study-areas'
    },
    {
      id: 6,
      title: 'Resource Booking',
      description: 'Schedule equipment and resources',
      path: '/resources'
    }
  ];

  const handleNavigate = (path) => {
    navigate(path); // ✅ No need for extra checks, navigate is always available
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage university spaces and resources</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => handleNavigate(feature.path)}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-left border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <IconFallback className="h-10 w-10" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h2>
              <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
