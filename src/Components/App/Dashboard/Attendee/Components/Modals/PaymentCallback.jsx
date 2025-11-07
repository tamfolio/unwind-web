import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useVerifyPayment } from '@hooks/useEvents';
import { Loader, CheckCircle, XCircle } from 'lucide-react';

function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'failed'
  
  // Get access token
  const currentUser = useSelector((state) => state.user?.currentUser);
  const access_token = currentUser?.access_token || localStorage.getItem('access_token');

  // Get reference from URL parameters
  const reference = searchParams.get('reference') || searchParams.get('trxref');

  // Verify payment mutation
  const verifyPaymentMutation = useVerifyPayment({
    onSuccess: (response) => {
      console.log('✅ Payment verified successfully:', response);
      setStatus('success');
      
      // Redirect to tickets page after 3 seconds
      setTimeout(() => {
        navigate('/dashboard/my-tickets', { replace: true });
      }, 3000);
    },
    onError: (error) => {
      console.error('❌ Payment verification failed:', error);
      setStatus('failed');
    }
  });

  useEffect(() => {
    if (reference && access_token) {
      console.log('🔗 Payment callback - verifying reference:', reference);
      verifyPaymentMutation.mutate({ reference, accessToken: access_token });
    } else {
      console.error('❌ Missing reference or access token');
      setStatus('failed');
    }
  }, [reference, access_token]);

  const handleRetry = () => {
    if (reference && access_token) {
      setStatus('verifying');
      verifyPaymentMutation.mutate({ reference, accessToken: access_token });
    }
  };

  const handleGoToTickets = () => {
    navigate('/dashboard/my-tickets', { replace: true });
  };

  const handleGoHome = () => {
    navigate('/dashboard', { replace: true });
  };

  // Show different states based on verification status
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {status === 'verifying' && (
          <>
            <Loader className="w-16 h-16 animate-spin text-purple-600 mx-auto mb-6" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Verifying Payment
            </h2>
            <p className="text-gray-600 mb-4">
              Please wait while we confirm your payment...
            </p>
            <div className="text-sm text-gray-500">
              Reference: {reference}
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-6">
              Your ticket purchase has been confirmed. You will be redirected to your tickets page shortly.
            </p>
            <button
              onClick={handleGoToTickets}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors mb-3"
            >
              View My Tickets
            </button>
            <button
              onClick={handleGoHome}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Go to Dashboard
            </button>
          </>
        )}

        {status === 'failed' && (
          <>
            <XCircle className="w-16 h-16 text-red-600 mx-auto mb-6" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Payment Verification Failed
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn't verify your payment. This might be due to a network issue or the payment was cancelled.
            </p>
            <button
              onClick={handleRetry}
              disabled={verifyPaymentMutation.isLoading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors mb-3 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {verifyPaymentMutation.isLoading ? 'Retrying...' : 'Retry Verification'}
            </button>
            <button
              onClick={handleGoHome}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Go to Dashboard
            </button>
            
            {reference && (
              <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
                <p className="text-gray-600">Reference: {reference}</p>
                <p className="text-gray-500 text-xs mt-1">
                  If you believe this is an error, please contact support with this reference number.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentCallback;