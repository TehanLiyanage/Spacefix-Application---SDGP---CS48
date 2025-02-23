import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  CalendarCheck,
  Clock, 
  MapPin, 
  Bell, 
  Users, 
  BarChart, 
  Eye
} from 'lucide-react';

const solutions = [
  {
    icon: <LayoutDashboard className="w-8 h-8 text-indigo-600" />, 
    title: "Space Registration", 
    description: "Efficient tracking and management of all campus spaces"
  },
  {
    icon: <CalendarCheck className="w-8 h-8 text-yellow-500" />, 
    title: "Smart Booking", 
    description: "Easy reservation system for spaces and resources"
  },
  {
    icon: <Clock className="w-8 h-8 text-pink-500" />, 
    title: "Live Availability", 
    description: "Real-time updates on space occupancy status"
  },
  {
    icon: <Users className="w-8 h-8 text-green-500" />, 
    title: "Occupancy Management", 
    description: "AI-powered crowd monitoring and space optimization"
  },
  {
    icon: <MapPin className="w-8 h-8 text-teal-500" />, 
    title: "Campus Navigation", 
    description: "Interactive maps for seamless space location"
  },
  {
    icon: <BarChart className="w-8 h-8 text-purple-600" />, 
    title: "Schedule Integration", 
    description: "Seamless timetable and location coordination"
  },
  {
    icon: <Bell className="w-8 h-8 text-orange-500" />, 
    title: "Smart Alerts", 
    description: "Instant notifications for bookings and updates"
  },
  {
    icon: <Eye className="w-8 h-8 text-red-500" />, 
    title: "Staff Dashboard", 
    description: "Streamlined classroom preparation and management"
  }
];

const SolutionsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="solutions" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-4 sm:mb-6">
            Smart Space Solutions
          </h2>
          <p className="text-lg text-gray-600">
            Transform your campus with intelligent space management
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {solutions.map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 rounded-lg bg-gray-50 p-3">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsSection;