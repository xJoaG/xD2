import React, { useState, useEffect } from 'react';
import { ArrowRight, PlayCircle, Users, BookOpen, Award, Sparkles, Zap, Globe, Crown, Star } from 'lucide-react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { icon: Users, value: '50K+', label: 'Active Learners' },
    { icon: BookOpen, value: '1000+', label: 'Expert Courses' },
    { icon: Award, value: '98%', label: 'Success Rate' },
  ];

  const membershipPlans = [
    {
      type: 'Free',
      icon: BookOpen,
      features: ['5 Free Courses', 'Basic Support', 'Community Access'],
      color: 'from-gray-500 to-gray-600',
      bgColor: 'from-gray-500/10 to-gray-600/10'
    },
    {
      type: 'Premium',
      icon: Crown,
      features: ['Unlimited Courses', 'AI Tutor', 'Priority Support', 'Certificates'],
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-500/10 to-orange-500/10',
      popular: true
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      
      {/* Sophisticated animated background */}
      <div className="absolute inset-0 overflow-hidden z-[2]">
        {/* Floating geometric shapes */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {i % 3 === 0 ? (
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-xl" />
            ) : i % 3 === 1 ? (
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rotate-45 blur-lg" />
            ) : (
              <div className="w-8 h-20 bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-full blur-lg" />
            )}
          </div>
        ))}
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-pattern-grid opacity-5"></div>
      </div>

      {/* Premium overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20 z-[3]" /> 

      {/* Content */}
      <div className="relative z-[10] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center space-y-12">
          {/* Premium hero badge */}
          <div className="inline-flex items-center space-x-4 glass-morphism rounded-full px-8 py-4 border border-white/30 shadow-2xl animate-fade-in">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <Globe className="h-6 w-6 text-indigo-400" />
            </div>
            <span className="text-white font-semibold text-lg">Premium Learning Platform</span>
            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-yellow-400 font-bold">4.9</span>
            </div>
          </div>

          {/* Main heading with enhanced typography */}
          <div className="space-y-8 animate-slide-up">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.9] tracking-tight">
              Explore the
              <span className="block text-gradient-primary bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> 
                Universe 
              </span>
              of Learning
            </h1>
            <p className="text-2xl lg:text-3xl text-gray-200 max-w-5xl mx-auto leading-relaxed font-light">
              Transform your potential with our revolutionary learning environment. 
              <span className="text-gradient-secondary font-medium">Master tomorrow's skills today.</span>
            </p>
          </div>

          {/* Membership Plans Preview */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {membershipPlans.map((plan, index) => (
              <div
                key={plan.type}
                className={`relative glass-morphism rounded-2xl p-8 border border-white/20 card-hover ${
                  plan.popular ? 'ring-2 ring-yellow-400/50' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${plan.color} mb-4 shadow-lg`}>
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{plan.type}</h3>
                  <ul className="space-y-2 text-gray-300">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center justify-center space-x-2">
                        <Sparkles className="h-4 w-4 text-indigo-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <button className="group btn-primary text-xl px-12 py-6 flex items-center space-x-3 shadow-2xl">
              <Crown className="h-6 w-6" />
              <span>Start Premium Trial</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button className="group btn-secondary text-xl px-12 py-6 flex items-center space-x-3">
              <PlayCircle className="h-6 w-6" />
              <span>Explore Free Courses</span>
            </button>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.9s' }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="glass-morphism rounded-3xl p-8 border border-white/30 shadow-2xl card-hover">
                  <div className="flex items-center justify-center mb-6">
                    <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-black text-white mb-3">{stat.value}</div>
                  <p className="text-gray-300 font-semibold text-lg">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust indicators with proper spacing */}
          <div className="flex flex-wrap justify-center items-center gap-12 pt-20 pb-8 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <div className="flex items-center space-x-3 text-gray-300 bg-white/5 rounded-full px-6 py-3">
              <Zap className="h-6 w-6 text-yellow-400" />
              <span className="font-semibold text-lg">AI-Powered Learning</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300 bg-white/5 rounded-full px-6 py-3">
              <Award className="h-6 w-6 text-green-400" />
              <span className="font-semibold text-lg">Industry Certified</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300 bg-white/5 rounded-full px-6 py-3">
              <Users className="h-6 w-6 text-blue-400" />
              <span className="font-semibold text-lg">Global Community</span>
            </div>
          </div>
        </div>
      </div>

      {/* Smart scroll indicator - only shows when at top */}
      {scrollY < 100 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-[10]">
          <div className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center glass-morphism">
            <div className="w-2 h-4 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;