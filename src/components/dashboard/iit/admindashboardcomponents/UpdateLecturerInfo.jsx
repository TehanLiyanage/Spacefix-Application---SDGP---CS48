import React, { useState } from 'react';
import { User, Mail, Phone, BookOpen, Building, Clock } from 'lucide-react';

const UpdateLecturerInfo = () => {
  const [lecturer, setLecturer] = useState({
    personalInfo: {
      id: "LC001",
      firstName: "John",
      lastName: "Smith",
      title: "Dr.",
      email: "john.smith@university.edu",
      phone: "+1234567890",
      department: "Computer Science"
    },
    teachingInfo: {
      specialization: "Database Systems",
      subjects: ["Database Management", "Data Structures", "SQL"],
      officeHours: "Mon, Wed 10:00-12:00",
      officeLocation: "Building A, Room 204"
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(lecturer);
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

  const handleSubjectsChange = (value) => {
    setFormData(prev => ({
      ...prev,
      teachingInfo: {
        ...prev.teachingInfo,
        subjects: value.split(',').map(subject => subject.trim())
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the lecturer info
    setLecturer(formData);
    setIsEditing(false);
    setMessage({ type: 'success', text: 'Lecturer information updated successfully!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Update Lecturer Information</h1>
        <p className="text-gray-600">View and modify lecturer details</p>
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
            <h2 className="text-lg font-semibold">Lecturer Profile</h2>
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
                  Title
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.title}
                  onChange={(e) => handleInputChange('personalInfo', 'title', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Staff ID
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
            </div>
          </div>

          {/* Teaching Information Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Teaching Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Specialization
                  </div>
                </label>
                <input
                  type="text"
                  value={formData.teachingInfo.specialization}
                  onChange={(e) => handleInputChange('teachingInfo', 'specialization', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subjects (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.teachingInfo.subjects.join(', ')}
                  onChange={(e) => handleSubjectsChange(e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Office Hours
                  </div>
                </label>
                <input
                  type="text"
                  value={formData.teachingInfo.officeHours}
                  onChange={(e) => handleInputChange('teachingInfo', 'officeHours', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Office Location
                  </div>
                </label>
                <input
                  type="text"
                  value={formData.teachingInfo.officeLocation}
                  onChange={(e) => handleInputChange('teachingInfo', 'officeLocation', e.target.value)}
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
                  setFormData(lecturer);
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

export default UpdateLecturerInfo;