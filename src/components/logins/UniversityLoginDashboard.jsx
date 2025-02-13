// UNIVERSITY SELECT DASHBOARD

import React from 'react';
import { Building2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UniversityLoginDashboard = () => {
  const navigate = useNavigate();

  const universities = [
    { 
      id: 1, 
      name: 'Informatics Institute of Technology', 
      code: 'IIT', 
      logo: 'https://studyway-resources.s3.amazonaws.com/profilePictures/1677148866188.png'
    },
    { 
      id: 2, 
      name: 'University of Colombo', 
      code: 'UOC', 
      logo: 'https://cmb.ac.lk/wp-content/uploads/logo-color.png'
    },
    { 
      id: 3, 
      name: 'University of Moratuwa', 
      code: 'UOM', 
      logo: 'https://upload.wikimedia.org/wikipedia/en/6/60/University_of_Moratuwa_logo.png'
    },
    { 
      id: 4, 
      name: 'SLIIT', 
      code: 'SLIIT', 
      logo: 'https://threelanka.com/assets/img/logos/SLIIT_Logo_Crest.png'
    }
  ];

  const handleUniversitySelect = (code) => {
    if (code === 'IIT') {
      navigate('/iit-role-login');
    } else {
      alert('This university portal is under development');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-600 bg-clip-text text-transparent mb-4">
            University Portal
          </h1>
          <p className="text-lg text-gray-600">
            Select your university to access the campus management system
          </p>
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {universities.map((university) => (
            <button
              key={university.id}
              onClick={() => handleUniversitySelect(university.code)}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between group hover:-translate-y-1"
            >
              <div className="flex items-center gap-6">
                <img 
                  src={university.logo} 
                  alt={`${university.name} logo`} 
                  className="w-16 h-16 object-contain"
                />
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {university.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Portal Code: {university.code}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-emerald-500 group-hover:text-cyan-600 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityLoginDashboard;