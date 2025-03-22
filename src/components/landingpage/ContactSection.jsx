import React from 'react';
import { motion } from 'framer-motion';
import { MdEmail, MdPhone } from 'react-icons/md';
import { FaLinkedin, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';


const contactInfo = [
  {
    icon: <MdEmail className="w-6 h-6" />,
    title: "Email Us",
    info: "spacefix.contact@gmail.com",
    href: "mailto:spacefix.contact@gmail.com"
  },
  {
    icon: <MdPhone className="w-6 h-6" />,
    title: "Call Us",
    info: "+94 70 132 8192",
    href: "tel:+94701328192"
  }
];

const socialLinks = [
  { 
    icon: <FaLinkedin className="w-6 h-6" />, 
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/spacefixlk',
    color: 'hover:text-[#0077B5]'
  },
  { 
    icon: <FaInstagram className="w-6 h-6" />, 
    name: 'Instagram',
    href: 'https://www.instagram.com/spacefixlk?igsh=MTZoNTk2MWNjdnYzYw%3D%3D&utm_source=qr',
    color: 'hover:text-[#E4405F]'
  },
  { 
    icon: <FaTwitter className="w-6 h-6" />, 
    name: 'Twitter',
    href: 'https://x.com/Spacefixlk',
    color: 'hover:text-[#1DA1F2]'
  },
  {
    icon: <FaYoutube className="w-6 h-6" />,
    name: 'YouTube',
    href: 'https://www.youtube.com/@spacefixlk',
    color: 'hover:text-[#FF0000]'
  }
];


const ContactSection = () => {
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
    <section id="contact" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-cyan-50/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Animated decorative elements */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl sm:text-5xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-4 sm:mb-6"
              variants={itemVariants}
            >
              Let's Connect
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600"
              variants={itemVariants}
            >
              Discover how we can transform your campus experience
            </motion.p>
          </div>
          
          <motion.div 
            className="grid sm:grid-cols-2 gap-8"
            variants={containerVariants}
          >
            {contactInfo.map((contact, index) => (
              <motion.a
                href={contact.href}
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group bg-white p-6 rounded-2xl hover:shadow-lg transition-all duration-300 text-center border border-gray-100"
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-cyan-100 text-emerald-600 mb-4"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {contact.icon}
                </motion.div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-emerald-600 transition-colors">
                  {contact.title}
                </h3>
                <p className="text-gray-600">{contact.info}</p>
              </motion.a>
            ))}
          </motion.div>

          <motion.div 
            className="mt-16 bg-gradient-to-r from-emerald-500 to-cyan-600 p-8 rounded-2xl text-white text-center relative overflow-hidden"
            variants={itemVariants}
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-grid-white/[0.2] [mask-image:linear-gradient(0deg,transparent,black,transparent)]" />
            </div>

            <h3 className="text-xl font-semibold mb-8">Connect on Social Media</h3>
            <motion.div 
              className="flex justify-center gap-8"
              variants={containerVariants}
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-white/10 rounded-full backdrop-blur-sm transition-all duration-300 ${social.color}`}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: "rgba(255, 255, 255, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;