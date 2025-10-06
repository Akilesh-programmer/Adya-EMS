import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye, FaEyeSlash, FaUserPlus, FaSignInAlt, FaCrown, FaShieldAlt, FaStar, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }
      );

      if (response.data) {
        dispatch(setCredentials({
          token: response.data.token,
          user: response.data.user
        }));
        toast.success('Registration successful!');
        navigate('/');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>
      
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative z-10">
        {/* Left Panel - Visual */}
        <div className="hidden lg:block relative bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50"></div>
          <div className="relative h-full flex flex-col justify-center items-center p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/20">
                <FaCrown className="text-yellow-400" />
                <span className="text-white font-medium">Join Elite Community</span>
              </div>
              <h3 className="text-4xl font-bold text-white mb-4">
                Exclusive 
                <br />
                Membership
              </h3>
              <p className="text-white/70 text-lg">
                Become part of our premium event management ecosystem
              </p>
            </div>
            
            <div className="w-full max-w-md mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl blur-lg opacity-30"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <div className="text-center">
                    <FaUserPlus className="text-6xl text-yellow-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-white mb-2">Premium Access</h4>
                    <p className="text-white/70">Get exclusive features and priority support</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 w-full max-w-md">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
                <FaShieldAlt className="text-yellow-400 text-2xl mx-auto mb-2" />
                <p className="text-white/80 text-sm font-medium">Secure</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
                <FaCrown className="text-yellow-400 text-2xl mx-auto mb-2" />
                <p className="text-white/80 text-sm font-medium">Premium</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
                <HiSparkles className="text-yellow-400 text-2xl mx-auto mb-2" />
                <p className="text-white/80 text-sm font-medium">Exclusive</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="p-8 lg:p-12 relative">
          {/* Premium header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <img
                  src="https://sece.ac.in/wp-content/uploads/2024/05/clg-logo2-scaled.webp"
                  alt="College Logo"
                  className="h-16 w-auto drop-shadow-2xl"
                />
                <div className="absolute -top-1 -right-1">
                  <FaCrown className="text-yellow-400 text-lg animate-pulse" />
                </div>
              </div>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gold-400 via-yellow-300 to-gold-400 bg-clip-text text-transparent mb-2">
              Create Premium Account
            </h1>
            <div className="flex items-center justify-center gap-2 text-white/70">
              <HiSparkles className="text-yellow-400" />
              <span className="text-sm">Join our exclusive community</span>
              <HiSparkles className="text-yellow-400" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                <FaUser className="text-yellow-400 text-xs" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/15 transition-all duration-300"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                <FaEnvelope className="text-yellow-400 text-xs" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/15 transition-all duration-300"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                <FaLock className="text-yellow-400 text-xs" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/15 transition-all duration-300 pr-12"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                <FaShieldAlt className="text-yellow-400 text-xs" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/15 transition-all duration-300 pr-12"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:via-purple-800 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <FaUserPlus />
                    Create Premium Account
                  </>
                )}
              </button>
              
              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-white/70 hover:text-white transition-colors text-sm underline decoration-dotted underline-offset-4 flex items-center justify-center gap-2"
                >
                  <FaSignInAlt className="text-xs" />
                  Already have an account? Sign in here
                </button>
              </div>
            </div>
          </form>

          {/* Trust indicators */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="flex items-center justify-center gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-green-400" />
                <span className="text-xs">256-bit SSL</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCrown className="text-yellow-400" />
                <span className="text-xs">Premium</span>
              </div>
              <div className="flex items-center gap-2">
                <HiSparkles className="text-blue-400" />
                <span className="text-xs">Exclusive</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 