// components/LogoutModal.jsx
import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const handleLogout = () => {
    // Call the original onConfirm function for any cleanup
    onConfirm();
    // Redirect to homepage
    window.location.href = '/';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-lg p-6 mx-4 max-w-md w-full"
        style={{ backgroundColor: 'var(--color-white)' }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
          style={{ color: 'var(--color-grey)' }}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="flex items-start gap-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-orange-500 mt-1" />
          <div>
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ color: 'var(--color-dark)' }}
            >
              Are You Sure You Want to Log Out?
            </h3>
            <p 
              className="text-sm"
              style={{ color: 'var(--color-grey)' }}
            >
              You'll be signed out of your account on this device and will need to log in again to continue.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg border font-medium"
            style={{ 
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)'
            }}
          >
            Cancel
          </button>
          <button 
            onClick={handleLogout}
            className="flex-1 px-4 py-2 rounded-lg font-medium"
            style={{ 
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-white)'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;