// components/Preference.jsx
import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

const Preference = () => {
  const [eventCategories, setEventCategories] = useState({
    music: true,
    tech: false,
    arts: false,
    sports: false,
    fashion: false,
    education: true,
    food: false,
    travel: true,
    business: false,
    culture: false,
    nightlife: true,
    spirituality: false,
    comedy: true,
    gaming: false
  });

  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false
  });

  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const handleCategoryToggle = (category) => {
    setEventCategories({
      ...eventCategories,
      [category]: !eventCategories[category]
    });
  };

  const handleNotificationToggle = (setting) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [setting]: !notificationPreferences[setting]
    });
  };

  const handleSavePreferences = () => {
    // Handle save preferences logic here
    setShowSuccessNotification(true);
    
    // Auto-hide success notification after 5 seconds
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 5000);
  };

  const CustomCheckbox = ({ checked, onChange, label }) => (
    <div className="flex items-center gap-3 py-2">
      <button
        onClick={onChange}
        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
          checked ? 'border-primary bg-primary' : 'border-gray-300 bg-white'
        }`}
        style={{
          borderColor: checked ? 'var(--color-primary)' : '#d1d5db',
          backgroundColor: checked ? 'var(--color-primary)' : 'var(--color-white)'
        }}
      >
        {checked && <Check className="w-3 h-3 text-white" />}
      </button>
      <span 
        className="text-sm"
        style={{ color: 'var(--color-dark)' }}
      >
        {label}
      </span>
    </div>
  );

  const categoryLabels = {
    music: 'Music',
    tech: 'Tech',
    arts: 'Arts',
    sports: 'Sports',
    fashion: 'Fashion',
    education: 'Education',
    food: 'Food',
    travel: 'Travel',
    business: 'Business',
    culture: 'Culture',
    nightlife: 'Nightlife',
    spirituality: 'Spirituality',
    comedy: 'Comedy',
    gaming: 'Gaming'
  };

  return (
    <>
      {/* Preferences Success Notification */}
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
              Preferences Saved
            </h4>
            <p 
              className="text-xs"
              style={{ color: 'var(--color-grey)' }}
            >
              Your event preferences have been updated. We'll now show you events that match your interests.
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
        {/* Event Preferences Section */}
        <div className="mb-8">
          <h3 
            className="text-lg font-semibold mb-2"
            style={{ color: 'var(--color-dark)' }}
          >
            Event Preferences
          </h3>
          <p 
            className="text-sm mb-6"
            style={{ color: 'var(--color-grey)' }}
          >
            Customize your event preferences to get better recommendations.
          </p>

          <div className="mb-6">
            <h4 
              className="text-base font-medium mb-4"
              style={{ color: 'var(--color-dark)' }}
            >
              Preferred Event Categories
            </h4>
            
            {/* Categories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.entries(categoryLabels).map(([key, label]) => (
                <CustomCheckbox
                  key={key}
                  checked={eventCategories[key]}
                  onChange={() => handleCategoryToggle(key)}
                  label={label}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Email Address Section */}
        <div className="mb-8">
          <h4 
            className="text-base font-medium mb-4"
            style={{ color: 'var(--color-dark)' }}
          >
            Email Address
          </h4>
          
          <div className="space-y-3">
            <CustomCheckbox
              checked={notificationPreferences.emailNotifications}
              onChange={() => handleNotificationToggle('emailNotifications')}
              label="Email Notifications"
            />
            
            <CustomCheckbox
              checked={notificationPreferences.pushNotifications}
              onChange={() => handleNotificationToggle('pushNotifications')}
              label="Push Notifications"
            />
          </div>
        </div>

        {/* Save Button */}
        <button 
          onClick={handleSavePreferences}
          className="px-6 py-3 rounded-lg font-medium"
          style={{ 
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-white)'
          }}
        >
          Save Preferences
        </button>
      </div>
    </>
  );
};

export default Preference;