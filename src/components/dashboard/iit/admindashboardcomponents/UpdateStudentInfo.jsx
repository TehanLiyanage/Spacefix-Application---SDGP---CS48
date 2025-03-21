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
import axios from 'axios';
import { Search, Mail, Phone, Building } from 'lucide-react';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch all students when component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/students');
        if (response.data.students) {
          setStudents(response.data.students);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to load students. Please try again later.');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Fetch student details when a student is selected
  useEffect(() => {
    if (!selectedStudent) return;
    
    const fetchStudentDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/students/${selectedStudent.id}`);
        const studentData = response.data;
        
        setSelectedStudent(studentData);
        setFormData(studentData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching student details:', err);
        setError('Failed to load student details. Please try again later.');
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [selectedStudent?.id]);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = students.filter(student => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (student.displayName && student.displayName.toLowerCase().includes(searchLower)) ||
      (student.email && student.email.toLowerCase().includes(searchLower)) ||
      (student.id && student.id.toLowerCase().includes(searchLower))
    );
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // Starting to edit - keep the current data
    } else {
      // Canceling edit - reset to original data
      setFormData(selectedStudent);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setMessage({ type: '', text: '' });
      
      // Prepare update data
      const updateData = {
        displayName: formData.displayName,
        email: formData.email,
        phone: formData.phone,
        department: formData.department
      };
      
      // Send update request
      const response = await axios.put(`http://localhost:5000/api/students/${selectedStudent.id}`, updateData);
      
      if (response.data.success) {
        setSelectedStudent(formData);
        setIsEditing(false);
        setMessage({ 
          type: 'success', 
          text: 'Student information updated successfully!' 
        });
        
        // Reset message after 3 seconds
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        throw new Error(response.data.message || 'Update failed');
      }
    } catch (err) {
      console.error('Error updating student information:', err);
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.message || 'Failed to update student information. Please try again.' 
      });
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

  // Extract department shortcode
  const getDepartmentShortcode = (student) => {
    if (student.department) return student.department;
    // If no department, try to extract from email
    if (student.email && student.email.includes('@')) {
      // This is just a placeholder logic - adjust as needed
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
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-semibold text-center text-green-600 mb-6">Student Management</h1>
      
      <div className="flex gap-4 max-w-7xl mx-auto">
        {/* Left panel - Student list */}
        <div className="w-1/3 bg-white rounded-md shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-green-600">Students List</h2>
            <button className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
              <span>+</span>
            </button>
          </div>
          
          {/* Search input */}
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border rounded-md border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          
          {/* Student list */}
          <div className="space-y-1">
            {loading && students.length === 0 ? (
              <div className="py-4 text-center text-gray-500">Loading students...</div>
            ) : error ? (
              <div className="py-4 text-center text-red-500">{error}</div>
            ) : filteredStudents.length === 0 ? (
              <div className="py-4 text-center text-gray-500">
                {searchQuery ? 'No students found matching your search.' : 'No students found.'}
              </div>
            ) : (
              filteredStudents.map(student => {
                const departmentCode = getDepartmentShortcode(student);
                return (
                  <div 
                    key={student.id}
                    onClick={() => handleStudentSelect(student)}
                    className={`p-3 border-b flex justify-between items-center hover:bg-gray-50 cursor-pointer ${
                      selectedStudent?.id === student.id ? 'bg-green-50' : ''
                    }`}
                  >
                    <div>
                      <div className="font-medium">{student.displayName || 'Unnamed Student'}</div>
                      <div className="text-sm text-gray-500">{departmentCode}</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        
        {/* Right panel - Student details */}
        <div className="w-2/3 bg-white rounded-md shadow-sm p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-green-600">Student Details</h2>
            {selectedStudent && (
              <button
                onClick={handleEditToggle}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                {isEditing ? 'Cancel' : 'Edit Information'}
              </button>
            )}
          </div>
          
          {!selectedStudent ? (
            <div className="py-8 text-center text-gray-500">
              Select a student from the list to view details
            </div>
          ) : loading ? (
            <div className="py-8 text-center text-gray-500">
              Loading student details...
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {message.text && (
                <div className={`mb-4 p-3 rounded-md ${
                  message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {message.text}
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-md font-medium mb-4">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID
                    </label>
                    <input
                      type="text"
                      value={selectedStudent.id || selectedStudent.uid || ''}
                      disabled
                      className="w-full p-2 border rounded-md bg-gray-50"
                    />
                  </div>
                  
                  {/* Use select for title if needed */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <select
                      disabled={!isEditing}
                      className={`w-full p-2 border rounded-md ${!isEditing ? 'bg-gray-50' : ''}`}
                    >
                      <option>Mr.</option>
                      <option>Ms.</option>
                      <option>Mrs.</option>
                      <option>Dr.</option>
                      <option>Prof.</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={splitName(formData.displayName).firstName}
                      onChange={(e) => handleInputChange('displayName', 
                        `${e.target.value} ${splitName(formData.displayName).lastName}`)}
                      disabled={!isEditing}
                      className={`w-full p-2 border rounded-md ${!isEditing ? 'bg-gray-50' : ''}`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={splitName(formData.displayName).lastName}
                      onChange={(e) => handleInputChange('displayName', 
                        `${splitName(formData.displayName).firstName} ${e.target.value}`)}
                      disabled={!isEditing}
                      className={`w-full p-2 border rounded-md ${!isEditing ? 'bg-gray-50' : ''}`}
                    />
                  </div>
                  
                  <div className="flex">
                    <div className="flex-grow">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="email"
                          value={formData.email || ''}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={!isEditing}
                          className={`w-full pl-10 p-2 border rounded-md ${!isEditing ? 'bg-gray-50' : ''}`}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-grow">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="text"
                          value={formData.phone || ''}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!isEditing}
                          className={`w-full pl-10 p-2 border rounded-md ${!isEditing ? 'bg-gray-50' : ''}`}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        value={formData.department || ''}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        disabled={!isEditing}
                        className={`w-full pl-10 p-2 border rounded-md ${!isEditing ? 'bg-gray-50' : ''}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {isEditing && (
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;