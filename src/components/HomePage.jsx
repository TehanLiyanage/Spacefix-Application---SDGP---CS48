import React from 'react';
import Navigation from './landingpage/Navigation';
import HeroSection from './landingpage/HeroSection';
import FeaturesSection from './landingpage/FeatureSection';
import SolutionsSection from './landingpage/SolutionSection';
import ContactSection from './landingpage/ContactSection';
import Footer from './landingpage/Footer';
import TeamSection from './landingpage/TeamSection';


const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-gray-50">
      <Navigation />
      <HeroSection />
      <SolutionsSection />
      <FeaturesSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    
    </div>
  );
};

export default HomePage;