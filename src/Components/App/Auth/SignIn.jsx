import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { publicRequest } from "../../../requestMethod";
import { loginStart,loginFailure, loginSuccess } from "../../../Redux/LoginSlice";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get loading state from Redux
  const { isFetching } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Dispatch login start to set loading state
    dispatch(loginStart());

    try {
      const response = await publicRequest.post("/auth/login", {
        email: email.trim(),
        password: password,
      });

      // Get user data from API response
      const userData = response.data;
      
      // Dispatch login success to store user data in Redux
      dispatch(loginSuccess(userData));
      
      // Show success message
      toast.success("Sign in successful!");
      
      // Navigate to Home page
      navigate("/home");
      
    } catch (error) {
      console.error("Sign in error:", error);
      
      // Dispatch login failure
      dispatch(loginFailure());
      
      // Handle different error scenarios
      if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else if (error.response?.status === 400) {
        toast.error(error.response?.data?.message || "Invalid credentials");
      } else if (error.response?.status >= 500) {
        toast.error("Server error. Please try again later.");
      } else if (error.code === "NETWORK_ERROR" || !error.response) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Sign in failed. Please try again.");
      }
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Sign in with ${provider}`);
    toast.info("Social login coming soon!");
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-8 left-8 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        disabled={isFetching}
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      {/* Centered Sign In Form */}
      <div className="w-full max-w-md">
        {/* Welcome Text */}
        <div className="mb-4 text-center flex flex-col items-center justify-center">
          <img src="/assets/logo.png" alt="" className="mb-8"/>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Jump back in and pick up where you left off.
          </p>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="janedoe@gmail.com"
              disabled={isFetching}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all pr-12"
                placeholder="8+ characters"
                disabled={isFetching}
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isFetching}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button 
              type="button"
              onClick={handleForgotPassword}
              className="text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors disabled:opacity-50"
              disabled={isFetching}
            >
              Forgot Password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={isFetching}
          >
            {isFetching ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                Signing In...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gray-50 text-gray-500">OR</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="flex items-center justify-center gap-4">
          <p className="text-center text-gray-600 mb-0">Sign in using</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleSocialLogin("google")}
              className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
              disabled={isFetching}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center pt-6">
          <span className="text-gray-600">Don't have an account? </span>
          <button
            onClick={handleSignUp}
            className="text-purple-600 hover:text-purple-800 font-semibold transition-colors disabled:opacity-50"
            disabled={isFetching}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;