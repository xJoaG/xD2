import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Loader, Sparkles, Shield, Heart, Crown, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('premium');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login, register, isLoading } = useAuth();

  const plans = [
    {
      id: 'free',
      name: 'Free',
      icon: User,
      price: '$0',
      features: ['5 Free Courses', 'Basic Support', 'Community Access'],
      color: 'from-gray-500 to-gray-600',
      bgColor: 'from-gray-500/10 to-gray-600/10'
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: Crown,
      price: '$29/mo',
      features: ['Unlimited Courses', 'AI Tutor Luna', 'Priority Support', 'Certificates', '3D Learning'],
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-500/10 to-orange-500/10',
      popular: true
    }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && !formData.name) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.email, formData.password, formData.name);
      }
      onClose();
    } catch (error) {
      setErrors({ submit: 'Authentication failed. Please try again.' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({ email: '', password: '', name: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Premium Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      />
      
      {/* Floating premium particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400/40 to-purple-400/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      {/* Premium Modal */}
      <div className="relative glass-morphism rounded-3xl border border-white/20 w-full max-w-lg p-8 shadow-2xl animate-fade-in">
        {/* Multi-layer gradient border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-2xl -z-10"></div>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/10 via-violet-500/10 to-fuchsia-500/10 blur-xl -z-10"></div>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-all duration-200 p-2 hover:bg-white/10 rounded-full"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Premium Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6 shadow-2xl">
            {isLogin ? (
              <Shield className="h-10 w-10 text-white" />
            ) : (
              <Crown className="h-10 w-10 text-white" />
            )}
          </div>
          <h2 className="text-4xl font-black text-white mb-3">
            {isLogin ? 'Welcome Back!' : 'Join EduSphere'}
          </h2>
          <p className="text-gray-300 text-xl">
            {isLogin ? 'Continue your premium learning journey' : 'Start your educational transformation'}
          </p>
        </div>

        {/* Plan Selection for Registration */}
        {!isLogin && (
          <div className="mb-8">
            <h3 className="text-white font-bold text-lg mb-4 text-center">Choose Your Plan</h3>
            <div className="grid grid-cols-2 gap-4">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id as 'free' | 'premium')}
                  className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? 'border-indigo-400 bg-indigo-500/20'
                      : 'border-white/20 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                        Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${plan.color} mb-3`}>
                      <plan.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-white font-bold text-lg">{plan.name}</h4>
                    <p className="text-gray-300 font-semibold">{plan.price}</p>
                    <ul className="mt-2 space-y-1">
                      {plan.features.slice(0, 2).map((feature, i) => (
                        <li key={i} className="text-gray-400 text-xs">{feature}</li>
                      ))}
                    </ul>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="animate-slide-up">
              <label className="block text-sm font-bold text-gray-300 mb-3">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-indigo-400 transition-colors duration-200" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field pl-12 focus-ring text-lg py-4"
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm mt-2 animate-fade-in">{errors.name}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-3">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-indigo-400 transition-colors duration-200" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field pl-12 focus-ring text-lg py-4"
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm mt-2 animate-fade-in">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-3">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-indigo-400 transition-colors duration-200" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-field pl-12 pr-12 focus-ring text-lg py-4"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 p-1"
              >
                {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-2 animate-fade-in">{errors.password}</p>
            )}
          </div>

          {errors.submit && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 animate-fade-in">
              <p className="text-red-400 text-sm text-center">{errors.submit}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 text-xl py-5"
          >
            {isLoading ? (
              <>
                <Loader className="h-6 w-6 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                {!isLogin && selectedPlan === 'premium' && <Crown className="h-6 w-6" />}
                <span>{isLogin ? 'Sign In' : `Start ${selectedPlan === 'premium' ? 'Premium' : 'Free'}`}</span>
                <Sparkles className="h-6 w-6" />
              </>
            )}
          </button>
        </form>

        {/* Toggle */}
        <div className="text-center mt-8">
          <p className="text-gray-300 text-lg">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={toggleMode}
              className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors duration-200 underline decoration-2 underline-offset-2"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Premium footer */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-center space-x-3 text-gray-400 text-sm mb-3">
            <Shield className="h-5 w-5" />
            <span className="font-semibold">Enterprise-grade security</span>
            <Zap className="h-5 w-5 text-yellow-400" />
          </div>
          <p className="text-center text-gray-400 text-sm">
            By continuing, you agree to our{' '}
            <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200 font-semibold">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200 font-semibold">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;