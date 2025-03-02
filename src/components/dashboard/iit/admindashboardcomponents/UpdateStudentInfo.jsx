import React, { useState } from 'react';
import { User, Mail, Phone, GraduationCap, Calendar, Home, Book } from 'lucide-react';

const UpdateStudentInfo = () => {
  const [student, setStudent] = useState({
    personalInfo: {
      id: "ST001",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@university.edu",
      phone: "+1234567890",
      dateOfBirth: "2000-05-15",
      address: "123 Campus Street"
    },
    academicInfo: {
      batch: "2021",
      degree: "BSc Computer Science",
      semester: "4",
      enrollmentStatus: "Active",
      registeredCourses: ["Database Systems", "Web Development", "Data Structures"],
      gpa: "3.8"
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(student);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleCoursesChange = (value) => {
    setFormData(prev => ({
      ...prev,
      academicInfo: {
        ...prev.academicInfo,
        registeredCourses: value.split(',').map(course => course.trim())
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the student info
    setStudent(formData);
    setIsEditing(false);
    setMessage({ type: 'success', text: 'Student information updated successfully!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Update Student Information</h1>
        <p className="text-gray-600">View and modify student details</p>
      </div>

      {message.text && (
        <div className={`mb-4 p-4 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold">Student Profile</h2>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded ${
              isEditing 
                ? 'bg-gray-200 hover:bg-gray-300' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isEditing ? 'Cancel' : 'Edit Information'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Personal Information Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student ID
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.id}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  UOW ID
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.id}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date of Birth
                  </div>
                </label>
                <input
                  type="date"
                  value={formData.personalInfo.dateOfBirth}
                  onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.firstName}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.lastName}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </div>
                </label>
                <input
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </div>
                </label>
                <input
                  type="tel"
                  value={formData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Address
                  </div>
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.address}
                  onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Academic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Degree Program 
                  </div>
                </label>
                <input
                  type="text"
                  value={formData.academicInfo.degree}
                  onChange={(e) => handleInputChange('academicInfo', 'degree', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Batch
                </label>
                <input
                  type="text"
                  value={formData.academicInfo.batch}
                  onChange={(e) => handleInputChange('academicInfo', 'batch', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Semester
                </label>
                <input
                  type="number"
                  value={formData.academicInfo.semester}
                  onChange={(e) => handleInputChange('academicInfo', 'semester', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GPA
                </label>
                <input
                  type="text"
                  value={formData.academicInfo.gpa}
                  onChange={(e) => handleInputChange('academicInfo', 'gpa', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enrollment Status
                </label>
                <select
                  value={formData.academicInfo.enrollmentStatus}
                  onChange={(e) => handleInputChange('academicInfo', 'enrollmentStatus', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <Book className="w-4 h-4" />
                    Registered Courses (comma-separated)
                  </div>
                </label>
                <input
                  type="text"
                  value={formData.academicInfo.registeredCourses.join(', ')}
                  onChange={(e) => handleCoursesChange(e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setFormData(student);
                  setIsEditing(false);
                }}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateStudentInfo;