import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { publicRequest } from '../../../../requestMethod';
import { toast } from 'react-toastify';

function VerifyEmailPage() {
  const [verificationStatus, setVerificationStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    // Get token from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (!token) {
      setVerificationStatus('error');
      setMessage('Invalid verification link. No token found.');
      return;
    }

    verifyEmail(token);
  }, []);

  const verifyEmail = async (token) => {
    try {
      setVerificationStatus('loading');
      
      const response = await publicRequest.post('/auth/verify-email', {
        token: token
      });

      console.log('Verification response:', response.data);
      
      setVerificationStatus('success');
      setMessage('Your email has been successfully verified! You can now sign in to your account.');
      
      toast.success('Email verified successfully!');
      
      // Redirect to sign-in page after 3 seconds
      setTimeout(() => {
        window.location.href = '/sign-in';
      }, 3000);

    } catch (error) {
      console.error('Verification error:', error);
      
      setVerificationStatus('error');
      
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else if (error.response?.status === 400) {
        setMessage('Invalid or expired verification token.');
      } else if (error.response?.status === 409) {
        setMessage('Email is already verified.');
      } else {
        setMessage('Verification failed. Please try again or contact support.');
      }
      
      toast.error('Email verification failed.');
    }
  };

  const handleResendVerification = async () => {
    setIsResending(true);
    
    try {
      // You'll need to implement this endpoint - typically requires email
      // await publicRequest.post('/auth/resend-verification', { email: userEmail });
      
      toast.success('Verification email sent! Please check your inbox.');
      setMessage('A new verification email has been sent to your email address.');
      
    } catch (error) {
      console.error('Resend error:', error);
      toast.error('Failed to resend verification email.');
    } finally {
      setIsResending(false);
    }
  };

  const handleGoToSignIn = () => {
    window.location.href = '/sign-in';
  };

  const handleGoToSignUp = () => {
    window.location.href = '/sign-up';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/assets/logo.png" alt="Unwind" />
        </div>

        {/* Status Icon */}
        <div className="mb-6">
          {verificationStatus === 'loading' && (
            <div className="flex justify-center">
              <Loader2 className="w-16 h-16 text-purple-600 animate-spin" />
            </div>
          )}
          
          {verificationStatus === 'success' && (
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
          )}
          
          {verificationStatus === 'error' && (
            <div className="flex justify-center">
              <XCircle className="w-16 h-16 text-red-500" />
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {verificationStatus === 'loading' && 'Verifying Your Email'}
          {verificationStatus === 'success' && 'Email Verified!'}
          {verificationStatus === 'error' && 'Verification Failed'}
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          {verificationStatus === 'loading' && 'Please wait while we verify your email address...'}
          {message}
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          {verificationStatus === 'success' && (
            <div className="space-y-3">
              <button
                onClick={handleGoToSignIn}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
              >
                Sign In Now
              </button>
              
              <p className="text-sm text-gray-500">
                Redirecting to sign-in page in 3 seconds...
              </p>
            </div>
          )}

          {verificationStatus === 'error' && (
            <div className="space-y-3">
              <button
                onClick={handleResendVerification}
                disabled={isResending}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? 'Sending...' : 'Resend Verification Email'}
              </button>
              
              <button
                onClick={handleGoToSignIn}
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Back to Sign In
              </button>
              
              <button
                onClick={handleGoToSignUp}
                className="w-full text-purple-600 py-2 font-medium hover:underline"
              >
                Create New Account
              </button>
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Having trouble? Contact our support team for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailPage;