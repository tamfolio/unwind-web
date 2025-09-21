import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { publicRequest } from "../../../requestMethod"; // Update this path

function ResetPasswordForm({ onResetSuccess }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Get token from URL parameters
    const urlToken = searchParams.get('token');
    if (!urlToken) {
      toast.error("Invalid reset link. Please request a new password reset.");
      navigate('/forgot-password');
      return;
    }
    setToken(urlToken);
  }, [searchParams, navigate]);

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await publicRequest.post("/auth/reset-password", {
        token: token,
        password: password,
      });

      // Success - show success screen
      if (onResetSuccess) {
        onResetSuccess();
      }
      
    } catch (error) {
      console.error("Reset password error:", error);
      
      // Handle different error scenarios
      if (error.response?.status === 400) {
        const errorMessage = error.response?.data?.message || "Invalid or expired reset token";
        toast.error(errorMessage);
      } else if (error.response?.status === 404) {
        toast.error("Invalid reset link. Please request a new password reset.");
      } else if (error.response?.status === 422) {
        toast.error("Password does not meet requirements");
      } else if (error.response?.status >= 500) {
        toast.error("Server error. Please try again later.");
      } else if (error.code === "NETWORK_ERROR" || !error.response) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Failed to reset password. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 md:px-6">
      <div className="w-full max-w-md md:max-w-2xl">
        {/* Container */}
        <div className="bg-white rounded-2xl shadow-lg md:shadow-xl p-6 md:p-12 flex flex-col items-center">
          
          {/* Form Content */}
          <div className="text-center mb-6 w-full max-w-sm">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Set Your New Password</h1>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Let's get you back in — enter a new password below to reset your access and return to the experiences you love.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 w-full max-w-sm">
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="8+ characters"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors text-base pr-12"
                  style={{ fontSize: '16px' }} // Prevents zoom on iOS
                  disabled={isLoading}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors text-base pr-12"
                  style={{ fontSize: '16px' }} // Prevents zoom on iOS
                  disabled={isLoading}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !password || !confirmPassword}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center touch-manipulation text-base"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;