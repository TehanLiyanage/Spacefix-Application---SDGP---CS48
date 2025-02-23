import React from 'react';
import { 
  Calendar, 
  Users, 
  Map, 
  Bell, 
  Brain,
  Building2
} from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Calendar className="w-8 h-8 text-emerald-600" />,
    title: "Smart Scheduling System",
    description: "Seamlessly book lecture halls and study spaces with our intuitive scheduling platform designed for both students and faculty"
  },
  {
    icon: <Users className="w-8 h-8 text-emerald-600" />,
    title: "Dynamic Occupancy Tracking",
    description: "Real-time space monitoring with advanced crowd management to ensure optimal space utilization and comfortable capacity levels"
  },
  {
    icon: <Map className="w-8 h-8 text-emerald-600" />,
    title: "Interactive Campus Navigator",
    description: "Navigate your way through campus with our detailed indoor mapping system, helping you find the shortest route to your destination"
  },
  {
    icon: <Bell className="w-8 h-8 text-emerald-600" />,
    title: "Smart Schedule Alerts",
    description: "Stay informed with automated notifications about your bookings, schedule changes, and space availability integrated with your timetable"
  },
  {
    icon: <Brain className="w-8 h-8 text-emerald-600" />,
    title: "AI-Powered Space Analytics",
    description: "Advanced machine learning algorithms to predict and manage classroom occupancy, ensuring optimal space distribution"
  },
  {
    icon: <Building2 className="w-8 h-8 text-emerald-600" />,
    title: "Space Optimization Hub",
    description: "Centralized dashboard for monitoring and managing all campus spaces with predictive analytics and usage patterns"
  }
];

const FeaturesSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const featureVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="features" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-100/20 to-cyan-100/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-100/20 to-cyan-100/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Intelligent Campus Features
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transform your campus experience with our cutting-edge space management solutions
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={featureVariants}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative">
                <motion.div 
                  className="mb-4 inline-block"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 0.3 }
                  }}
                >
                  {feature.icon}
                </motion.div>
                <motion.h3 
                  className="text-xl font-semibold mb-3 text-gray-900"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  {feature.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Additional decorative floating elements */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + (i % 2) * 40}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}
    </section>
  );
};

export default FeaturesSection;