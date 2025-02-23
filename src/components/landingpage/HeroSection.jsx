import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Animation variants
  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 1.5,
        staggerChildren: 0.3 
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0"
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] bg-gradient-to-br from-emerald-100/40 to-cyan-100/40 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4"
        />
        
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-0 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] bg-gradient-to-tr from-emerald-100/40 to-cyan-100/40 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/4"
        />

        <motion.div 
          animate={{
            rotate: 360,
            transition: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
          className="absolute top-1/4 left-1/3 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 bg-gradient-to-br from-emerald-200/20 to-emerald-100/20 rounded-2xl"
        />

        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="hidden md:block absolute top-1/4 right-1/4 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 rounded-full bg-gradient-to-r from-emerald-100/30 to-cyan-100/30 blur-2xl"
        />

        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="hidden sm:block absolute bottom-1/3 right-1/3 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-tr from-cyan-300/20 to-cyan-200/20 rounded-full"
        />
      </motion.div>

      {/* Animated Content */}
      <motion.div 
        className="relative z-10 text-center w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 mx-auto max-w-[95%] sm:max-w-[90%] lg:max-w-7xl"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          <motion.h1 
            className="text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[5rem] font-bold leading-[1.1] tracking-tight mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform Your Campus
            <motion.span 
              className="block mt-2 sm:mt-2 md:mt-3 bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Experience
            </motion.span>
          </motion.h1>

          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-2xl mx-auto text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Revolutionize your university's space management with our intelligent platform.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 mt-6 sm:mt-8 md:mt-10">
            <motion.button 
              onClick={() => navigate('/inquiry')}
              className="group w-[90%] sm:w-auto min-w-[150px] sm:min-w-[180px] px-6 sm:px-7 md:px-8 lg:px-10 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full hover:shadow-xl transition-all duration-300 font-medium text-base sm:text-lg relative overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <span className="relative z-10">Inquire Now</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0 }}
              />
            </motion.button>

            <motion.button 
              onClick={() => scrollToSection('features')}
              className="group w-[90%] sm:w-auto min-w-[150px] sm:min-w-[180px] px-6 sm:px-7 md:px-8 lg:px-10 py-3 sm:py-3.5 md:py-4 border-2 border-emerald-500 text-emerald-600 rounded-full hover:bg-emerald-50 transition-all duration-300 font-medium text-base sm:text-lg flex items-center justify-center gap-2"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Explore
              <Search className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;