import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PricingSection from '../components/PricingSection';
import ParticleNetwork from '../components/ParticleNetwork';
import TutorWidget from '../components/TutorWidget';

const PricingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleNetwork />
      <Navbar />
      
      <div className="pt-20">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> Plan</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Select the perfect plan to accelerate your C++ programming journey
          </p>
        </div>

        <PricingSection />
      </div>
      
      <Footer />
      <TutorWidget />
    </div>
  );
};

export default PricingPage;