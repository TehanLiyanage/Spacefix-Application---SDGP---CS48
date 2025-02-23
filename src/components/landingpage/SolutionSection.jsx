import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  BarChart, 
  Shield, 
  Clock, 
  Building,
  Settings,
  MessageSquare 
} from 'lucide-react';

const solutions = [
  {
    icon: <LayoutDashboard className="w-8 h-8 text-emerald-600" />,
    title: "Centralized Management",
    description: "Single unified platform for comprehensive space management across multiple buildings and campuses"
  },
  {
    icon: <Users className="w-8 h-8 text-emerald-600" />,
    title: "Enhanced User Experience",
    description: "Intuitive mobile-first interface with personalized dashboards for students, faculty, and administrators"
  },
  {
    icon: <BarChart className="w-8 h-8 text-emerald-600" />,
    title: "Data-Driven Insights",
    description: "Comprehensive analytics and reporting tools for informed decision-making and space planning"
  },
  {
    icon: <Shield className="w-8 h-8 text-emerald-600" />,
    title: "Advanced Security",
    description: "Role-based access control with real-time monitoring and automated security protocols"
  },
  {
    icon: <Clock className="w-8 h-8 text-emerald-600" />,
    title: "Real-Time Availability",
    description: "Live updates on space availability with instant booking confirmation and waitlist management"
  },
  {
    icon: <Building className="w-8 h-8 text-emerald-600" />,
    title: "Smart Building Integration",
    description: "Seamless integration with building management systems for automated climate control and energy efficiency"
  },
  {
    icon: <Settings className="w-8 h-8 text-emerald-600" />,
    title: "Customizable Configuration",
    description: "Flexible system settings to accommodate different departments' unique scheduling and space requirements"
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-emerald-600" />,
    title: "Communication Hub",
    description: "Integrated messaging system for quick communication between users, administrators, and facility managers"
  }
];

const SolutionsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="solutions" className="py-20 sm:py-28 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-50/30 to-cyan-50/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-50/30 to-cyan-50/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-emerald-50/10 to-cyan-50/10 rotate-45" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Solutions That Drive Results
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your campus experience with our comprehensive space management solutions
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {solutions.map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50 backdrop-blur-sm"
            >
              <div className="flex flex-col items-start space-y-4">
                <motion.div 
                  className="rounded-2xl bg-gradient-to-br from-emerald-50 to-cyan-50 p-3"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {item.icon}
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="h-full border-l border-emerald-100/20"
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 1.5, delay: i * 0.2 }}
          />
        ))}
      </div>
    </section>
  );
};

export default SolutionsSection;