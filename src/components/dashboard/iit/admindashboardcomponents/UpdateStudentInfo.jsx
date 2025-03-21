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
import { User, Mail, Phone, GraduationCap, Calendar, Home, Book } from 'lucide-react';
import axios from 'axios';

const UpdateStudentInfo = ({ studentId }) => {
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [allStudents, setAllStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(studentId || new URLSearchParams(window.location.search).get('id') || '');

  // Fetch all students first
  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students');
        if (response.data.students) {
          setAllStudents(response.data.students);
        }
      } catch (err) {
        console.error('Error fetching students list:', err);
      }
    };
    
    fetchAllStudents();
  }, []);
  
  // Fetch specific student data when ID is available
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Reset student data if ID changes
        setStudent(null);
        setFormData(null);
        
        if (!selectedStudentId) {
          // No student ID selected yet, but we've loaded the students list
          if (allStudents.length > 0) {
            setLoading(false);
          }
          return;
        }
        
        setLoading(true);
        console.log("Fetching student with ID:", selectedStudentId);
        const response = await axios.get(`http://localhost:5000/api/students/${selectedStudentId}`);
        const studentData = response.data;
        
        // Log the raw data from the server for debugging
        console.log('Raw student data from server:', studentData);
        
        // Transform the data to fit our component structure
        const transformedData = {
          personalInfo: {
            id: studentData.id || studentData.uid || '',
            firstName: studentData.displayName ? studentData.displayName.split(' ')[0] : '',
            lastName: studentData.displayName ? studentData.displayName.split(' ')[1] || '' : '',
            email: studentData.email || '',
            phone: studentData.phone || '',
            dateOfBirth: studentData.dateOfBirth || '',
            address: studentData.address || '',
            photoURL: studentData.photoURL || ''
          },
          academicInfo: {
            batch: studentData.batch || '',
            degree: studentData.degree || '',
            semester: studentData.semester || '',
            enrollmentStatus: studentData.enrollmentStatus || 'Active',
            registeredCourses: studentData.registeredCourses || [],
            gpa: studentData.gpa || ''
          }
        };
        
        console.log("Successfully transformed student data:", transformedData);
        setStudent(transformedData);
        setFormData(transformedData);
        console.log("Student data set to state, should trigger re-render");
        setLoading(false);
      } catch (err) {
        console.error('Error fetching student data:', err);
        if (err.response) {
          console.error('Server response:', err.response.data);
        }
        setError('Failed to load student information. Please try again later.');
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setMessage({ type: '', text: '' });
      
      // Use the selected student ID
      if (!selectedStudentId) {
        setMessage({ 
          type: 'error', 
          text: 'No student selected for update.'
        });
        return;
      }
      
      // Transform form data back to the structure expected by your API
      const updateData = {
        displayName: `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`.trim(),
        email: formData.personalInfo.email,
        phone: formData.personalInfo.phone,
        address: formData.personalInfo.address,
        dateOfBirth: formData.personalInfo.dateOfBirth,
        // Include photoURL if it exists in your data
        ...(formData.personalInfo.photoURL && { photoURL: formData.personalInfo.photoURL }),
        // Academic information
        batch: formData.academicInfo.batch,
        degree: formData.academicInfo.degree,
        semester: formData.academicInfo.semester,
        enrollmentStatus: formData.academicInfo.enrollmentStatus,
        registeredCourses: formData.academicInfo.registeredCourses,
        gpa: formData.academicInfo.gpa
      };
      
      console.log('Sending update data:', updateData);
      
      // Send update request to your API
      const response = await axios.put(`http://localhost:5000/api/students/${selectedStudentId}`, updateData);
      
      console.log('Server response:', response.data);
      
      if (response.data.success) {
        setStudent(formData);
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
      if (err.response) {
        console.error('Server response:', err.response.data);
      }
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.message || 'Failed to update student information. Please try again.' 
      });
    }
  };

  // Handler for selecting a student
  const handleStudentSelect = (e) => {
    const newId = e.target.value;
    console.log("Selected student ID:", newId);
    setSelectedStudentId(newId);
    if (newId) {
      setLoading(true);
    }
  };
  
  // Show loading indicator when fetching student data
  if (loading && selectedStudentId) {
    return (
      <div className="p-6 text-center">
        <div className="mb-4">Loading student information for ID: {selectedStudentId}...</div>
        <div className="text-sm text-gray-500">If this takes too long, please check your network connection and server status.</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => setSelectedStudentId('')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Return to Student Selection
        </button>
      </div>
    );
  }
  
  // Show student selector if no student is selected or loaded
  if (!student) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Student Information</h1>
          <p className="text-gray-600">Select a student to view and modify their details</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select a Student
          </label>
          <select 
            className="w-full p-2 border rounded mb-4"
            value={selectedStudentId}
            onChange={handleStudentSelect}
          >
            <option value="">-- Select a student --</option>
            {allStudents.map(student => (
              <option key={student.id} value={student.id}>
                {student.displayName || student.email || student.id}
              </option>
            ))}
          </select>
          
          {allStudents.length === 0 && !loading && (
            <p className="text-amber-600">Loading student list or no students found.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Student Information</h1>
        <p className="text-gray-600">View and modify student details</p>
        {selectedStudentId && (
          <button 
            onClick={() => setSelectedStudentId('')}
            className="mt-2 text-blue-500 hover:underline text-sm flex items-center"
          >
            ← Return to student selection
          </button>
        )}
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
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.personalInfo.firstName}
                    onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full pl-10 p-2 border rounded ${!isEditing && 'bg-gray-100'}`}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.personalInfo.lastName}
                    onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full pl-10 p-2 border rounded ${!isEditing && 'bg-gray-100'}`}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full pl-10 p-2 border rounded ${!isEditing && 'bg-gray-100'}`}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.personalInfo.phone}
                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full pl-10 p-2 border rounded ${!isEditing && 'bg-gray-100'}`}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    value={formData.personalInfo.dateOfBirth}
                    onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full pl-10 p-2 border rounded ${!isEditing && 'bg-gray-100'}`}
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.personalInfo.address}
                    onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full pl-10 p-2 border rounded ${!isEditing && 'bg-gray-100'}`}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Academic Information Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Academic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Batch
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.academicInfo.batch}
                    onChange={(e) => handleInputChange('academicInfo', 'batch', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full pl-10 p-2 border rounded ${!isEditing && 'bg-gray-100'}`}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Degree
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.academicInfo.degree}
                    onChange={(e) => handleInputChange('academicInfo', 'degree', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full pl-10 p-2 border rounded ${!isEditing && 'bg-gray-100'}`}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Semester
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.academicInfo.semester}
                    onChange={(e) => handleInputChange('academicInfo', 'semester', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full pl-10 p-2 border rounded ${!isEditing && 'bg-gray-100'}`}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GPA
                </label>
                <div className="relative">
                  <Book className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.academicInfo.gpa}
                    onChange={(e) => handleInputChange('academicInfo', 'gpa', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full pl-10 p-2 border rounded ${!isEditing && 'bg-gray-100'}`}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enrollment Status
                </label>
                <select
                  value={formData.academicInfo.enrollmentStatus}
                  onChange={(e) => handleInputChange('academicInfo', 'enrollmentStatus', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full p-2 border rounded ${!isEditing && 'bg-gray-100'}`}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Graduated">Graduated</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registered Courses (comma separated)
                </label>
                <textarea
                  value={formData.academicInfo.registeredCourses.join(', ')}
                  onChange={(e) => handleCoursesChange(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full p-2 border rounded h-24 ${!isEditing && 'bg-gray-100'}`}
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