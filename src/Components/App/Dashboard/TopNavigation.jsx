import React from "react";
import { Bell, Search } from "lucide-react";

function TopNavigation({ userType }) {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={
                  userType === "attendee" 
                    ? "Search events..." 
                    : "Search events, tickets or attendees..."
                }
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
              />
            </div>
          </div>

          {/* Right: Notifications and Profile */}
          <div className="flex items-center gap-4 ml-4">
            <button className="relative text-gray-600 hover:text-gray-900">
              <Bell size={24} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-2">
              <img
                src="/assets/profile-picture.png"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-900">Jane</p>
                <p className="text-xs text-gray-500">
                  {userType === "attendee" ? "Attendee" : "Organizer"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TopNavigation;