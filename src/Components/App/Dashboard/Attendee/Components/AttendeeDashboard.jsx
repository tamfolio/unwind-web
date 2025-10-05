import React from "react";
import DiscoverEvents from "../../../../Website/DiscoverEvents";
import RecommendedSection from "./RecommendedSection";

function AttendeeDashboard() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's what's happening with your events.
        </p>

        <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2">
          Browse All Events
          <span>🎫</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Upcoming Events */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 relative">
          <img
            src="/assets/Topographic 1.png"
            alt=""
            className="absolute right-0 bottom-0"
          />
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Upcoming Events</span>
            <span className="text-2xl">
              <img src="/assets/note.png" alt="" />
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900">4</div>
          <div className="text-sm text-gray-600 mt-1">+2 from last month</div>
        </div>

        {/* Tickets Purchased */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200 relative">
          <img
            src="/assets/Capa 1.png"
            alt=""
            className="absolute right-0 bottom-0"
          />
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Tickets Purchased</span>
            <span className="text-2xl">
              <img src="/assets/ticket-star.svg" alt="" />
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900">12</div>
          <div className="text-sm text-gray-600 mt-1">+2 from last month</div>
        </div>

        {/* Total Spent */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 relative">
          <img
            src="/assets/Topographic 5.png"
            alt=""
            className="absolute right-0 bottom-0"
          />
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Total Spent</span>
            <span className="text-2xl">
              <img src="/assets/money-2.png" alt="" />
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900">₦ 12,000.00</div>
          <div className="text-sm text-gray-600 mt-1">
            + ₦ 3,000 from last month
          </div>
        </div>

        {/* Wallet Balance */}
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl border border-pink-200 relative">
          <img
            src="/assets/Topographic 7.png"
            alt=""
            className="absolute right-0 bottom-0"
          />    
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Wallet Balance</span>
            <span className="text-2xl">
              <img src="/assets/wallet.png" alt="" />
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900">₦ 6,000.00</div>
          <div className="text-sm text-gray-600 mt-1">
            Available for purchases
          </div>
        </div>
      </div>

      <DiscoverEvents/>

      {/* Recommended Section */}
    <RecommendedSection/>
    </div>
  );
}

export default AttendeeDashboard;
