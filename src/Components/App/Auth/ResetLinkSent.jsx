import { MoveLeft } from "lucide-react";
import React from "react";

function ResetLinkSent({ email, onBack, onResendEmail }) {
  const maskEmail = (email) => {
    const [localPart, domain] = email.split('@');
    const maskedLocal = localPart.substring(0, 4) + '****';
    return `${maskedLocal}@${domain}`;
  };

  const handleResend = async () => {
    // Call the resend function passed from parent
    if (onResendEmail) {
      await onResendEmail();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Back Button */}
      <div className="p-4 md:p-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors touch-manipulation"
        >
          <MoveLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-md md:max-w-2xl">
          {/* Container */}
          <div className="bg-white rounded-2xl shadow-lg md:shadow-xl p-6 md:p-12 flex flex-col items-center">
            
            {/* Illustration */}
            <div className="flex justify-center mb-6 md:mb-8">
              <img src="/assets/reset-animation.png" alt="" className="max-w-full h-auto" />
            </div>

            {/* Success Content */}
            <div className="text-center mb-6 w-full max-w-sm">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Reset Link Sent</h1>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-2">
                A secure link has been emailed to <span className="font-medium">{maskEmail(email)}</span>.
              </p>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Follow the instructions to reset your password.
              </p>
            </div>

            {/* Resend Button */}
            <div className="w-full max-w-sm">
              <button
                onClick={handleResend}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 touch-manipulation text-base"
              >
                Resend Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetLinkSent;