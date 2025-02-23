import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';


// import images
import sandewdiImg from '../../assets/teammembers/Sandewdi.jpg'; 
import yasithImg from '../../assets/teammembers/Yasith.jpg';
import sameehaImg from '../../assets/teammembers/Sameeha.png'; 
import nisiniImg from '../../assets/teammembers/Nisini.jpg'; 

const teamMembers = [
  {
    name: "Akila Tehan Liyanage",
    role: "Developer",
    image: "/api/placeholder/300/300",
    links: {
      github: "https://github.com/akilatehan",
      linkedin: "https://linkedin.com/in/akilatehan",
      email: "mailto:akila@spacefix.com"
    }
  },
  {
    name: "Yasith Rashan Perera",
    role: "Developer",
    image: yasithImg,
    links: {
      github: "https://github.com/yasithrashan2003",
      linkedin: "https://www.linkedin.com/in/yasith-rashan-a44b54295/",
      email: "mailto:yasith@spacefix.com"
    }
  },
  {
    name: "Kasuni Dulanjalee",
    role: "Developer",
    image: "/api/placeholder/300/300",
    links: {
      github: "https://github.com/kasunidulanjalee",
      linkedin: "https://linkedin.com/in/kasunidulanjalee",
      email: "mailto:kasuni@spacefix.com"
    }
  },
  {
    name: "Sandewdi Fonseka",
    role: "Developer",
    image: sandewdiImg,
    links: {
      github: "https://github.com/GSNowanyaFonseka",
      linkedin: "https://www.linkedin.com/in/sandewdi-nowanya-790213312/",
      email: "mailto:sandewdi@spacefix.com"
    }
  },
  {
    name: "Mohomad Sameeha",
    role: "Developer",
    image: sameehaImg,
    links: {
      github: "",
      linkedin: "",
      email: ""
    }
  },
  {
    name: "Nisini Soomasekara",
    role: "Developer",
    image: nisiniImg,
    links: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
      email: "mailto:nisini@spacefix.com"
    }
  }
];

const TeamSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
        duration: 0.5
      }
    }
  };

  return (
    <section id="team" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-cyan-50/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Decorative Elements */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-100/20 to-cyan-100/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-100/20 to-cyan-100/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-600 bg-clip-text text-transparent mb-4"
            variants={itemVariants}
          >
            Meet Our Team
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            The talented developers behind SpaceFix
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative mb-6">
                  <div className="aspect-square overflow-hidden rounded-xl">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end justify-center pb-4"
                  >
                    <div className="flex space-x-4">
                      <motion.a
                        href={member.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/20 rounded-full backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        href={member.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/20 rounded-full backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Linkedin className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        href={member.links.email}
                        className="p-2 bg-white/20 rounded-full backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Mail className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-emerald-600 font-medium">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;