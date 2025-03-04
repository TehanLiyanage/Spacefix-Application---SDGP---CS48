import React, { useState } from 'react'
import Tasks from './components/Tasks';
import MyTasks from './components/Mytasks';
import Help from './components/Help';
import Sidebar  from './components/Sidebar';
import Header from './components/Header';
import Report from './components/Report';

const App = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  const renderContent = () => {
    switch (activePage) {
      case 'tasks':
        return <Tasks />;
      case 'mytasks':
        return <MyTasks/>
      case 'help':
        return <Help/>
      case 'report':
        return <Report/>
      default:
        return (
          <div className='p-6'>
            <h1 className='text-2xl font-bold'>Welcome to Admin Dashboard</h1>
            <p className='text-gray-600'>Select an option from the sidebar to get started.</p>
          </div>
        );
    };
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

export default App