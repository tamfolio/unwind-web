// components/DeleteAccountModal.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';

const DeleteAccountModal = ({ isOpen, onClose, onConfirm }) => {
  const [showDeletedScreen, setShowDeletedScreen] = useState(false);

  if (!isOpen) return null;

  const handleDeleteConfirm = () => {
    // Call the original onConfirm function
    onConfirm();
    // Show the deleted confirmation screen
    setShowDeletedScreen(true);
  };

  const handleReturnHome = () => {
    // Navigate to homepage
    window.location.href = '/';
  };

  const handleCreateAccount = () => {
    // Navigate to signup page
    window.location.href = '/signup';
  };

  const handleClose = () => {
    setShowDeletedScreen(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80"
        onClick={!showDeletedScreen ? handleClose : undefined}
      />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-lg p-8 mx-4 max-w-md w-full text-center"
        style={{ backgroundColor: 'var(--color-white)' }}
      >
        {!showDeletedScreen ? (
          <>
            {/* Delete Confirmation Screen */}
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
              style={{ color: 'var(--color-grey)' }}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <h3 
              className="text-xl font-semibold mb-4"
              style={{ color: 'var(--color-dark)' }}
            >
              We'll Be Sad to See You Go 😢
            </h3>

            {/* Description */}
            <p 
              className="text-sm mb-8"
              style={{ color: 'var(--color-grey)' }}
            >
              Deleting your account will permanently remove your profile, tickets, and event history. If you're sure, we'll respect your choice - but we'd love to have you stay.
            </p>

            {/* Sad Illustration */}
            <div className="mb-8">
              <div className="relative mx-auto w-32 h-32">
                {/* Sun */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 rounded-full border-2 border-gray-300 relative">
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-gray-300"></div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-gray-300"></div>
                    <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-2 h-1 bg-gray-300"></div>
                    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-2 h-1 bg-gray-300"></div>
                  </div>
                </div>
                
                {/* Clouds */}
                <div className="absolute top-4 left-2">
                  <div className="flex">
                    <div className="w-4 h-3 bg-gray-200 rounded-full"></div>
                    <div className="w-3 h-2 bg-gray-200 rounded-full -ml-1"></div>
                  </div>
                </div>
                <div className="absolute top-6 right-4">
                  <div className="flex">
                    <div className="w-3 h-2 bg-gray-200 rounded-full"></div>
                    <div className="w-4 h-3 bg-gray-200 rounded-full -ml-1"></div>
                  </div>
                </div>
                
                {/* Main sad face circle */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center relative"
                    style={{ backgroundColor: '#e5e7eb' }}
                  >
                    {/* Thermometer */}
                    <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-1 h-8 bg-gray-400 rounded-full relative">
                        <div className="absolute bottom-0 w-2 h-2 bg-gray-400 rounded-full -left-0.5"></div>
                      </div>
                    </div>
                    
                    {/* Sad face */}
                    <div className="text-2xl">😢</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={handleDeleteConfirm}
                className="flex-1 px-4 py-3 rounded-lg border font-medium"
                style={{ 
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)'
                }}
              >
                Delete Account
              </button>
              <button 
                onClick={handleClose}
                className="flex-1 px-4 py-3 rounded-lg font-medium"
                style={{ 
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-white)'
                }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Account Deleted Confirmation Screen */}
            {/* Sad Illustration */}
            <div className="mb-8">
              <div className="relative mx-auto w-32 h-32">
                {/* Sun */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 rounded-full border-2 border-gray-300 relative">
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-gray-300"></div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-gray-300"></div>
                    <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-2 h-1 bg-gray-300"></div>
                    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-2 h-1 bg-gray-300"></div>
                  </div>
                </div>
                
                {/* Clouds */}
                <div className="absolute top-4 left-2">
                  <div className="flex">
                    <div className="w-4 h-3 bg-gray-200 rounded-full"></div>
                    <div className="w-3 h-2 bg-gray-200 rounded-full -ml-1"></div>
                  </div>
                </div>
                <div className="absolute top-6 right-4">
                  <div className="flex">
                    <div className="w-3 h-2 bg-gray-200 rounded-full"></div>
                    <div className="w-4 h-3 bg-gray-200 rounded-full -ml-1"></div>
                  </div>
                </div>
                
                {/* Main sad face circle */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center relative"
                    style={{ backgroundColor: '#e5e7eb' }}
                  >
                    {/* Thermometer */}
                    <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-1 h-8 bg-gray-400 rounded-full relative">
                        <div className="absolute bottom-0 w-2 h-2 bg-gray-400 rounded-full -left-0.5"></div>
                      </div>
                    </div>
                    
                    {/* Sad face */}
                    <div className="text-2xl">😢</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 
              className="text-2xl font-bold mb-4"
              style={{ color: 'var(--color-dark)' }}
            >
              Your Account Has Been Deleted
            </h1>

            {/* Description */}
            <p 
              className="text-sm mb-8 leading-relaxed"
              style={{ color: 'var(--color-grey)' }}
            >
              Your account and all associated data have been permanently removed. We're sorry to see you go, and we hope to welcome you back in the future.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={handleReturnHome}
                className="flex-1 px-6 py-3 rounded-lg border font-medium"
                style={{ 
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)'
                }}
              >
                Return to Homepage
              </button>
              <button 
                onClick={handleCreateAccount}
                className="flex-1 px-6 py-3 rounded-lg font-medium"
                style={{ 
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-white)'
                }}
              >
                Create New Account
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteAccountModal;