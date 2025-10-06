import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserPlus, FaSignInAlt, FaCrown, FaShieldAlt, FaStar } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import axios from "axios";
import events from "../assets/Website setup-rafiki.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Map backend department to formType
function mapDeptToFormType(dept) {
  if (!dept) return '';
  const d = dept.toLowerCase();
  if (d === 'media' || d === 'communication') return 'communication';
  if (d === 'food') return 'food';
  if (d === 'transport') return 'transport';
  if (d === 'guestroom' || d === 'guest room' || d === 'guest department') return 'guestroom';
  return d; // fallback
}

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dept: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      if (isSignup) {
        // Frontend validation for password match
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match!");
          return;
        }
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/sece/signup`,
          {
            name: formData.name,
            emailId: formData.email, // map email to emailId
            password: formData.password,
            dept: formData.dept,
            phoneNumber: formData.phoneNumber,
          }
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_dept", mapDeptToFormType(response.data.dept));
        navigate("/dashboard");
        toast.success("Signup successful!");
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/sece/login`,
          {
            emailId: formData.email,
            password: formData.password
          }
        );
        console.log("Login response:", response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_dept", mapDeptToFormType(response.data.dept));
        console.log("Stored department:", mapDeptToFormType(response.data.dept));
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error", error);
      if (error.response) {
        toast.error(
          error.response.data.message || "Invalid email or password!"
        );
      } else {
        toast.error("Network error. Please check your connection.");
      }
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
      
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative z-10">
        {/* Left Panel - Form */}
        <div className="p-8 lg:p-12 relative">
          {/* Premium header with logo */}
          <div className="mb-8">
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
            <div className="text-center">
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gold-400 via-yellow-300 to-gold-400 bg-clip-text text-transparent mb-2">
                Premium Events Management
              </h1>
              <div className="flex items-center justify-center gap-2 text-white/70">
                <HiSparkles className="text-yellow-400" />
                <span className="text-sm">Luxury • Professional • Exclusive</span>
                <HiSparkles className="text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="mt-12">
            {/* Toggle Section */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-black/20 p-1 rounded-full flex">
                  <button
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      !isSignup 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                        : 'text-white/70 hover:text-white'
                    }`}
                    onClick={() => setIsSignup(false)}
                  >
                    <FaSignInAlt className="text-xs" />
                    Login
                  </button>
                  <button
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      isSignup 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                        : 'text-white/70 hover:text-white'
                    }`}
                    onClick={() => setIsSignup(true)}
                  >
                    <FaUserPlus className="text-xs" />
                    Sign Up
                  </button>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white text-center mb-2">
                {isSignup ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-white/60 text-center">
                {isSignup 
                  ? "Join our exclusive community" 
                  : "Sign in to your premium account"
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignup && (
                <div className="space-y-1">
                  <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                    <FaStar className="text-yellow-400 text-xs" />
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
              )}

              <div className="space-y-1">
                <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                  <FaStar className="text-yellow-400 text-xs" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/15 transition-all duration-300"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                  <FaShieldAlt className="text-yellow-400 text-xs" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
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

              {isSignup && (
                <>
                  <div className="space-y-1">
                    <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                      <FaShieldAlt className="text-yellow-400 text-xs" />
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/15 transition-all duration-300"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-white/80 text-sm font-medium">Department</label>
                      <input
                        type="text"
                        name="dept"
                        placeholder="Your department"
                        className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/15 transition-all duration-300"
                        value={formData.dept}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-white/80 text-sm font-medium">Phone Number</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Your phone number"
                        className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/15 transition-all duration-300"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:via-purple-800 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center gap-3"
                >
                  {isSignup ? (
                    <>
                      <FaUserPlus />
                      Create Premium Account
                    </>
                  ) : (
                    <>
                      <FaSignInAlt />
                      Access Dashboard
                    </>
                  )}
                </button>
                
                <div className="text-center mt-6">
                  <button
                    type="button"
                    className="text-white/70 hover:text-white transition-colors text-sm underline decoration-dotted underline-offset-4"
                    onClick={() => setIsSignup(!isSignup)}
                  >
                    {isSignup
                      ? "Already have an account? Sign in here"
                      : "New to our platform? Create account"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Panel - Visual */}
        <div className="hidden lg:block relative bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50"></div>
          <div className="relative h-full flex flex-col justify-center items-center p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/20">
                <FaCrown className="text-yellow-400" />
                <span className="text-white font-medium">Premium Experience</span>
              </div>
              <h3 className="text-4xl font-bold text-white mb-4">
                Luxury Event 
                <br />
                Management
              </h3>
              <p className="text-white/70 text-lg">
                Experience the finest in event coordination with our premium platform
              </p>
            </div>
            
            <div className="w-full max-w-md">
              <img 
                src={events} 
                alt="Premium Events" 
                className="w-full h-auto drop-shadow-2xl opacity-90 hover:opacity-100 transition-opacity duration-300" 
              />
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-md">
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
      </div>
    </div>
  );
}

export default Signup;


