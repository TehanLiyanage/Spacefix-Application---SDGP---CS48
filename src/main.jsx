import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import './index.css';
import HomePage from './components/HomePage';
import IITRoleLogin from './components/logins/iitlogins/IITRoleLogin.jsx';
import UniversityLoginDashboard from './components/logins/UniversityLoginDashboard.jsx';
import IITStudentLogin from './components/logins/iitlogins/IITStudentLogin.jsx';
import TimeTableUpdate from './components/iitadmin/TimeTableUpdate.jsx';
import InquiryForm from './components/landingpage/InquiryForm.jsx';
import AdminDashboard from './components/dashboard/iit/AdminDashboard.jsx';
import IITAdminLogin from './components/logins/iitlogins/IITAdminLogin.jsx';
import StudentDashboard from './components/dashboard/iit/StudentDashboard.jsx';
import LectureDashboard from './components/dashboard/iit/LectureDashboard.jsx';
import LabkeeperDashboard from './components/dashboard/iit/LabkeeperDashboard.jsx';
import IITLecturerLogin from './components/logins/iitlogins/IITLectureLogin.jsx';
import IITLabkeeperLogin from './components/logins/iitlogins/IITLabkeeperLogin.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/iit-admin-login" element={<IITAdminLogin />} />
        <Route path="/uni-login" element={<UniversityLoginDashboard />} />
        <Route path="/iit-role-login" element={<IITRoleLogin />} />
        <Route path="/iit-student-login" element={<IITStudentLogin />} />
        <Route path="/iit-lecturer-login" element={< IITLecturerLogin/>} />
        <Route path="/timetable-update" element={<TimeTableUpdate />} />
        <Route path="/inquiry" element={<InquiryForm />} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/lecturer-dashboard" element={<LectureDashboard />} />
        <Route path="/labkeeper-dashboard" element={<LabkeeperDashboard />} /> 
        <Route path="/iit-labkeeper-login" element={<IITLabkeeperLogin />} /> 


      </Routes>
    </BrowserRouter>
  </StrictMode>,
);