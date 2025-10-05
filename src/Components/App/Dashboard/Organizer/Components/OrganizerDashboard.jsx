import React from "react";

function OrganizerDashboard() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Organizer Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your events and track performance</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2">
          <span>➕</span>
          Create Event
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Total Revenue</span>
            <span className="text-2xl">💰</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">₦ 244,860</div>
          <div className="text-sm text-green-600 mt-1">+12.6% from last month</div>
        </div>

        {/* Tickets Sold */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Tickets Sold</span>
            <span className="text-2xl">🎫</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">862</div>
          <div className="text-sm text-green-600 mt-1">+8.3% from last month</div>
        </div>

        {/* Active Events */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Active Events</span>
            <span className="text-2xl">📅</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">3</div>
          <div className="text-sm text-gray-600 mt-1">2 drafts pending</div>
        </div>

        {/* Active Attendees */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Active Attendees</span>
            <span className="text-2xl">👥</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">215</div>
          <div className="text-sm text-gray-600 mt-1">Across all active events</div>
        </div>
      </div>

      {/* My Events Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">My Events</h2>
            <p className="text-gray-600">View and manage all your created events</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {['Ongoing', 'Upcoming & Drafts', 'Past Events'].map((tab, index) => (
            <button
              key={tab}
              className={`px-4 py-3 font-medium transition-colors ${
                index === 0
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {/* Event Card */}
          {[
            { name: 'Summer Music Festival', tickets: 151, revenue: 52000, date: 'Jun 15, 2025' },
            { name: 'Tech Conference 2025', tickets: 126, revenue: 72000, date: 'Jun 15, 2025' },
            { name: 'Basketball Championship', tickets: 115, revenue: 95000, date: 'August 5, 2025' }
          ].map((event, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Event Image */}
                <img 
                  src="/api/placeholder/120/120" 
                  alt={event.name}
                  className="w-full lg:w-24 h-24 object-cover rounded-lg"
                />
                
                {/* Event Details */}
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{event.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>📅</span>
                    <span>{event.date}</span>
                  </div>
                  <span className="inline-block mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>

                {/* Stats */}
                <div className="flex gap-8">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Tickets Sold</div>
                    <div className="text-2xl font-bold text-gray-900">{event.tickets}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Revenue</div>
                    <div className="text-2xl font-bold text-gray-900">₦ {event.revenue.toLocaleString()}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 font-medium">
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
                    Check-in
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrganizerDashboard;