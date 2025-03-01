import React, { useState } from "react";
import MyTimetable from "./studentDashboardComponents/MyTimetable";
import SpaceAvailability from "./studentDashboardComponents/SpaceAvailability";
import Sidebar from "./studentDashboardComponents/Sidebar";
import Header from "./studentDashboardComponents/Header";


const StudentDashboard = () => {
  const [activePage, setActivePage] = useState("timetable");
  const [showNotifications, setShowNotifications] = useState(false);

  // ✅ Function to dynamically render the selected page
  const renderPage = () => {
    switch (activePage) {
      case "timetable":
        return <MyTimetable/>;
      case "spaces":
        return < SpaceAvailability />;
      default:
        return < MyTimetable/>;
    }
  };

  return (
    <div className="flex">
      {/* ✅ Sidebar Navigation */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="flex-1 ml-64">
        {/* ✅ Header */}
        <Header
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
        />

        {/* ✅ Main Content Area */}
        <main className="mt-16 p-6 bg-gray-100 min-h-screen">{renderPage()}</main>
      </div>
    </div>
  );
};

export default StudentDashboard;
