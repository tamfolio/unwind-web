import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function VerifyEmail({setCurrentStep}) {
  const [email, setEmail] = useState("jane***@gmail.com");
  const navigate = useNavigate();

  const handleChangeEmail = () => {
    // Handle change email logic
    navigate('/verification-successful')
    console.log("Change email clicked");
  };

  const handleResendEmail = () => {
    // Handle resend email logic
    console.log("Resend email clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Main Container */}
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          {/* Email Illustration */}
          <div className="flex items-center justify-center">
            <img src="/assets/Email.png" alt="" />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Verify Your Email
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-8 px-4">
            We've sent a verification link to{" "}
            <span className="font-medium">{email}</span>. Click the link to
            activate your account and start exploring events.
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 sm:gap-4">
            {/* Change Email Button - Secondary */}
            <button 
              onClick={handleChangeEmail}
              className="flex-1 bg-transparent hover:bg-purple-50 text-purple-600 font-medium py-4 px-6 rounded-2xl border border-purple-500 hover:border-purple-300 transition-all duration-200 active:scale-95 transform"
            >
              Continue
            </button>

            {/* Resend Email Button - Primary */}
            <button 
              onClick={handleResendEmail}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-4 px-6 rounded-2xl transition-colors duration-200 active:scale-95 transform"
            >
              Resend Email
            </button>
          </div>
        </div>

        {/* Additional Info Text */}
        <p className="text-center text-gray-500 text-xs mt-6 px-4">
          Didn't receive the email? Check your spam folder or try resending.
        </p>
      </div>
    </div>
  );
}

export default VerifyEmail;
