import { useState } from 'react'
import StudentRequestHandler from './admindashboardcomponents/StudentRequestHandler';
import LecturerRequestHandler from './admindashboardcomponents/LecturerequestHandler';
import UpdateLecturerInfo from './admindashboardcomponents/UpdateLecturerInfo';
import UpdateStudentInfo from './admindashboardcomponents/UpdateStudentInfo';
import Sidebar from './admindashboardcomponents/Sidebar';
import Header from './admindashboardcomponents/Header';
import ViewClassroomInfo from './admindashboardcomponents/ViewClassRoomInfo';

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  const renderContent = () => {
    switch (activePage) {
      case 'student-request':
        return <StudentRequestHandler />;
      case 'lectures-request':
        return <LecturerRequestHandler/>;
      case 'update-lecturer-info':
        return <UpdateLecturerInfo/>;
      case 'update-student-info':
        return <UpdateStudentInfo/>;
      case 'classroom-info':
        return <ViewClassroomInfo/>;
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

