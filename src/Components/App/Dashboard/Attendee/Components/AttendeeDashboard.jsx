import React from "react";
import DiscoverEvents from "../../../../Website/DiscoverEvents";
import RecommendedSection from "./RecommendedSection";
import { useDashboardSummary } from "../../../../../hooks/useDashboard";

function AttendeeDashboard() {
  // Use the hook to get dashboard data
  const { 
    data: dashboardData, 
    isLoading: loading, 
    error,
    refetch 
  } = useDashboardSummary();

  // Debug logging
  console.log('🏠 AttendeeDashboard Debug:');
  console.log('  - Dashboard data:', dashboardData);
  console.log('  - Loading:', loading);
  console.log('  - Error:', error);

  // Format currency helper
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount || 0);
  };

  return (
    <div className="space-y-6">
      {/* Debug Panel in Development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">🔍 Dashboard Debug:</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p>Loading: {loading ? 'Yes' : 'No'}</p>
            <p>Error: {error ? error.message : 'None'}</p>
            <p>Data: {dashboardData ? 'Received' : 'No data'}</p>
            {error && (
              <button
                onClick={() => refetch()}
                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
              >
                Retry API Call
              </button>
            )}
            {dashboardData && (
              <details className="mt-2">
                <summary className="cursor-pointer font-medium">Raw API Response</summary>
                <pre className="mt-2 text-xs bg-white p-2 rounded overflow-auto max-h-40">
                  {JSON.stringify(dashboardData, null, 2)}
                </pre>
              </details>
            )}
          </div>
        </div>
      )}

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
          <div className="text-3xl font-bold text-gray-900">
            {loading ? (
              <div className="animate-pulse bg-gray-300 h-8 w-8 rounded"></div>
            ) : (
              dashboardData?.upcomingEvents || dashboardData?.upcoming_events || 0
            )}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {loading ? (
              <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
            ) : (
              "Events you're attending"
            )}
          </div>
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
          <div className="text-3xl font-bold text-gray-900">
            {loading ? (
              <div className="animate-pulse bg-gray-300 h-8 w-8 rounded"></div>
            ) : (
              dashboardData?.totalTicketsPurchased || dashboardData?.total_tickets_purchased || dashboardData?.tickets_count || 0
            )}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {loading ? (
              <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
            ) : (
              "Total tickets bought"
            )}
          </div>
        </div>

        {/* Total Spent */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-blue-200 relative">
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
          <div className="text-3xl font-bold text-gray-900">
            {loading ? (
              <div className="animate-pulse bg-gray-300 h-8 w-20 rounded"></div>
            ) : (
              formatCurrency(dashboardData?.totalSpent || dashboardData?.total_spent || dashboardData?.amount_spent || 0)
            )}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {loading ? (
              <div className="animate-pulse bg-gray-300 h-4 w-32 rounded"></div>
            ) : (
              "Amount spent on events"
            )}
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
          <div className="text-3xl font-bold text-gray-900">
            {loading ? (
              <div className="animate-pulse bg-gray-300 h-8 w-20 rounded"></div>
            ) : (
              formatCurrency(dashboardData?.walletBalance || dashboardData?.wallet_balance || dashboardData?.balance || 0)
            )}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Available for purchases
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="text-red-800 text-sm">
              ⚠️ Failed to load dashboard data: {error.message}
            </p>
            <button
              onClick={() => refetch()}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <DiscoverEvents/>

      {/* Recommended Section */}
      <RecommendedSection/>
    </div>
  );
}

export default AttendeeDashboard;