import { useState } from 'react'
import Sidebar from './components/Sidebar'
import StudentRequestHandler from './components/StudentRequestHandler'
import LecturerRequestHandler from './components/LecturerequestHandler'
import Header from './components/Header'
import UpdateLecturerInfo from './components/UpdateLecturerInfo'
import UpdateStudentInfo from './components/UpdateStudentInfo'

const AdmiDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  const renderContent = () => {
    switch (activePage) {
      case 'student-request':
        return <StudentRequestHandler />;
      case 'lectures-request':
        return <LecturerRequestHandler />;
      case 'update-lecturer-info':
        return <UpdateLecturerInfo />;
      case 'update-student-info':
        return <UpdateStudentInfo />;
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Welcome to Admin Dashboard</h1>
            <p className="text-gray-600">Select an option from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 ml-64">
      <Header 
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
      />
        <main className="pt-16"> {/* Add padding-top to account for fixed header */}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

