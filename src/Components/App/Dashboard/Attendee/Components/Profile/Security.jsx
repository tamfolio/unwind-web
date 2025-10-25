// components/Security.jsx
import React, { useState } from 'react';
import { Eye, EyeOff, X, Check, LogOut, AlertTriangle } from 'lucide-react';

const Security = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false);
  const [deviceToLogout, setDeviceToLogout] = useState(null);

  const [sessions, setSessions] = useState([
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'Lagos, Nigeria',
      isCurrent: true,
      lastActive: 'Started May 14, 2025'
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'Lagos, Nigeria',
      isCurrent: false,
      lastActive: 'Last active May 14, 2025'
    }
  ]);

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field]
    });
  };

  const handleChangePassword = () => {
    setShowSuccessModal(true);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleLogoutDevice = (session) => {
    setDeviceToLogout(session);
    setShowLogoutModal(true);
  };

  const confirmLogoutDevice = () => {
    // Remove the device from sessions
    setSessions(sessions.filter(session => session.id !== deviceToLogout.id));
    setShowLogoutModal(false);
    setShowLogoutSuccess(true);
    setDeviceToLogout(null);
    
    // Auto-hide success notification after 5 seconds
    setTimeout(() => {
      setShowLogoutSuccess(false);
    }, 5000);
  };

  const handleLogoutAllDevices = () => {
    // Keep only current session
    setSessions(sessions.filter(session => session.isCurrent));
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
    setDeviceToLogout(null);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Logout Success Notification */}
        {showLogoutSuccess && (
          <div 
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg"
            style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--color-offwhite)' }}
          >
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#22c55e' }}
            >
              <Check className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 
                className="font-medium text-sm"
                style={{ color: 'var(--color-dark)' }}
              >
                Logged Out Successfully
              </h4>
              <p 
                className="text-xs"
                style={{ color: 'var(--color-grey)' }}
              >
                You've successfully logged out of your account on {deviceToLogout?.device}. That device will need to sign in again to regain access.
              </p>
            </div>
            <button 
              onClick={() => setShowLogoutSuccess(false)}
              className="ml-auto"
              style={{ color: 'var(--color-grey)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Password Section */}
        <div 
          className="rounded-lg p-6"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h3 
            className="text-lg font-semibold mb-2"
            style={{ color: 'var(--color-dark)' }}
          >
            Password
          </h3>
          <p 
            className="text-sm mb-6"
            style={{ color: 'var(--color-grey)' }}
          >
            Change your password.
          </p>

          <div className="space-y-4">
            {/* Current Password */}
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--color-dark)' }}
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 pr-12 border rounded-lg outline-none transition-colors"
                  style={{ 
                    backgroundColor: 'var(--color-white)',
                    borderColor: 'var(--color-offwhite)',
                    color: 'var(--color-dark)'
                  }}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: 'var(--color-grey)' }}
                >
                  {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--color-dark)' }}
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 pr-12 border rounded-lg outline-none transition-colors"
                  style={{ 
                    backgroundColor: 'var(--color-white)',
                    borderColor: 'var(--color-offwhite)',
                    color: 'var(--color-dark)'
                  }}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: 'var(--color-grey)' }}
                >
                  {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--color-dark)' }}
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 pr-12 border rounded-lg outline-none transition-colors"
                  style={{ 
                    backgroundColor: 'var(--color-white)',
                    borderColor: 'var(--color-offwhite)',
                    color: 'var(--color-dark)'
                  }}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: 'var(--color-grey)' }}
                >
                  {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={handleChangePassword}
            className="mt-6 px-6 py-3 rounded-lg font-medium"
            style={{ 
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-white)'
            }}
          >
            Change Password
          </button>
        </div>

        {/* Login Sessions Section */}
        <div 
          className="rounded-lg p-6"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <h3 
            className="text-lg font-semibold mb-2"
            style={{ color: 'var(--color-dark)' }}
          >
            Login Sessions
          </h3>
          <p 
            className="text-sm mb-6"
            style={{ color: 'var(--color-grey)' }}
          >
            Manage your active sessions and devices.
          </p>

          <div className="space-y-4">
            {sessions.map((session) => (
              <div 
                key={session.id}
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ backgroundColor: 'var(--color-offwhite)' }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 
                      className="font-medium"
                      style={{ color: 'var(--color-dark)' }}
                    >
                      {session.device}
                    </h4>
                    {session.isCurrent && (
                      <span 
                        className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{ 
                          backgroundColor: 'var(--color-primary)',
                          color: 'var(--color-white)'
                        }}
                      >
                        Current
                      </span>
                    )}
                  </div>
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--color-grey)' }}
                  >
                    Mobile • {session.location}
                  </p>
                  <p 
                    className="text-xs mt-1"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    {session.lastActive}
                  </p>
                </div>

                {!session.isCurrent && (
                  <button 
                    onClick={() => handleLogoutDevice(session)}
                    className="px-4 py-2 rounded-lg text-sm font-medium"
                    style={{ 
                      backgroundColor: '#ef4444',
                      color: 'var(--color-white)'
                    }}
                  >
                    Logout
                  </button>
                )}
              </div>
            ))}
          </div>

          <button 
            onClick={handleLogoutAllDevices}
            className="mt-6 px-6 py-3 rounded-lg border font-medium"
            style={{ 
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)'
            }}
          >
            Logout From All Devices
          </button>
        </div>
      </div>

      {/* Password Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80" onClick={closeSuccessModal} />
          <div 
            className="relative bg-white rounded-lg p-8 mx-4 max-w-md w-full text-center"
            style={{ backgroundColor: 'var(--color-white)' }}
          >
            <button 
              onClick={closeSuccessModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
              style={{ color: 'var(--color-grey)' }}
            >
              <X className="w-5 h-5" />
            </button>

            <div 
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: '#22c55e' }}
            >
              <Check className="w-10 h-10 text-white" />
            </div>

            <h3 
              className="text-xl font-semibold mb-2"
              style={{ color: 'var(--color-dark)' }}
            >
              Password Updated
            </h3>
            <p 
              className="text-sm"
              style={{ color: 'var(--color-grey)' }}
            >
              Your password has been changed successfully. You can now log in securely with your new credentials.
            </p>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80" onClick={closeLogoutModal} />
          <div 
            className="relative bg-white rounded-lg p-6 mx-4 max-w-md w-full"
            style={{ backgroundColor: 'var(--color-white)' }}
          >
            <button 
              onClick={closeLogoutModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
              style={{ color: 'var(--color-grey)' }}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-500 mt-1" />
              <div>
                <h3 
                  className="text-lg font-semibold mb-2"
                  style={{ color: 'var(--color-dark)' }}
                >
                  Log Out Device?
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--color-grey)' }}
                >
                  Are you sure you want to log this device out? You'll need to sign in again to access your account from this device.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={closeLogoutModal}
                className="flex-1 px-4 py-2 rounded-lg border font-medium"
                style={{ 
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)'
                }}
              >
                Cancel
              </button>
              <button 
                onClick={confirmLogoutDevice}
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
      )}
    </>
  );
};

export default Security;