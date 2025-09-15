import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function VerificationSuccess() {
    const navigate = useNavigate();
  const handleContinue = () => {
    navigate('/sign-in')
    console.log('Continue clicked');
    // Handle navigation to next screen
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Main Container */}
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mx-auto relative">
              {/* Success Checkmark */}
              <Check className="w-16 h-16 text-white stroke-[3]" />
              
              {/* Optional: Add a subtle animation effect */}
              <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-25"></div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            You're All Set!
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 px-4">
            Your email has been successfully verified. You can now access your account.
          </p>

          {/* Continue Button */}
          <button 
            onClick={handleContinue}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-4 px-6 rounded-2xl transition-colors duration-200 active:scale-95 transform"
          >
            Continue
          </button>
        </div>

        {/* Optional: Additional message */}
        <p className="text-center text-gray-500 text-xs mt-6 px-4">
          Welcome to the platform! Let's get started with exploring events.
        </p>
      </div>
    </div>
  );
}

export default VerificationSuccess;