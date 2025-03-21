// import React, { useState } from 'react';
// import { User, Mail, Phone, GraduationCap, Calendar, Home, Book } from 'lucide-react';

// const UpdateStudentInfo = () => {
//   const [student, setStudent] = useState({
//     personalInfo: {
//       id: "ST001",
//       firstName: "Jane",
//       lastName: "Doe",
//       email: "jane.doe@university.edu",
//       phone: "+1234567890",
//       dateOfBirth: "2000-05-15",
//       address: "123 Campus Street"
//     },
//     academicInfo: {
//       batch: "2021",
//       degree: "BSc Computer Science",
//       semester: "4",
//       enrollmentStatus: "Active",
//       registeredCourses: ["Database Systems", "Web Development", "Data Structures"],
//       gpa: "3.8"
//     }
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState(student);
//   const [message, setMessage] = useState({ type: '', text: '' });

//   const handleInputChange = (section, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value
//       }
//     }));
//   };

//   const handleCoursesChange = (value) => {
//     setFormData(prev => ({
//       ...prev,
//       academicInfo: {
//         ...prev.academicInfo,
//         registeredCourses: value.split(',').map(course => course.trim())
//       }
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would typically make an API call to update the student info
//     setStudent(formData);
//     setIsEditing(false);
//     setMessage({ type: 'success', text: 'Student information updated successfully!' });
//     setTimeout(() => setMessage({ type: '', text: '' }), 3000);
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Update Student Information</h1>
//         <p className="text-gray-600">View and modify student details</p>
//       </div>

//       {message.text && (
//         <div className={`mb-4 p-4 rounded ${
//           message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//         }`}>
//           {message.text}
//         </div>
//       )}

//       <div className="bg-white rounded-lg shadow">
//         <div className="p-4 border-b flex justify-between items-center">
//           <div className="flex items-center gap-2">
//             <User className="w-5 h-5 text-gray-500" />
//             <h2 className="text-lg font-semibold">Student Profile</h2>
//           </div>
//           <button
//             onClick={() => setIsEditing(!isEditing)}
//             className={`px-4 py-2 rounded ${
//               isEditing 
//                 ? 'bg-gray-200 hover:bg-gray-300' 
//                 : 'bg-blue-500 text-white hover:bg-blue-600'
//             }`}
//           >
//             {isEditing ? 'Cancel' : 'Edit Information'}
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6">
//           {/* Personal Information Section */}
//           <div className="mb-8">
//             <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Student ID
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.personalInfo.id}
//                   disabled
//                   className="w-full p-2 border rounded bg-gray-100"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   UOW ID
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.personalInfo.id}
//                   disabled
//                   className="w-full p-2 border rounded bg-gray-100"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   <div className="flex items-center gap-2">
//                     <Calendar className="w-4 h-4" />
//                     Date of Birth
//                   </div>
//                 </label>
//                 <input
//                   type="date"
//                   value={formData.personalInfo.dateOfBirth}
//                   onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
//                   disabled={!isEditing}
//                   className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.personalInfo.firstName}
//                   onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
//                   disabled={!isEditing}
//                   className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.personalInfo.lastName}
//                   onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
//                   disabled={!isEditing}
//                   className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   <div className="flex items-center gap-2">
//                     <Mail className="w-4 h-4" />
//                     Email
//                   </div>
//                 </label>
//                 <input
//                   type="email"
//                   value={formData.personalInfo.email}
//                   onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
//                   disabled={!isEditing}
//                   className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   <div className="flex items-center gap-2">
//                     <Phone className="w-4 h-4" />
//                     Phone Number
//                   </div>
//                 </label>
//                 <input
//                   type="tel"
//                   value={formData.personalInfo.phone}
//                   onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
//                   disabled={!isEditing}
//                   className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   <div className="flex items-center gap-2">
//                     <Home className="w-4 h-4" />
//                     Address
//                   </div>
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.personalInfo.address}
//                   onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
//                   disabled={!isEditing}
//                   className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Academic Information Section */}
//           <div className="mb-8">
//             <h3 className="text-lg font-semibold mb-4">Academic Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   <div className="flex items-center gap-2">
//                     <GraduationCap className="w-4 h-4" />
//                     Degree Program 
//                   </div>
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.academicInfo.degree}
//                   onChange={(e) => handleInputChange('academicInfo', 'degree', e.target.value)}
//                   disabled={!isEditing}
//                   className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Batch
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.academicInfo.batch}
//                   onChange={(e) => handleInputChange('academicInfo', 'batch', e.target.value)}
//                   disabled={!isEditing}
//                   className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Current Semester
//                 </label>
//                 <input
//                   type="number"
//                   value={formData.academicInfo.semester}
//                   onChange={(e) => handleInputChange('academicInfo', 'semester', e.target.value)}
//                   disabled={!isEditing}
//                   className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   GPA
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.academicInfo.gpa}
//                   onChange={(e) => handleInputChange('academicInfo', 'gpa', e.target.value)}
//                   disabled={!isEditing}
//                   className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Enrollment Status
//                 </label>
//                 <select
//                   value={formData.academicInfo.enrollmentStatus}
//                   onChange={(e) => handleInputChange('academicInfo', 'enrollmentStatus', e.target.value)}
//                   disabled={!isEditing}
//                   className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                   <option value="On Leave">On Leave</option>
//                 </select>
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   <div className="flex items-center gap-2">
//                     <Book className="w-4 h-4" />
//                     Registered Courses (comma-separated)
//                   </div>
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.academicInfo.registeredCourses.join(', ')}
//                   onChange={(e) => handleCoursesChange(e.target.value)}
//                   disabled={!isEditing}
//                   className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                 />
//               </div>
//             </div>
//           </div>

//           {isEditing && (
//             <div className="flex justify-end gap-4">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setFormData(student);
//                   setIsEditing(false);
//                 }}
//                 className="px-4 py-2 border rounded hover:bg-gray-100"
//               >
//                 Reset
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               >
//                 Save Changes
//               </button>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateStudentInfo;

// import React, { useState, useEffect } from 'react';
// import { User, Mail, Phone, GraduationCap, Calendar, Home, Book } from 'lucide-react';
// import axios from 'axios'; // Make sure axios is installed

// const UpdateStudentInfo = ({ studentId }) => {
//   const [student, setStudent] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState({ type: '', text: '' });

//   // Fetch student data when component mounts
//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         setLoading(true);
//         // Use the student ID from props or from URL params
//         const id = studentId || new URLSearchParams(window.location.search).get('id');
        
//         if (!id) {
//           throw new Error('No student ID provided');
//         }
        
//         const response = await axios.get(`http://localhost:5000/api/students/${id}`);
        
//         // Transform Firebase data to fit your component structure
//         const studentData = {
//           personalInfo: {
//             id: response.data.uid || '',
//             firstName: response.data.displayName ? response.data.displayName.split(' ')[0] : '',
//             lastName: response.data.displayName ? response.data.displayName.split(' ')[1] || '' : '',
//             email: response.data.email || '',
//             phone: response.data.phone || '',
//             dateOfBirth: response.data.dateOfBirth || '',
//             address: response.data.address || ''
//           },
//           academicInfo: {
//             batch: response.data.batch || '',
//             degree: response.data.degree || '',
//             semester: response.data.semester || '',
//             enrollmentStatus: response.data.enrollmentStatus || 'Active',
//             registeredCourses: response.data.registeredCourses || [],
//             gpa: response.data.gpa || ''
//           }
//         };
        
//         setStudent(studentData);
//         setFormData(studentData);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching student data:', err);
//         setError('Failed to load student information. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchStudentData();
//   }, [studentId]);

//   const handleInputChange = (section, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value
//       }
//     }));
//   };

//   const handleCoursesChange = (value) => {
//     setFormData(prev => ({
//       ...prev,
//       academicInfo: {
//         ...prev.academicInfo,
//         registeredCourses: value.split(',').map(course => course.trim())
//       }
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       setMessage({ type: '', text: '' });
      
//       // Transform form data back to the structure expected by your API
//       const id = studentId || new URLSearchParams(window.location.search).get('id');
      
//       // Only include fields that exist in your Firebase document
//       const updateData = {
//         displayName: `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`.trim(),
//         email: formData.personalInfo.email,
//         phone: formData.personalInfo.phone || null,
//         address: formData.personalInfo.address || null,
//         dateOfBirth: formData.personalInfo.dateOfBirth || null,
//         // Include academic info if your API supports it
//         batch: formData.academicInfo.batch || null,
//         degree: formData.academicInfo.degree || null,
//         semester: formData.academicInfo.semester || null,
//         enrollmentStatus: formData.academicInfo.enrollmentStatus || null,
//         registeredCourses: formData.academicInfo.registeredCourses || null,
//         gpa: formData.academicInfo.gpa || null
//       };
      
//       // Send update request to your API
//       const response = await axios.put(`http://localhost:5000/api/students/${id}`, updateData);
      
//       if (response.data.success) {
//         setStudent(formData);
//         setIsEditing(false);
//         setMessage({ 
//           type: 'success', 
//           text: 'Student information updated successfully!' 
//         });
        
//         // Reset message after 3 seconds
//         setTimeout(() => setMessage({ type: '', text: '' }), 3000);
//       } else {
//         throw new Error(response.data.message || 'Update failed');
//       }
//     } catch (err) {
//       console.error('Error updating student information:', err);
//       setMessage({ 
//         type: 'error', 
//         text: err.response?.data?.message || 'Failed to update student information. Please try again.' 
//       });
//     }
//   };

//   if (loading) {
//     return <div className="p-6 text-center">Loading student information...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-center text-red-500">{error}</div>;
//   }

//   if (!student) {
//     return <div className="p-6 text-center">No student information found.</div>;
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Update Student Information</h1>
//         <p className="text-gray-600">View and modify student details</p>
//       </div>

//       {message.text && (
//         <div className={`mb-4 p-4 rounded ${
//           message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//         }`}>
//           {message.text}
//         </div>
//       )}

//       <div className="bg-white rounded-lg shadow">
//         <div className="p-4 border-b flex justify-between items-center">
//           <div className="flex items-center gap-2">
//             <User className="w-5 h-5 text-gray-500" />
//             <h2 className="text-lg font-semibold">Student Profile</h2>
//           </div>
//           <button
//             onClick={() => setIsEditing(!isEditing)}
//             className={`px-4 py-2 rounded ${
//               isEditing 
//                 ? 'bg-gray-200 hover:bg-gray-300' 
//                 : 'bg-blue-500 text-white hover:bg-blue-600'
//             }`}
//           >
//             {isEditing ? 'Cancel' : 'Edit Information'}
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6">
//           {/* Personal Information Section */}
//           <div className="mb-8">
//             <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Student ID
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.personalInfo.id}
//                   disabled
//                   className="w-full p-2 border rounded bg-gray-100"
//                 />
//               </div>
              
//               {/* Rest of your form fields stay the same */}
//               {/* ... */}
              
//             </div>
//           </div>

//           {isEditing && (
//             <div className="flex justify-end gap-4">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setFormData(student);
//                   setIsEditing(false);
//                 }}
//                 className="px-4 py-2 border rounded hover:bg-gray-100"
//               >
//                 Reset
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               >
//                 Save Changes
//               </button>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateStudentInfo;


import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Building, Plus, Edit, Trash2, Search, X, Save, AlertCircle } from 'lucide-react';
import axios from 'axios';

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
      const response = await axios.get('http://localhost:5000/api/students');
      
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
        const response = await axios.post('http://localhost:5000/api/students', formData);
        
        if (response.data.success) {
          showMessage('success', 'Student added successfully!');
          await fetchStudents();
          resetForm();
        } else {
          throw new Error(response.data.message || 'Failed to add student');
        }
      } else if (isEditing && selectedStudent) {
        // Update existing student
        const response = await axios.put(`http://localhost:5000/api/students/${selectedStudent.id}`, formData);
        
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
      const response = await axios.delete(`http://localhost:5000/api/students/${studentId}`);
      
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