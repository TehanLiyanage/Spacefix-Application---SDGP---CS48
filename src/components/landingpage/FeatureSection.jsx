import React from 'react';

const SmartBookingIcon = () => (
  <svg viewBox="0 0 48 48" className="w-12 h-12">
    <circle cx="24" cy="24" r="20" fill="#E8F5FF"/>
    <circle cx="24" cy="24" r="16" fill="#2196F3"/>
    <path d="M24 12v12l8 8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="24" cy="24" r="3" fill="white"/>
  </svg>
);

const OccupancyIcon = () => (
  <svg viewBox="0 0 48 48" className="w-12 h-12">
    <rect x="8" y="8" width="32" height="32" rx="16" fill="#F3E5F5"/>
    <path d="M16 24h4v8h-4zm6-4h4v12h-4zm6-6h4v18h-4z" fill="#9C27B0"/>
    <circle cx="36" cy="14" r="4" fill="#E91E63"/>
  </svg>
);

const NavigationIcon = () => (
  <svg viewBox="0 0 48 48" className="w-12 h-12">
    <path d="M8 8h32v32H8z" fill="#E8F5E9"/>
    <path d="M14 14h20v20H14z" fill="#4CAF50"/>
    <circle cx="24" cy="24" r="6" fill="white"/>
    <path d="M24 21v6m-3-3h6" stroke="#4CAF50" strokeWidth="2"/>
  </svg>
);

const AlertsIcon = () => (
  <svg viewBox="0 0 48 48" className="w-12 h-12">
    <path d="M24 4l20 36H4z" fill="#FFEBEE"/>
    <path d="M24 10l14 26H10z" fill="#F44336"/>
    <path d="M24 20v8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="24" cy="34" r="2" fill="white"/>
  </svg>
);

const ManagementIcon = () => (
  <svg viewBox="0 0 48 48" className="w-12 h-12">
    <rect x="8" y="8" width="32" height="32" rx="6" fill="#FFF3E0"/>
    <rect x="12" y="12" width="24" height="24" rx="4" fill="#FF9800"/>
    <path d="M16 22h16M16 28h12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const AnalyticsIcon = () => (
  <svg viewBox="0 0 48 48" className="w-12 h-12">
    <circle cx="24" cy="24" r="20" fill="#E0F2F1"/>
    <path d="M14 28l6-6 8 8 6-12" stroke="#009688" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="14" cy="28" r="3" fill="#009688"/>
    <circle cx="20" cy="22" r="3" fill="#009688"/>
    <circle cx="28" cy="30" r="3" fill="#009688"/>
    <circle cx="34" cy="18" r="3" fill="#009688"/>
  </svg>
);

const features = [
  {
    icon: <SmartBookingIcon />,
    title: "Smart Booking System",
    description: "Easily book classrooms, labs, and study spaces in advance with our intuitive scheduling system for students and faculty."
  },
  {
    icon: <OccupancyIcon />,
    title: "Dynamic Occupancy Tracking",
    description: "Monitor real-time space availability and manage incoming crowd levels dynamically to optimize resource usage."
  },
  {
    icon: <NavigationIcon />,
    title: "Interactive Campus Navigation",
    description: "Navigate seamlessly through the campus with an interactive mini-map providing real-time directions to lecture halls, labs, and study spaces."
  },
  {
    icon: <AlertsIcon />,
    title: "Real-time Alerts",
    description: "Stay informed with automated notifications about lectures, room changes, and real-time availability updates."
  },
  {
    icon: <ManagementIcon />,
    title: "Comprehensive Space Management",
    description: "All classrooms, labs, and study areas are registered for efficient tracking, allocation, and management by students, lecturers, and staff."
  },
  {
    icon: <AnalyticsIcon />,
    title: "Advanced Analytics",
    description: "Machine learning-driven occupancy detection and classroom management to enhance space utilization and prevent overcrowding."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 sm:py-28 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-4 sm:mb-6">
            Our Features
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
            Transform your campus experience with our cutting-edge space management solutions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-emerald-300"
            >
              <div className="mb-5 inline-block">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-700">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;