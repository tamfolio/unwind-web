import React, { useState } from 'react';
import { Bell, Search, Calendar, CreditCard, Shield, Ticket } from 'lucide-react';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('reminders');
  const [activeFilter, setActiveFilter] = useState('all');

  // Sample notification data based on the images
  const reminderNotifications = [
    {
      id: 1,
      icon: Calendar,
      title: 'Tech Conference 2025',
      message: 'Your event starts tomorrow! Don\'t forget to check in.',
      timestamp: 'May 24, 2025 • 9:00 AM',
      isNew: true,
      type: 'reminder'
    },
    {
      id: 2,
      icon: Calendar,
      title: 'Basketball Championship',
      message: 'Event starts in 3 days. Prepare for an exciting match!',
      timestamp: 'May 25, 2025 • 5:00 PM',
      isNew: true,
      type: 'reminder'
    },
    {
      id: 3,
      icon: Bell,
      title: 'Business Summit 2025',
      message: 'Venue changed to Convention Center, Downtown.',
      timestamp: 'May 30, 2025 • 10:00 AM',
      isNew: false,
      type: 'reminder'
    }
  ];

  const generalNotifications = [
    {
      id: 4,
      icon: Bell,
      title: 'Event Update',
      message: 'The Summer Music Festival has been rescheduled to June 20th.',
      timestamp: 'May 14, 2025',
      isNew: true,
      type: 'events'
    },
    {
      id: 5,
      icon: Bell,
      title: 'New Event Recommendation',
      message: 'Based on your interests, we think you\'d enjoy the upcoming Jazz Festival.',
      timestamp: 'May 9, 2025',
      isNew: false,
      type: 'events'
    },
    {
      id: 6,
      icon: Ticket,
      title: 'Ticket Confirmation',
      message: 'Your ticket for Tech Conference 2025 has been confirmed.',
      timestamp: 'May 15, 2025',
      isNew: true,
      type: 'tickets'
    },
    {
      id: 7,
      icon: CreditCard,
      title: 'Payment Processed',
      message: 'Your payment of $45.00 has been processed successfully.',
      timestamp: 'May 15, 2025',
      isNew: false,
      type: 'wallets'
    },
    {
      id: 8,
      icon: Shield,
      title: 'Account Security',
      message: 'We\'ve noticed a login from a new device. Please verify if this was you.',
      timestamp: 'May 15, 2025',
      isNew: false,
      type: 'security'
    }
  ];

  const getFilteredNotifications = () => {
    if (activeTab === 'reminders') {
      return reminderNotifications;
    }
    
    const notifications = generalNotifications;
    if (activeFilter === 'all') return notifications;
    return notifications.filter(notification => notification.type === activeFilter);
  };

  const getNewNotificationCount = () => {
    const allNotifications = [...reminderNotifications, ...generalNotifications];
    return allNotifications.filter(notification => notification.isNew).length;
  };

  const NotificationCard = ({ notification }) => {
    const IconComponent = notification.icon;
    
    return (
      <div 
        className="rounded-lg p-4 border transition-colors duration-200 hover:shadow-sm"
        style={{ 
          backgroundColor: 'var(--color-white)',
          borderColor: 'var(--color-offwhite)'
        }}
      >
        <div className="flex items-start gap-3">
          <div 
            className="p-2 rounded-lg flex-shrink-0"
            style={{ backgroundColor: 'var(--color-offwhite)' }}
          >
            <IconComponent 
              className="w-5 h-5" 
              style={{ color: 'var(--color-primary)' }} 
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 
                className="font-semibold text-sm truncate"
                style={{ color: 'var(--color-dark)' }}
              >
                {notification.title}
              </h3>
              {notification.isNew && (
                <span 
                  className="text-xs px-2 py-1 rounded-full font-medium"
                  style={{ 
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-white)'
                  }}
                >
                  New
                </span>
              )}
            </div>
            <p 
              className="text-sm mb-2 line-clamp-2"
              style={{ color: 'var(--color-grey)' }}
            >
              {notification.message}
            </p>
            <p 
              className="text-xs"
              style={{ color: 'var(--color-secondary)' }}
            >
              {notification.timestamp}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6" style={{ backgroundColor: 'var(--color-offwhite)', minHeight: '100vh' }}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-start gap-3 mb-2">
          <h1 
            className="text-2xl font-bold"
            style={{ color: 'var(--color-dark)' }}
          >
            Notifications
          </h1>
          <div 
            className="text-xs px-3 py-1 rounded-full font-medium"
            style={{ 
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-white)'
            }}
          >
            {getNewNotificationCount()} New
          </div>
        </div>
        <p style={{ color: 'var(--color-grey)' }}>
          Stay updated with event announcements and account activity.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" 
          style={{ color: 'var(--color-secondary)' }}
        />
        <input
          type="text"
          placeholder="Search events..."
          className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition-colors"
          style={{ 
            backgroundColor: 'var(--color-white)',
            borderColor: 'var(--color-offwhite)',
            color: 'var(--color-dark)'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--color-primary)';
            e.target.style.boxShadow = `0 0 0 2px ${getComputedStyle(document.documentElement).getPropertyValue('--color-primary')}20`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--color-offwhite)';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* Tab Navigation */}
      <div 
        className="flex space-x-1 mb-6 rounded-lg p-1"
        style={{ backgroundColor: 'var(--color-white)' }}
      >
        <button
          onClick={() => setActiveTab('general')}
          className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors"
          style={{
            backgroundColor: activeTab === 'general' ? 'var(--color-offwhite)' : 'transparent',
            color: activeTab === 'general' ? 'var(--color-primary)' : 'var(--color-grey)'
          }}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab('reminders')}
          className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors"
          style={{
            backgroundColor: activeTab === 'reminders' ? 'var(--color-offwhite)' : 'transparent',
            color: activeTab === 'reminders' ? 'var(--color-primary)' : 'var(--color-grey)'
          }}
        >
          Reminders
        </button>
      </div>

      {/* Content Section */}
      {activeTab === 'reminders' ? (
        <div>
          <h2 
            className="text-lg font-semibold mb-4"
            style={{ color: 'var(--color-dark)' }}
          >
            Reminders for your upcoming events
          </h2>
          <div className="space-y-4">
            {getFilteredNotifications().map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* Filter Buttons for General Tab */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { key: 'all', label: 'All' },
              { key: 'events', label: 'Events' },
              { key: 'tickets', label: 'Tickets' },
              { key: 'wallets', label: 'Wallets' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  backgroundColor: activeFilter === filter.key ? 'var(--color-primary)' : 'var(--color-white)',
                  color: activeFilter === filter.key ? 'var(--color-white)' : 'var(--color-grey)'
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {getFilteredNotifications().map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {getFilteredNotifications().length === 0 && (
        <div className="text-center py-12">
          <Bell 
            className="mx-auto w-12 h-12 mb-4" 
            style={{ color: 'var(--color-secondary)' }}
          />
          <h3 
            className="text-lg font-medium mb-2"
            style={{ color: 'var(--color-dark)' }}
          >
            No notifications
          </h3>
          <p style={{ color: 'var(--color-grey)' }}>
            You're all caught up! No new notifications at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default Notifications;