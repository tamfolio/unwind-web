import { MoveLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { publicRequest } from "../../../requestMethod";

function InitiateReset({ onEmailSent }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setMessage("");
    
    try {
      const response = await publicRequest.post("/auth/forgot-password", {
        email: email.trim(),
      });

      // Success response
      toast.success("Password reset link sent successfully!");
      
      // Call the parent callback to move to next step
      if (onEmailSent) {
        onEmailSent(email.trim());
      }
      
    } catch (error) {
      console.error("Forgot password error:", error);
      
      // Handle different error scenarios
      if (error.response?.status === 404) {
        setMessage("No account found with this email address.");
        toast.error("No account found with this email address");
      } else if (error.response?.status === 400) {
        const errorMessage = error.response?.data?.message || "Invalid email address";
        setMessage(errorMessage);
        toast.error(errorMessage);
      } else if (error.response?.status === 429) {
        setMessage("Too many requests. Please try again later.");
        toast.error("Too many requests. Please try again later.");
      } else if (error.response?.status >= 500) {
        setMessage("Server error. Please try again later.");
        toast.error("Server error. Please try again later.");
      } else if (error.code === "NETWORK_ERROR" || !error.response) {
        setMessage("Network error. Please check your connection.");
        toast.error("Network error. Please check your connection.");
      } else {
        setMessage("Something went wrong. Please try again.");
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/signin"); // Navigate back to sign in page
  };

  const handleSignInClick = () => {
    navigate("/signin"); // Navigate to sign in page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Back Button - Mobile optimized */}
      <div className="p-4 md:p-6">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors touch-manipulation disabled:opacity-50"
          disabled={isLoading}
        >
          <MoveLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-md md:max-w-2xl">
          {/* Container with mobile-first design */}
          <div className="bg-white rounded-2xl shadow-lg md:shadow-xl p-6 md:p-12 flex flex-col items-center">
            
            {/* Illustration */}
            <div className="flex justify-center mb-6 md:mb-8">
              <img src="/assets/reset-animation.png" alt="" className="max-w-full h-auto" />
            </div>

            {/* Form Content - Mobile optimized typography */}
            <div className="text-center mb-6 w-full max-w-sm">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Need a Reset?</h1>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Enter the email address linked to your account and we'll send you a link to reset your password.
              </p>
            </div>

            {message && (
              <div className={`mb-4 p-3 rounded-lg text-sm w-full max-w-sm ${
                message.includes('sent') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            {/* Form - Mobile optimized */}
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 w-full max-w-sm">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="janedoe@gmail.com"
                  className="w-full px-4 py-3 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors text-base"
                  style={{ fontSize: '16px' }} // Prevents zoom on iOS
                  disabled={isLoading}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center touch-manipulation text-base"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  'Proceed'
                )}
              </button>
            </form>

            {/* Footer - Mobile optimized */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <button 
                  onClick={handleSignInClick}
                  className="text-purple-600 hover:text-purple-700 font-medium touch-manipulation disabled:opacity-50"
                  disabled={isLoading}
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InitiateReset;