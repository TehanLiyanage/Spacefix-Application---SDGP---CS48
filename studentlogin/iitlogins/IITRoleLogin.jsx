import React from 'react';
import { UserCircle, BookOpen, Users, Building2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IITRoleLogin = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 1,
      title: 'Student Login',
      icon: <UserCircle className="w-8 h-8" />,
      description: 'Access your student portal, courses, and resources',
      path: '/iit-student-login',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 2,
      title: 'Lecturer Login',
      icon: <BookOpen className="w-8 h-8" />,
      description: 'Manage your courses and student assessments',
      path: '/iit-lecturer-login',
      gradient: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 3,
      title: 'Admin Login',
      icon: <Building2 className="w-8 h-8" />,
      description: 'Access administrative tools and system settings',
      path: '/iit-admin-login',
      gradient: 'from-emerald-600 to-cyan-600'
    },
    {
      id: 4,
      title: 'Staff Login',
      icon: <Users className="w-8 h-8" />,
      description: 'Access staff resources and department tools',
      path: '/iit-staff-login',
      gradient: 'from-cyan-600 to-emerald-600'
    }
  ];

  const handleRoleSelect = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-600 bg-clip-text text-transparent mb-4">
            IIT Portal Access
          </h1>
          <p className="text-lg text-gray-600">
            Select your role to access the campus management system
          </p>
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.path)}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between group hover:-translate-y-1"
            >
              <div className="flex items-center gap-6">
                <div className={`bg-gradient-to-r ${role.gradient} p-4 rounded-lg text-white`}>
                  {role.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {role.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {role.description}
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

export default IITRoleLogin;