// components/Account.jsx
import React, { useState } from 'react';
import { Camera, Edit2, X, Check } from 'lucide-react';

const Account = () => {
  const [formData, setFormData] = useState({
    fullName: 'Jane Doe Oghogho',
    location: 'Ogba, Lagos Nigeria',
    email: 'janedoe@gmail.com',
    phone: '+234 801 234 5678'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false);
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <div 
        className="rounded-lg p-6"
        style={{ backgroundColor: 'var(--color-white)' }}
      >
        {/* Profile Image Section */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            {/* Profile Image */}
            <div className="w-20 h-20 rounded-lg overflow-hidden">
              <img 
                src="/api/placeholder/80/80" 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button 
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center border-2"
              style={{ 
                backgroundColor: 'var(--color-white)', 
                borderColor: 'var(--color-offwhite)',
                color: 'var(--color-grey)'
              }}
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h3 
              className="text-lg font-semibold mb-1"
              style={{ color: 'var(--color-dark)' }}
            >
              Profile Picture
            </h3>
            <p 
              className="text-sm mb-2"
              style={{ color: 'var(--color-grey)' }}
            >
              Upload a new profile picture
            </p>
            <button 
              className="text-sm px-4 py-2 rounded-lg"
              style={{ 
                backgroundColor: 'var(--color-offwhite)',
                color: 'var(--color-primary)'
              }}
            >
              Change Photo
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--color-dark)' }}
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg outline-none transition-colors ${
                isEditing ? 'cursor-text' : 'cursor-default'
              }`}
              style={{ 
                backgroundColor: isEditing ? 'var(--color-white)' : 'var(--color-offwhite)',
                borderColor: isEditing ? 'var(--color-primary)' : 'var(--color-offwhite)',
                color: 'var(--color-dark)'
              }}
              autoFocus={isEditing}
            />
          </div>

          {/* Location */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--color-dark)' }}
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg outline-none transition-colors ${
                isEditing ? 'cursor-text' : 'cursor-default'
              }`}
              style={{ 
                backgroundColor: isEditing ? 'var(--color-white)' : 'var(--color-offwhite)',
                borderColor: isEditing ? 'var(--color-primary)' : 'var(--color-offwhite)',
                color: 'var(--color-dark)'
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--color-dark)' }}
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg outline-none transition-colors ${
                isEditing ? 'cursor-text' : 'cursor-default'
              }`}
              style={{ 
                backgroundColor: isEditing ? 'var(--color-white)' : 'var(--color-offwhite)',
                borderColor: isEditing ? 'var(--color-primary)' : 'var(--color-offwhite)',
                color: 'var(--color-dark)'
              }}
            />
          </div>

          {/* Phone */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--color-dark)' }}
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg outline-none transition-colors ${
                isEditing ? 'cursor-text' : 'cursor-default'
              }`}
              style={{ 
                backgroundColor: isEditing ? 'var(--color-white)' : 'var(--color-offwhite)',
                borderColor: isEditing ? 'var(--color-primary)' : 'var(--color-offwhite)',
                color: 'var(--color-dark)'
              }}
            />
          </div>
        </div>

        {/* Account Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div 
            className="p-4 rounded-lg"
            style={{ backgroundColor: 'var(--color-offwhite)' }}
          >
            <h4 
              className="font-medium mb-1"
              style={{ color: 'var(--color-dark)' }}
            >
              Member Since
            </h4>
            <p style={{ color: 'var(--color-grey)' }}>January 15, 2025</p>
          </div>
          <div 
            className="p-4 rounded-lg"
            style={{ backgroundColor: 'var(--color-offwhite)' }}
          >
            <h4 
              className="font-medium mb-1"
              style={{ color: 'var(--color-dark)' }}
            >
              Account Type
            </h4>
            <p style={{ color: 'var(--color-grey)' }}>Event Attendee</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8">
          {isEditing ? (
            <>
              <button 
                onClick={handleSave}
                className="px-6 py-3 rounded-lg font-medium"
                style={{ 
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-white)'
                }}
              >
                Save Changes
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 rounded-lg border font-medium"
                style={{ 
                  borderColor: 'var(--color-grey)',
                  color: 'var(--color-grey)'
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 rounded-lg font-medium flex items-center gap-2"
              style={{ 
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-white)'
              }}
            >
              <Edit2 className="w-4 h-4" />
              Edit Info
            </button>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 bg-opacity-50"
            onClick={closeSuccessModal}
          />
          
          {/* Modal */}
          <div 
            className="relative bg-white rounded-lg p-8 mx-4 max-w-md w-full text-center"
            style={{ backgroundColor: 'var(--color-white)' }}
          >
            {/* Close Button */}
            <button 
              onClick={closeSuccessModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
              style={{ color: 'var(--color-grey)' }}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success Icon */}
            <div 
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: '#22c55e' }}
            >
              <Check className="w-10 h-10 text-white" />
            </div>

            {/* Success Message */}
            <h3 
              className="text-xl font-semibold mb-2"
              style={{ color: 'var(--color-dark)' }}
            >
              Changes Saved
            </h3>
            <p 
              className="text-sm"
              style={{ color: 'var(--color-grey)' }}
            >
              Your profile information has been updated successfully!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Account;