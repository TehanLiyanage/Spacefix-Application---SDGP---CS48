import React from 'react';
import { Search } from 'lucide-react';

const HeroSection = () => {
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

  return (
    <div id="home" className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-100/40 to-cyan-100/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-100/40 to-cyan-100/40 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 h-screen">
        <div className="flex flex-col lg:flex-row items-center justify-between h-full gap-12 py-12">
          {/* Left Content */}
          <div className="flex-1 max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 opacity-0 animate-fadeIn">
              Transform Your Campus
              <span className="block mt-2 bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Experience
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 opacity-0 animate-fadeInDelay">
              Revolutionize your university's space management with our intelligent platform. Transform the way students and faculty interact with campus facilities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fadeInDelay2">
              <button 
                onClick={() => window.location.href = '#inquiry'}
                className="group px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full hover:shadow-xl transition-all duration-300 font-medium text-lg relative overflow-hidden hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">Inquire Now</span>
              </button>

              <button 
                onClick={() => scrollToSection('features')}
                className="px-8 py-3 border-2 border-emerald-500 text-emerald-600 rounded-full hover:bg-emerald-50 transition-all duration-300 font-medium text-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
              >
                Explore
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center items-center relative opacity-0 animate-fadeInDelay">
            <div className="relative w-full max-w-2xl">
              {/* Background blobs */}
              <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
              <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
              
              {/* Main image */}
              <div className="relative z-20 animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?q=80&w=2110&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Modern University Campus"
                  className="rounded-lg shadow-2xl object-cover w-full transform transition-transform hover:scale-105 duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s forwards;
        }

        .animate-fadeInDelay {
          animation: fadeIn 0.8s 0.2s forwards;
        }

        .animate-fadeInDelay2 {
          animation: fadeIn 0.8s 0.4s forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(0, 20px) scale(1); }
          75% { transform: translate(-20px, -20px) scale(0.9); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;