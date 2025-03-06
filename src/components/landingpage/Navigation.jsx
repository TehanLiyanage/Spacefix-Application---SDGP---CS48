import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';

const Navigation = () => {
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
    if (id === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-500 bg-clip-text text-transparent">
            S P A C E F I X
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {['Home', 'Features', 'Solutions', 'Team', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-gray-700 text-base font-medium transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <button
              onClick={() => navigate('/uni-login')}
              className="px-6 py-2.5 text-emerald-600 bg-emerald-50 rounded-full hover:bg-emerald-100 transition-all duration-300 font-medium"
            >
              Login
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-emerald-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div 
        className={`lg:hidden fixed left-0 right-0 top-16 transition-all duration-300 transform ${
          isMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-2 opacity-0 invisible'
        }`}
      >
        <div className="mx-4 bg-white shadow-xl rounded-xl border border-gray-100">
          <div className="flex flex-col divide-y divide-gray-100">
            {['Home', 'Features', 'Solutions', 'Team', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="w-full text-left px-6 py-4 text-gray-700 hover:text-emerald-600 font-medium hover:bg-emerald-50/50 transition-all duration-200 flex items-center justify-between group"
              >
                <span>{item}</span>
                <ChevronRight className="w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
              </button>
            ))}
            <div className="p-4">
              <button
                onClick={() => navigate('/uni-login')}
                className="w-full px-6 py-3 text-emerald-600 bg-emerald-50 rounded-full hover:bg-emerald-100 transition-all duration-200 font-medium"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;