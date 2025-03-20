// import React, { useState, useEffect } from 'react';
// import { User, Mail, Phone, Building, Plus, Edit, Trash2, Search, X, Save, AlertCircle } from 'lucide-react';
// import { 
//   collection, 
//   doc, 
//   getDocs, 
//   addDoc, 
//   updateDoc, 
//   deleteDoc,
//   setDoc,
// } from 'firebase/firestore';
// import { db } from '../../../../firebase/firebaseConfig.js';

// const LecturerManagement = () => {
//   const [lecturers, setLecturers] = useState([]);
//   const [selectedLecturer, setSelectedLecturer] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isAdding, setIsAdding] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [message, setMessage] = useState({ type: '', text: '' });
//   const [error, setError] = useState(null);
  
//   const emptyLecturerTemplate = {
//     personalInfo: {
//       firstName: "",
//       lastName: "",
//       title: "",
//       email: "",
//       phone: "",
//       department: ""
//     }
//   };
  
//   const [formData, setFormData] = useState(emptyLecturerTemplate);

//   // Fetch lecturers on component mount
//   useEffect(() => {
//     fetchLecturers();
//   }, []);

//   const fetchLecturers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       console.log("Fetching lecturers...");
      
//       // Try-catch for debugging the path
//       try {
//         const lecturersRef = collection(db, 'IIT', 'Users', 'lecturers');
//         console.log("Collection reference created");
        
//         const querySnapshot = await getDocs(lecturersRef);
//         console.log("Query snapshot obtained", querySnapshot.size);
        
//         const lecturersList = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
        
//         console.log("Lecturers list:", lecturersList);
//         setLecturers(lecturersList);
//       } catch (pathError) {
//         console.error("Path error:", pathError);
//         // Try an alternative path
//         const directLecturersRef = collection(db, 'lecturers');
//         console.log("Trying direct 'lecturers' collection");
        
//         const directSnapshot = await getDocs(directLecturersRef);
//         const directLecturersList = directSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
        
//         setLecturers(directLecturersList);
//         if (directLecturersList.length === 0) {
//           console.log("No lecturers found in direct path either");
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching lecturers:", error);
//       setError(error.message);
//       showMessage('error', 'Failed to load lecturers data: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showMessage = (type, text) => {
//     setMessage({ type, text });
//     setTimeout(() => setMessage({ type: '', text: '' }), 5000);
//   };

//   const handleInputChange = (section, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value
//       }
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
    
//     try {
//       let lecturersRef;
//       let lecturerDocRef;
      
//       try {
//         // Try the nested path first
//         lecturersRef = collection(db, 'IIT', 'Users', 'lecturers');
//       } catch (pathError) {
//         // If that fails, try the direct path
//         console.log("Nested path failed, trying direct path");
//         lecturersRef = collection(db, 'lecturers');
//       }
      
//       if (isAdding) {
//         // Add new lecturer
//         const docRef = await addDoc(lecturersRef, formData);
//         console.log("Document added with ID:", docRef.id);
//         showMessage('success', 'Lecturer added successfully!');
//       } else if (isEditing && selectedLecturer) {
//         // Update existing lecturer
//         try {
//           lecturerDocRef = doc(db, 'IIT', 'Users', 'lecturers', selectedLecturer.id);
//           await updateDoc(lecturerDocRef, formData);
//         } catch (nestedPathError) {
//           lecturerDocRef = doc(db, 'lecturers', selectedLecturer.id);
//           await updateDoc(lecturerDocRef, formData);
//         }
//         console.log("Document updated");
//         showMessage('success', 'Lecturer updated successfully!');
//       }
      
//       // Refresh lecturer list
//       await fetchLecturers();
//       resetForm();
//     } catch (error) {
//       console.error("Error saving lecturer:", error);
//       setError(error.message);
//       showMessage('error', 'Failed to save lecturer information: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (lecturerId) => {
//     if (!window.confirm('Are you sure you want to delete this lecturer?')) {
//       return;
//     }
    
//     setLoading(true);
//     setError(null);
//     try {
//       let lecturerDocRef;
      
//       try {
//         lecturerDocRef = doc(db, 'IIT', 'Users', 'lecturers', lecturerId);
//         await deleteDoc(lecturerDocRef);
//       } catch (nestedPathError) {
//         lecturerDocRef = doc(db, 'lecturers', lecturerId);
//         await deleteDoc(lecturerDocRef);
//       }
      
//       showMessage('success', 'Lecturer deleted successfully!');
//       await fetchLecturers();
      
//       if (selectedLecturer && selectedLecturer.id === lecturerId) {
//         resetForm();
//       }
//     } catch (error) {
//       console.error("Error deleting lecturer:", error);
//       setError(error.message);
//       showMessage('error', 'Failed to delete lecturer: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const selectLecturer = (lecturer) => {
//     setSelectedLecturer(lecturer);
//     setFormData(lecturer);
//     setIsEditing(false);
//     setIsAdding(false);
//   };

//   const startEditing = () => {
//     setIsEditing(true);
//     setIsAdding(false);
//   };

//   const startAdding = () => {
//     setSelectedLecturer(null);
//     setFormData(emptyLecturerTemplate);
//     setIsAdding(true);
//     setIsEditing(false);
//   };

//   const resetForm = () => {
//     if (selectedLecturer) {
//       setFormData(selectedLecturer);
//     } else {
//       setFormData(emptyLecturerTemplate);
//     }
//     setIsEditing(false);
//     setIsAdding(false);
//   };

//   const filteredLecturers = lecturers.filter(lecturer => {
//     if (!lecturer.personalInfo) {
//       console.warn("Lecturer missing personalInfo:", lecturer);
//       return false;
//     }
    
//     const searchString = searchTerm.toLowerCase();
//     const firstName = lecturer.personalInfo.firstName || '';
//     const lastName = lecturer.personalInfo.lastName || '';
//     const fullName = `${firstName} ${lastName}`.toLowerCase();
//     const email = lecturer.personalInfo.email || '';
//     const department = lecturer.personalInfo.department || '';
    
//     return (
//       fullName.includes(searchString) ||
//       email.toLowerCase().includes(searchString) ||
//       department.toLowerCase().includes(searchString)
//     );
//   });

//   // Create initial empty document if the collection doesn't exist
//   const initializeCollection = async () => {
//     if (lecturers.length === 0 && !loading && !error) {
//       try {
//         showMessage('info', 'Initializing lecturers collection...');
        
//         // Try the nested path
//         try {
//           // Create Users document if it doesn't exist
//           await setDoc(doc(db, 'IIT', 'Users'), {});
          
//           // Add a sample lecturer
//           const lecturersRef = collection(db, 'IIT', 'Users', 'lecturers');
//           await addDoc(lecturersRef, {
//             personalInfo: {
//               firstName: "Sample",
//               lastName: "Lecturer",
//               title: "Dr.",
//               email: "sample.lecturer@example.com",
//               phone: "+1234567890",
//               department: "Computer Science"
//             }
//           });
//         } catch (nestedPathError) {
//           // If nested path fails, try direct path
//           const lecturersRef = collection(db, 'lecturers');
//           await addDoc(lecturersRef, {
//             personalInfo: {
//               firstName: "Sample",
//               lastName: "Lecturer",
//               title: "Dr.",
//               email: "sample.lecturer@example.com",
//               phone: "+1234567890",
//               department: "Computer Science"
//             }
//           });
//         }
        
//         fetchLecturers();
//       } catch (error) {
//         console.error("Error initializing collection:", error);
//         showMessage('error', 'Failed to initialize collection: ' + error.message);
//       }
//     }
//   };

//   // Effect to initialize collection if needed
//   useEffect(() => {
//     if (lecturers.length === 0 && !loading && !error) {
//       // Wait a bit before initializing to ensure we've truly tried to load
//       const timer = setTimeout(() => {
//         initializeCollection();
//       }, 2000);
      
//       return () => clearTimeout(timer);
//     }
//   }, [lecturers, loading, error]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Lecturer Management</h1>
//           <p className="text-gray-600">Manage lecturer information in the system</p>
//         </div>

//         {message.text && (
//           <div className={`mb-6 p-4 rounded flex items-center ${
//             message.type === 'success' ? 'bg-green-100 text-green-700' : 
//             message.type === 'info' ? 'bg-blue-100 text-blue-700' :
//             'bg-red-100 text-red-700'
//           }`}>
//             {message.type === 'success' ? 
//               <Save className="w-5 h-5 mr-2" /> : 
//               <AlertCircle className="w-5 h-5 mr-2" />
//             }
//             {message.text}
//           </div>
//         )}

//         {error && (
//           <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
//             <h3 className="font-bold">Error Details:</h3>
//             <pre className="mt-2 text-sm overflow-x-auto">{error}</pre>
//           </div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Lecturers List Panel */}
//           <div className="bg-white rounded-lg shadow overflow-hidden">
//             <div className="p-4 border-b bg-gray-50">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-lg font-semibold">Lecturers List</h2>
//                 <button
//                   onClick={startAdding}
//                   className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
//                   title="Add new lecturer"
//                 >
//                   <Plus className="w-5 h-5" />
//                 </button>
//               </div>
//               <div className="mt-3 relative">
//                 <input
//                   type="text"
//                   placeholder="Search lecturers..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
//                 {searchTerm && (
//                   <button 
//                     onClick={() => setSearchTerm('')}
//                     className="absolute right-3 top-2.5"
//                   >
//                     <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
//                   </button>
//                 )}
//               </div>
//             </div>
            
//             {loading ? (
//               <div className="p-4 text-center text-gray-500">Loading lecturers...</div>
//             ) : (
//               <div className="overflow-y-auto max-h-96">
//                 {filteredLecturers.length === 0 ? (
//                   <div className="p-4 text-center text-gray-500">
//                     {searchTerm ? "No lecturers match your search" : "No lecturers found"}
//                     {!error && !searchTerm && (
//                       <div className="mt-2">
//                         <button 
//                           onClick={initializeCollection}
//                           className="text-blue-500 hover:underline"
//                         >
//                           Create sample lecturer
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <ul className="divide-y divide-gray-200">
//                     {filteredLecturers.map((lecturer) => (
//                       <li 
//                         key={lecturer.id}
//                         className={`p-3 hover:bg-gray-50 cursor-pointer transition duration-150 flex justify-between items-center ${
//                           selectedLecturer && selectedLecturer.id === lecturer.id ? 'bg-blue-50' : ''
//                         }`}
//                         onClick={() => selectLecturer(lecturer)}
//                       >
//                         <div>
//                           <div className="font-medium">
//                             {lecturer.personalInfo?.title || ''} {lecturer.personalInfo?.firstName || ''} {lecturer.personalInfo?.lastName || ''}
//                           </div>
//                           <div className="text-sm text-gray-500">{lecturer.personalInfo?.department || ''}</div>
//                         </div>
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               selectLecturer(lecturer);
//                               startEditing();
//                             }}
//                             className="p-1 text-gray-500 hover:text-blue-500"
//                             title="Edit"
//                           >
//                             <Edit className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDelete(lecturer.id);
//                             }}
//                             className="p-1 text-gray-500 hover:text-red-500"
//                             title="Delete"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Lecturer Details/Form Panel */}
//           <div className="col-span-2">
//             <div className="bg-white rounded-lg shadow">
//               <div className="p-4 border-b flex justify-between items-center">
//                 <div className="flex items-center gap-2">
//                   <User className="w-5 h-5 text-gray-500" />
//                   <h2 className="text-lg font-semibold">
//                     {isAdding ? "Add New Lecturer" : 
//                      isEditing ? "Edit Lecturer" : 
//                      selectedLecturer ? "Lecturer Details" : "Select a Lecturer"}
//                   </h2>
//                 </div>
//                 {selectedLecturer && !isEditing && !isAdding && (
//                   <button
//                     onClick={startEditing}
//                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                   >
//                     Edit Information
//                   </button>
//                 )}
//               </div>

//               {!selectedLecturer && !isAdding ? (
//                 <div className="p-8 text-center text-gray-500">
//                   <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//                   <p>Select a lecturer to view details or click the "+" button to add a new lecturer</p>
//                 </div>
//               ) : (
//                 <form onSubmit={handleSubmit} className="p-6">
//                   {/* Personal Information Section */}
//                   <div className="mb-8">
//                     <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Title
//                         </label>
//                         <select
//                           value={formData.personalInfo.title || ''}
//                           onChange={(e) => handleInputChange('personalInfo', 'title', e.target.value)}
//                           disabled={!isEditing && !isAdding}
//                           required
//                           className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                         >
//                           <option value="">Select a title</option>
//                           <option value="Dr.">Dr.</option>
//                           <option value="Prof.">Prof.</option>
//                           <option value="Mr.">Mr.</option>
//                           <option value="Mrs.">Mrs.</option>
//                           <option value="Ms.">Ms.</option>
//                           <option value="Mx.">Mx.</option>
//                         </select>
//                       </div>
//                       {!isAdding && (
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             ID
//                           </label>
//                           <input
//                             type="text"
//                             value={selectedLecturer?.id || ""}
//                             disabled
//                             className="w-full p-2 border rounded bg-gray-100"
//                           />
//                         </div>
//                       )}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           First Name
//                         </label>
//                         <input
//                           type="text"
//                           value={formData.personalInfo.firstName || ''}
//                           onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
//                           disabled={!isEditing && !isAdding}
//                           required
//                           className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Last Name
//                         </label>
//                         <input
//                           type="text"
//                           value={formData.personalInfo.lastName || ''}
//                           onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
//                           disabled={!isEditing && !isAdding}
//                           required
//                           className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           <div className="flex items-center gap-2">
//                             <Mail className="w-4 h-4" />
//                             Email
//                           </div>
//                         </label>
//                         <input
//                           type="email"
//                           value={formData.personalInfo.email || ''}
//                           onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
//                           disabled={!isEditing && !isAdding}
//                           required
//                           className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           <div className="flex items-center gap-2">
//                             <Phone className="w-4 h-4" />
//                             Phone Number
//                           </div>
//                         </label>
//                         <input
//                           type="tel"
//                           value={formData.personalInfo.phone || ''}
//                           onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
//                           disabled={!isEditing && !isAdding}
//                           required
//                           className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                         />
//                       </div>
//                       <div className="md:col-span-2">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           <div className="flex items-center gap-2">
//                             <Building className="w-4 h-4" />
//                             Department
//                           </div>
//                         </label>
//                         <input
//                           type="text"
//                           value={formData.personalInfo.department || ''}
//                           onChange={(e) => handleInputChange('personalInfo', 'department', e.target.value)}
//                           disabled={!isEditing && !isAdding}
//                           required
//                           className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {(isEditing || isAdding) && (
//                     <div className="flex justify-end gap-4">
//                       <button
//                         type="button"
//                         onClick={resetForm}
//                         className="px-4 py-2 border rounded hover:bg-gray-100 transition"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         disabled={loading}
//                         className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${
//                           loading ? 'opacity-70 cursor-not-allowed' : ''
//                         }`}
//                       >
//                         {loading ? 'Saving...' : 'Save Changes'}
//                       </button>
//                     </div>
//                   )}
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LecturerManagement;

import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Building, Plus, Edit, Trash2, Search, X, Save, AlertCircle } from 'lucide-react';
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig.js';

const LecturerManagement = () => {
  const [lecturers, setLecturers] = useState([]);
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [error, setError] = useState(null);
  
  const emptyLecturerTemplate = {
    personalInfo: {
      firstName: "",
      lastName: "",
      title: "",
      email: "",
      phone: "",
      department: ""
    }
  };
  
  const [formData, setFormData] = useState(emptyLecturerTemplate);

  // Fetch lecturers on component mount
  useEffect(() => {
    fetchLecturers();
  }, []);

  const fetchLecturers = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching lecturers...");
      
      // Try-catch for debugging the path
      try {
        const lecturersRef = collection(db, 'IIT', 'Users', 'lecturers');
        console.log("Collection reference created");
        
        const querySnapshot = await getDocs(lecturersRef);
        console.log("Query snapshot obtained", querySnapshot.size);
        
        const lecturersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        console.log("Lecturers list:", lecturersList);
        setLecturers(lecturersList);
      } catch (pathError) {
        console.error("Path error:", pathError);
        // Try an alternative path
        const directLecturersRef = collection(db, 'lecturers');
        console.log("Trying direct 'lecturers' collection");
        
        const directSnapshot = await getDocs(directLecturersRef);
        const directLecturersList = directSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setLecturers(directLecturersList);
        if (directLecturersList.length === 0) {
          console.log("No lecturers found in direct path either");
        }
      }
    } catch (error) {
      console.error("Error fetching lecturers:", error);
      setError(error.message);
      showMessage('error', 'Failed to load lecturers data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      let lecturersRef;
      let lecturerDocRef;
      
      try {
        // Try the nested path first
        lecturersRef = collection(db, 'IIT', 'Users', 'lecturers');
      } catch (pathError) {
        // If that fails, try the direct path
        console.log("Nested path failed, trying direct path");
        lecturersRef = collection(db, 'lecturers');
      }
      
      if (isAdding) {
        // Add new lecturer
        const docRef = await addDoc(lecturersRef, formData);
        console.log("Document added with ID:", docRef.id);
        showMessage('success', 'Lecturer added successfully!');
      } else if (isEditing && selectedLecturer) {
        // Update existing lecturer
        try {
          lecturerDocRef = doc(db, 'IIT', 'Users', 'lecturers', selectedLecturer.id);
          await updateDoc(lecturerDocRef, formData);
        } catch (nestedPathError) {
          lecturerDocRef = doc(db, 'lecturers', selectedLecturer.id);
          await updateDoc(lecturerDocRef, formData);
        }
        console.log("Document updated");
        showMessage('success', 'Lecturer updated successfully!');
      }
      
      // Refresh lecturer list
      await fetchLecturers();
      resetForm();
    } catch (error) {
      console.error("Error saving lecturer:", error);
      setError(error.message);
      showMessage('error', 'Failed to save lecturer information: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (lecturerId) => {
    if (!window.confirm('Are you sure you want to delete this lecturer?')) {
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      let lecturerDocRef;
      
      try {
        lecturerDocRef = doc(db, 'IIT', 'Users', 'lecturers', lecturerId);
        await deleteDoc(lecturerDocRef);
      } catch (nestedPathError) {
        lecturerDocRef = doc(db, 'lecturers', lecturerId);
        await deleteDoc(lecturerDocRef);
      }
      
      showMessage('success', 'Lecturer deleted successfully!');
      await fetchLecturers();
      
      if (selectedLecturer && selectedLecturer.id === lecturerId) {
        resetForm();
      }
    } catch (error) {
      console.error("Error deleting lecturer:", error);
      setError(error.message);
      showMessage('error', 'Failed to delete lecturer: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const selectLecturer = (lecturer) => {
    setSelectedLecturer(lecturer);
    setFormData(lecturer);
    setIsEditing(false);
    setIsAdding(false);
  };

  const startEditing = () => {
    setIsEditing(true);
    setIsAdding(false);
  };

  const startAdding = () => {
    setSelectedLecturer(null);
    setFormData(emptyLecturerTemplate);
    setIsAdding(true);
    setIsEditing(false);
  };

  const resetForm = () => {
    if (selectedLecturer) {
      setFormData(selectedLecturer);
    } else {
      setFormData(emptyLecturerTemplate);
    }
    setIsEditing(false);
    setIsAdding(false);
  };

  const filteredLecturers = lecturers.filter(lecturer => {
    if (!lecturer.personalInfo) {
      console.warn("Lecturer missing personalInfo:", lecturer);
      return false;
    }
    
    const searchString = searchTerm.toLowerCase();
    const firstName = lecturer.personalInfo.firstName || '';
    const lastName = lecturer.personalInfo.lastName || '';
    const fullName = `${firstName} ${lastName}`.toLowerCase();
    const email = lecturer.personalInfo.email || '';
    const department = lecturer.personalInfo.department || '';
    
    return (
      fullName.includes(searchString) ||
      email.toLowerCase().includes(searchString) ||
      department.toLowerCase().includes(searchString)
    );
  });

  // Create initial empty document if the collection doesn't exist
  const initializeCollection = async () => {
    if (lecturers.length === 0 && !loading && !error) {
      try {
        showMessage('info', 'Initializing lecturers collection...');
        
        // Try the nested path
        try {
          // Create Users document if it doesn't exist
          await setDoc(doc(db, 'IIT', 'Users'), {});
          
          // Add a sample lecturer
          const lecturersRef = collection(db, 'IIT', 'Users', 'lecturers');
          await addDoc(lecturersRef, {
            personalInfo: {
              firstName: "Sample",
              lastName: "Lecturer",
              title: "Dr.",
              email: "sample.lecturer@example.com",
              phone: "+1234567890",
              department: "Computer Science"
            }
          });
        } catch (nestedPathError) {
          // If nested path fails, try direct path
          const lecturersRef = collection(db, 'lecturers');
          await addDoc(lecturersRef, {
            personalInfo: {
              firstName: "Sample",
              lastName: "Lecturer",
              title: "Dr.",
              email: "sample.lecturer@example.com",
              phone: "+1234567890",
              department: "Computer Science"
            }
          });
        }
        
        fetchLecturers();
      } catch (error) {
        console.error("Error initializing collection:", error);
        showMessage('error', 'Failed to initialize collection: ' + error.message);
      }
    }
  };

  // Effect to initialize collection if needed
  useEffect(() => {
    if (lecturers.length === 0 && !loading && !error) {
      // Wait a bit before initializing to ensure we've truly tried to load
      const timer = setTimeout(() => {
        initializeCollection();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [lecturers, loading, error]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-xl sm:text-2xl font-medium text-center text-emerald-600 mb-6">
        Lecturer Management
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
        {/* Lecturers List Panel */}
        <div className="bg-white rounded-md shadow">
          <div className="px-5 py-3 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-medium text-emerald-600">Lecturers List</h3>
              <button
                onClick={startAdding}
                className="p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors"
                title="Add new lecturer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-3 relative">
              <input
                type="text"
                placeholder="Search lecturers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
          
          {loading ? (
            <div className="p-4 text-center">
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-700 text-sm">Loading lecturers...</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {filteredLecturers.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                  {searchTerm ? "No lecturers match your search" : "No lecturers found"}
                  {!error && !searchTerm && (
                    <div className="mt-2">
                      <button 
                        onClick={initializeCollection}
                        className="text-emerald-500 hover:underline text-sm"
                      >
                        Create sample lecturer
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {filteredLecturers.map((lecturer) => (
                    <li 
                      key={lecturer.id}
                      className={`p-3 hover:bg-gray-50 cursor-pointer transition-colors flex justify-between items-center ${
                        selectedLecturer && selectedLecturer.id === lecturer.id ? 'bg-emerald-50' : ''
                      }`}
                      onClick={() => selectLecturer(lecturer)}
                    >
                      <div>
                        <div className="font-medium text-sm">
                          {lecturer.personalInfo?.title || ''} {lecturer.personalInfo?.firstName || ''} {lecturer.personalInfo?.lastName || ''}
                        </div>
                        <div className="text-xs text-gray-500">{lecturer.personalInfo?.department || ''}</div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            selectLecturer(lecturer);
                            startEditing();
                          }}
                          className="p-1 text-gray-500 hover:text-emerald-500 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(lecturer.id);
                          }}
                          className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Lecturer Details/Form Panel */}
        <div className="col-span-2">
          <div className="bg-white rounded-md shadow">
            <div className="px-5 py-3 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-medium text-emerald-600">
                  {isAdding ? "Add New Lecturer" : 
                   isEditing ? "Edit Lecturer" : 
                   selectedLecturer ? "Lecturer Details" : "Select a Lecturer"}
                </h3>
                {selectedLecturer && !isEditing && !isAdding && (
                  <button
                    onClick={startEditing}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors text-sm"
                  >
                    Edit Information
                  </button>
                )}
              </div>
            </div>

            {!selectedLecturer && !isAdding ? (
              <div className="p-8 text-center text-gray-500">
                <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-sm">Select a lecturer to view details or click the "+" button to add a new lecturer</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5">
                {/* Personal Information Section */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-4">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <select
                        value={formData.personalInfo.title || ''}
                        onChange={(e) => handleInputChange('personalInfo', 'title', e.target.value)}
                        disabled={!isEditing && !isAdding}
                        required
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 text-sm"
                      >
                        <option value="">Select a title</option>
                        <option value="Dr.">Dr.</option>
                        <option value="Prof.">Prof.</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mx.">Mx.</option>
                      </select>
                    </div>
                    {!isAdding && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ID
                        </label>
                        <input
                          type="text"
                          value={selectedLecturer?.id || ""}
                          disabled
                          className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-sm"
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={formData.personalInfo.firstName || ''}
                        onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                        disabled={!isEditing && !isAdding}
                        required
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.personalInfo.lastName || ''}
                        onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                        disabled={!isEditing && !isAdding}
                        required
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 text-sm"
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
                        value={formData.personalInfo.email || ''}
                        onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                        disabled={!isEditing && !isAdding}
                        required
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 text-sm"
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
                        value={formData.personalInfo.phone || ''}
                        onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                        disabled={!isEditing && !isAdding}
                        required
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 text-sm"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          Department
                        </div>
                      </label>
                      <input
                        type="text"
                        value={formData.personalInfo.department || ''}
                        onChange={(e) => handleInputChange('personalInfo', 'department', e.target.value)}
                        disabled={!isEditing && !isAdding}
                        required
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 text-sm"
                      />
                    </div>
                  </div>
                </div>

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
                      className={`px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors text-sm ${
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

export default LecturerManagement;