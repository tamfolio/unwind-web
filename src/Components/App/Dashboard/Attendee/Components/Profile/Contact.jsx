// components/Contact.jsx
import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

const Contact = () => {
  const [emailData, setEmailData] = useState({
    email: 'janedoe@gmail.com'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    eventReminders: true,
    ticketConfirmations: true,
    newsletter: false
  });

  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const handleEmailChange = (e) => {
    setEmailData({
      email: e.target.value
    });
  };

  const handleNotificationToggle = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };

  const handleVerifyEmail = () => {
    // Handle email verification logic here
    console.log('Verify email:', emailData.email);
  };

  const handleSaveEmailSettings = () => {
    // Handle save email settings logic here
    setShowSuccessNotification(true);
    
    // Auto-hide success notification after 5 seconds
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 5000);
  };

  const CustomToggle = ({ enabled, onChange, label }) => (
    <div className="flex items-center justify-between py-3">
      <span 
        className="text-sm"
        style={{ color: 'var(--color-dark)' }}
      >
        {label}
      </span>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-primary' : 'bg-gray-300'
        }`}
        style={{ 
          backgroundColor: enabled ? 'var(--color-primary)' : '#d1d5db' 
        }}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <>
      {/* Email Settings Success Notification */}
      {showSuccessNotification && (
        <div 
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg max-w-sm"
          style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--color-offwhite)' }}
        >
          <div 
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#22c55e' }}
          >
            <Check className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h4 
              className="font-medium text-sm"
              style={{ color: 'var(--color-dark)' }}
            >
              Email Settings Updated
            </h4>
            <p 
              className="text-xs"
              style={{ color: 'var(--color-grey)' }}
            >
              Your email preferences have been saved successfully. You're all set!
            </p>
          </div>
          <button 
            onClick={() => setShowSuccessNotification(false)}
            className="ml-2"
            style={{ color: 'var(--color-grey)' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div 
        className="rounded-lg p-6"
        style={{ backgroundColor: 'var(--color-white)' }}
      >
        {/* Email Address Section */}
        <div className="mb-8">
          <h3 
            className="text-lg font-semibold mb-2"
            style={{ color: 'var(--color-dark)' }}
          >
            Email Address
          </h3>
          <p 
            className="text-sm mb-6"
            style={{ color: 'var(--color-grey)' }}
          >
            Manage your email address.
          </p>

          <div className="mb-4">
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--color-dark)' }}
            >
              Email Address
            </label>
            <div className="flex gap-3">
              <input
                type="email"
                value={emailData.email}
                onChange={handleEmailChange}
                className="flex-1 px-4 py-3 border rounded-lg outline-none transition-colors"
                style={{ 
                  backgroundColor: 'var(--color-white)',
                  borderColor: 'var(--color-offwhite)',
                  color: 'var(--color-dark)'
                }}
              />
              <button 
                onClick={handleVerifyEmail}
                className="px-4 py-3 rounded-lg border font-medium"
                style={{ 
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)'
                }}
              >
                Verify
              </button>
            </div>
            <p 
              className="text-xs mt-2"
              style={{ color: 'var(--color-grey)' }}
            >
              This email is verified and used for notifications.
            </p>
          </div>
        </div>

        {/* Notification Emails Section */}
        <div>
          <h3 
            className="text-lg font-semibold mb-2"
            style={{ color: 'var(--color-dark)' }}
          >
            Notification Emails
          </h3>
          <p 
            className="text-sm mb-6"
            style={{ color: 'var(--color-grey)' }}
          >
            Choose which emails you want to receive.
          </p>

          <div className="space-y-2">
            <CustomToggle
              enabled={notificationSettings.eventReminders}
              onChange={() => handleNotificationToggle('eventReminders')}
              label="Event reminders"
            />
            
            <CustomToggle
              enabled={notificationSettings.ticketConfirmations}
              onChange={() => handleNotificationToggle('ticketConfirmations')}
              label="Ticket confirmations"
            />
            
            <CustomToggle
              enabled={notificationSettings.newsletter}
              onChange={() => handleNotificationToggle('newsletter')}
              label="Newsletter"
            />
          </div>

          <button 
            onClick={handleSaveEmailSettings}
            className="mt-6 px-6 py-3 rounded-lg font-medium"
            style={{ 
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-white)'
            }}
          >
            Save Email Settings
          </button>
        </div>
      </div>
    </>
  );
};

export default Contact;