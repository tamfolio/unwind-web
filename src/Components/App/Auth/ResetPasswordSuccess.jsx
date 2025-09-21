import React from "react";
import { useNavigate } from "react-router-dom";

function ResetPasswordSuccess() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 md:px-6">
      <div className="w-full max-w-md md:max-w-2xl">
        {/* Container */}
        <div className="bg-white rounded-2xl shadow-lg md:shadow-xl p-6 md:p-12 flex flex-col items-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6 md:mb-8">
              <img src="/assets/Success (1).png" alt="" className="w-[300px] h-[300px]"/>
          </div>

          {/* Success Content */}
          <div className="text-center mb-6 w-full max-w-sm">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              You're Good to Go
            </h1>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Password reset complete. You can now Sign in to your account.
            </p>
          </div>

          {/* Sign In Button */}
          <div className="w-full max-w-sm">
            <button
              onClick={handleSignIn}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 touch-manipulation text-base"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordSuccess;
