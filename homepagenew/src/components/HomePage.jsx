import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Navigation Bar */}

      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
  isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
}`}>
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex justify-between items-center h-20">
      <div className="flex items-center">
        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-600 bg-clip-text text-transparent">
          SPACEFIX
        </span>
      </div>

      <div className="hidden lg:flex items-center space-x-8">
        {['Features', 'Solutions', 'About', 'Contact'].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className={`text-sm font-medium transition-colors ${
              isScrolled ? 'text-gray-700 hover:text-emerald-600' : 'text-white hover:text-emerald-200'
            }`}
          >
            {item}
          </button>
        ))}
        <button
          onClick={() => navigate('/user-login')}
          className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl text-sm font-medium"
        >
          Get Started
        </button>
        {/* New Admin Login Button with similar size */}
        <button
          onClick={() => navigate('/admin-login')}
          className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl text-sm font-medium"
        >
          Admin Login
        </button>
      </div>

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden text-gray-600 hover:text-emerald-600"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
    </div>

    {/* Mobile Menu */}
    <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} pb-6`}>
      <div className="flex flex-col space-y-4">
        {['Features', 'Solutions', 'About', 'Contact'].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className="text-gray-600 hover:text-emerald-600 font-medium"
          >
            {item}
          </button>
        ))}
        <button
          onClick={() => navigate('/user-login')}
          className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg"
        >
          Get Started
        </button>
        {/* New Admin Login Button with similar size */}
        <button
          onClick={() => navigate('/admin-login')}
          className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
        >
          Admin Login
        </button>
      </div>
    </div>
  </div>
</nav>

      

  
      {/* Hero Section */}
<div className="relative bg-gradient-to-br from-gray-900 to-emerald-900 min-h-screen flex items-center">
  <div className="absolute inset-0 bg-cover bg-center opacity-40" 
       style={{
         backgroundImage: "url('https://images.unsplash.com/photo-1574958269340-fa927503f3dd?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
       }}>
  </div>
  
  <div className="relative z-10 text-center text-white px-4 py-32 mx-auto max-w-7xl">
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
      Transform Your Campus <br />
      <span className="block text-emerald-400 mt-2">Experience Like Never Before</span>
    </h1>
    <p className="text-lg sm:text-xl max-w-lg mx-auto text-gray-300 mb-8">
      Revolutionize your university’s space management with our smart platform. Streamline operations, optimize resources, and enhance student satisfaction.
    </p>
    
    <div className="flex justify-center gap-6">
      <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-xl font-medium">
        Start Free Trial
      </button>
      <button className="px-8 py-4 bg-transparent text-white rounded-lg border border-emerald-400 hover:bg-emerald-500 hover:text-white transition-all shadow-md font-medium">
        Watch Demo
      </button>
    </div>
  </div>
</div>



      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Campuses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your university spaces efficiently and effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Smart Tracking",
                description: "Real-time monitoring of space utilization and occupancy rates"
              },
              {
                icon: "🗺️",
                title: "Interactive Maps",
                description: "Dynamic campus navigation with real-time updates and directions"
              },
              {
                icon: "📊",
                title: "Analytics Dashboard",
                description: "Comprehensive insights into space usage patterns and trends"
              },
              {
                icon: "🔐",
                title: "Secure Access",
                description: "Role-based access control and authentication system"
              },
              {
                icon: "📱",
                title: "Mobile First",
                description: "Fully responsive design optimized for all devices"
              },
              {
                icon: "🤝",
                title: "Integration Ready",
                description: "Seamless integration with existing university systems"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              Solutions That Drive Results
            </h2>
            <div className="space-y-8">
              {[
                {
                  title: "Space Optimization",
                  description: "Maximize the utilization of your campus spaces with intelligent scheduling and allocation."
                },
                {
                  title: "Resource Management",
                  description: "Efficiently manage and track all your campus resources in one centralized platform."
                },
                {
                  title: "User Experience",
                  description: "Provide a seamless experience for students and staff with our intuitive interface."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Universities" },
              { number: "100K+", label: "Active Users" },
              { number: "1M+", label: "Bookings Made" },
              { number: "99%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-emerald-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-600 bg-clip-text text-transparent mb-4">
                Let's Connect
              </h2>
              <p className="text-gray-600">
                Get in touch with our team and discover how we can transform your campus
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className="text-emerald-500 mb-4">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600">support@spacefix.com</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className="text-emerald-500 mb-4">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className="text-emerald-500 mb-4">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                <p className="text-gray-600">123 University Ave, Suite 456</p>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-emerald-500 to-cyan-600 p-8 rounded-xl text-white text-center">
              <h3 className="text-xl font-semibold mb-4">Connect on Social Media</h3>
              <div className="flex justify-center space-x-6">
                {['Facebook', 'Twitter', 'LinkedIn'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="hover:text-emerald-200 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      {social === 'Facebook' && (
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      )}
                      {social === 'Twitter' && (
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      )}
                      {social === 'LinkedIn' && (
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      )}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Footer */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                SPACEFIX
              </h3>
              <p className="text-gray-400">
                Making university space management smarter and more efficient.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                {['Features', 'Solutions', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-emerald-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Legal</h3>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Location</h3>
              <p className="text-gray-400">
                123 University Avenue<br />
                Suite 456<br />
                Education City, ED 12345
              </p>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="py-6 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Spacefix. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Support
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  FAQ
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;