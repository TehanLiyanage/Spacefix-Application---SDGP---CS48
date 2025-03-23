import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Building, Plus, Edit, Trash2, Search, X, Save, AlertCircle } from 'lucide-react';
import axios from 'axios';

// Use Vite environment variable with fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  const emptyStudentTemplate = {
    displayName: "",
    email: "",
    phone: "",
    department: ""
  };

  // Fetch all students when component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      // const response = await axios.get('http://localhost:5000/api/students');
      const response = await axios.get(`${API_BASE_URL}/api/students`);
      
      if (response.data.students) {
        console.log("Students data received:", response.data.students[0]);
        setStudents(response.data.students);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Failed to load students. Please try again later.');
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Update display name with first and last name
  const handleNameChange = (type, value) => {
    const names = splitName(formData.displayName || '');
    if (type === 'firstName') {
      handleInputChange('displayName', `${value} ${names.lastName}`);
    } else {
      handleInputChange('displayName', `${names.firstName} ${value}`);
    }
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setFormData(student);
    setIsEditing(false);
    setIsAdding(false);
    setMessage({ type: '', text: '' }); // Clear any messages
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter(student => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (student.displayName && student.displayName.toLowerCase().includes(searchLower)) ||
      (student.email && student.email.toLowerCase().includes(searchLower)) ||
      (student.id && student.id.toLowerCase().includes(searchLower)) ||
      (student.department && student.department.toLowerCase().includes(searchLower))
    );
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setIsAdding(false);
    if (!isEditing) {
      // Starting to edit - keep the current data
    } else {
      // Canceling edit - reset to original data
      setFormData(selectedStudent);
    }
  };

  const startAdding = () => {
    setSelectedStudent(null);
    setFormData(emptyStudentTemplate);
    setIsAdding(true);
    setIsEditing(false);
  };

  const resetForm = () => {
    if (selectedStudent) {
      setFormData(selectedStudent);
    } else {
      setFormData(emptyStudentTemplate);
    }
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setMessage({ type: '', text: '' });
      setLoading(true);
      
      if (isAdding) {
        // Add new student
        // const response = await axios.post('http://localhost:5000/api/students', formData);
        const response = await axios.post(`${API_BASE_URL}/api/students`, formData);
        
        if (response.data.success) {
          showMessage('success', 'Student added successfully!');
          await fetchStudents();
          resetForm();
        } else {
          throw new Error(response.data.message || 'Failed to add student');
        }
      } else if (isEditing && selectedStudent) {
        // Update existing student
        // const response = await axios.put(`http://localhost:5000/api/students/${selectedStudent.id}`, formData);
        const response = await axios.put(`${API_BASE_URL}/api/students/${selectedStudent.id}`, formData);
        
        if (response.data.success) {
          // Update both the selected student and the student in the list
          setSelectedStudent({...formData});
          
          // Update the student in the list
          const updatedStudents = students.map(student => 
            student.id === selectedStudent.id ? {...student, ...formData} : student
          );
          setStudents(updatedStudents);
          
          setIsEditing(false);
          showMessage('success', 'Student information updated successfully!');
        } else {
          throw new Error(response.data.message || 'Update failed');
        }
      }
    } catch (err) {
      console.error('Error saving student information:', err);
      showMessage('error', err.response?.data?.message || 'Failed to save student information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (studentId) => {
    if (!window.confirm('Are you sure you want to delete this student?')) {
      return;
    }
    
    try {
      setLoading(true);
      // const response = await axios.delete(`http://localhost:5000/api/students/${studentId}`);
      const response = await axios.delete(`${API_BASE_URL}/api/students/${studentId}`);
      
      if (response.data.success) {
        showMessage('success', 'Student deleted successfully!');
        await fetchStudents();
        
        if (selectedStudent && selectedStudent.id === studentId) {
          resetForm();
        }
      } else {
        throw new Error(response.data.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Error deleting student:', err);
      showMessage('error', err.response?.data?.message || 'Failed to delete student. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Split name into first and last name
  const splitName = (fullName) => {
    if (!fullName) return { firstName: '', lastName: '' };
    const parts = fullName.split(' ');
    const lastName = parts.length > 1 ? parts.pop() : '';
    const firstName = parts.join(' ');
    return { firstName, lastName };
  };

  // Extract department or domain from email
  const getDepartmentOrDomain = (student) => {
    if (student.department) return student.department;
    
    // Extract domain from email as fallback
    if (student.email && student.email.includes('@')) {
      const emailParts = student.email.split('@');
      if (emailParts[1] && emailParts[1].includes('.')) {
        const domainParts = emailParts[1].split('.');
        if (domainParts.length > 1) {
          return domainParts[0].toUpperCase();
        }
      }
    }
    return '';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-xl sm:text-2xl font-medium text-center text-emerald-600 mb-6">
        Student Management
      </h2>

      {message.text && (
        <div className={`mb-4 p-4 rounded-md flex items-center ${
          message.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 
          message.type === 'info' ? 'bg-blue-100 text-blue-700' :
          'bg-red-100 text-red-700'
        }`}>
          {message.type === 'success' ? 
            <Save className="w-5 h-5 mr-2" /> : 
            <AlertCircle className="w-5 h-5 mr-2" />
          }
          {message.text}
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          <h3 className="font-medium">Error Details:</h3>
          <pre className="mt-2 text-sm overflow-x-auto">{error}</pre>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Students List Panel */}
        <div className="bg-white rounded-md shadow">
          <div className="px-5 py-3 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-medium text-green-600">Students List</h3>
              <button
                onClick={startAdding}
                className="p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors"
                title="Add new student"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-3 relative">
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-2.5"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>
          
          {loading && students.length === 0 ? (
            <div className="p-4 text-center">
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-700 text-sm">Loading students...</p>
            </div>
          ) : error && students.length === 0 ? (
            <div className="py-4 text-center text-red-500">{error}</div>
          ) : filteredStudents.length === 0 ? (
            <div className="py-4 text-center text-gray-500 text-sm">
              {searchTerm ? 'No students found matching your search.' : 'No students found.'}
            </div>
          ) : (
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              <ul className="divide-y divide-gray-200">
                {filteredStudents.map(student => (
                  <li 
                    key={student.id}
                    onClick={() => handleStudentSelect(student)}
                    className={`p-3 hover:bg-gray-50 cursor-pointer transition-colors flex justify-between items-center ${
                      selectedStudent?.id === student.id ? 'bg-emerald-50' : ''
                    }`}
                  >
                    <div>
                      <div className="font-medium text-sm">
                        {student.displayName || 'Unnamed Student'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {getDepartmentOrDomain(student)}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        className="p-1 text-gray-500 hover:text-emerald-500 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStudentSelect(student);
                          setIsEditing(true);
                        }}
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(student.id);
                        }}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Student Details/Form Panel */}
        <div className="col-span-2">
          <div className="bg-white rounded-md shadow">
            <div className="px-5 py-3 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-medium text-green-600">
                  {isAdding ? "Add New Student" : 
                   isEditing ? "Edit Student" : 
                   selectedStudent ? "Student Details" : "Select a Student"}
                </h3>
                {selectedStudent && !isEditing && !isAdding && (
                  <button
                    onClick={handleEditToggle}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
                  >
                    Edit Information
                  </button>
                )}
              </div>
            </div>

            {!selectedStudent && !isAdding ? (
              <div className="p-8 text-center text-gray-500">
                <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-sm">Select a student to view details or click the "+" button to add a new student</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5">
                {/* Personal Information Section */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-4">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {!isAdding && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ID
                        </label>
                        <input
                          type="text"
                          value={selectedStudent?.id || selectedStudent?.uid || ''}
                          disabled
                          className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-sm"
                        />
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <select
                        defaultValue="Mr."
                        disabled={!isEditing && !isAdding}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 text-sm"
                      >
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Dr.">Dr.</option>
                        <option value="Prof.">Prof.</option>
                        <option value="Mx.">Mx.</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={splitName(formData?.displayName || '').firstName}
                        onChange={(e) => handleNameChange('firstName', e.target.value)}
                        disabled={!isEditing && !isAdding}
                        required
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={splitName(formData?.displayName || '').lastName}
                        onChange={(e) => handleNameChange('lastName', e.target.value)}
                        disabled={!isEditing && !isAdding}
                        required
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 text-sm"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email
                        </div>
                      </label>
                      <input
                        type="email"
                        value={formData?.email || ''}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing && !isAdding}
                        required
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 text-sm"
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
                        value={formData?.phone || ''}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing && !isAdding}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          Department
                        </div>
                      </label>
                      <input
                        type="text"
                        value={formData?.department || ''}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        disabled={!isEditing && !isAdding}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Display created and last login time if available */}
                {(formData?.lastLogin || formData?.createdAt) && !isAdding && (
                  <div className="text-sm text-gray-500 mb-6">
                    {formData.lastLogin && (
                      <div className="mb-1">
                        Last login: {new Date(formData.lastLogin._seconds * 1000).toLocaleString()}
                      </div>
                    )}
                    {formData.createdAt && (
                      <div>
                        Created at: {new Date(formData.createdAt._seconds * 1000).toLocaleString()}
                      </div>
                    )}
                  </div>
                )}
                
                {(isEditing || isAdding) && (
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm ${
                        loading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;