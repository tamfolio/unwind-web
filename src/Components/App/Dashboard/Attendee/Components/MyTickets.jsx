import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useTickets } from '@hooks/useEvents'; // Adjust path as needed

function MyTickets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 50 // Get more tickets to handle filtering locally
  });

  // Get access token from Redux
  const currentUser = useSelector((state) => state.user?.currentUser);
  const reduxToken = currentUser?.access_token;
  const localStorageToken = localStorage.getItem('access_token') || localStorage.getItem('accessToken');
  
  // Use Redux token first, then localStorage as fallback
  const access_token = reduxToken || localStorageToken;

  // Fetch tickets using the authenticated API
  const { 
    data: ticketsData, 
    isLoading, 
    error,
    refetch 
  } = useTickets(filters, access_token);

  console.log('🎫 MyTickets Debug:');
  console.log('  - Access token:', !!access_token);
  console.log('  - Tickets data:', ticketsData);
  console.log('  - Loading:', isLoading);
  console.log('  - Error:', error);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Format ticket data from API response
  const formatTicketData = (ticket) => {
    if (!ticket) return null;

    const eventDetails = ticket.event;
    const ticketTypeDetails = ticket.ticketType;
    
    // Determine if ticket is upcoming or past based on event start date
    const eventDate = new Date(eventDetails.startDate);
    const now = new Date();
    const isUpcoming = eventDate > now;
    
    // Format dates
    const formattedDate = eventDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    const formattedTime = eventDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const purchaseDate = new Date(ticket.purchasedAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    return {
      id: ticket.id,
      eventName: eventDetails.title,
      date: formattedDate,
      time: formattedTime,
      ticketId: ticket.id.slice(-8).toUpperCase(), // Use last 8 chars of ID
      purchaseDate: purchaseDate,
      price: `₦${ticket.totalAmount.toLocaleString()}`,
      status: isUpcoming ? "Upcoming" : "Past",
      ticketType: ticketTypeDetails.name,
      quantity: ticket.quantity,
      venue: eventDetails.venue,
      paymentStatus: ticket.status, // completed, pending, etc.
      originalTicket: ticket // Keep reference to original data
    };
  };

  // Get the tickets and format them
  const allTickets = ticketsData?.tickets ? 
    ticketsData.tickets.map(formatTicketData).filter(ticket => ticket) : [];

  // Filter tickets based on search and status
  const filteredTickets = allTickets.filter((ticket) => {
    const matchesSearch = ticket.eventName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" || ticket.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Handle view ticket click
  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowQRModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowQRModal(false);
    setSelectedTicket(null);
  };

  // Show login prompt if no access token
  if (!access_token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sign in to view your tickets
          </h2>
          <p className="text-gray-500 mb-6">
            You need to be logged in to access your purchased tickets.
          </p>
          <a 
            href="/login"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Debug Panel in Development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-blue-50 border-b border-blue-200 p-3 text-sm">
          <div className="max-w-7xl mx-auto">
            <strong className="text-blue-800">🎫 Tickets Debug:</strong>
            <span className="text-blue-700 ml-2">
              Token: {access_token ? '✅ Present' : '❌ Missing'} | 
              Loading: {isLoading ? 'Yes' : 'No'} | 
              Error: {error ? 'Yes' : 'No'} |
              Total Tickets: {allTickets.length} |
              API Response: {ticketsData ? `Total: ${ticketsData.total}` : 'None'}
            </span>
            {error && (
              <button
                onClick={() => refetch()}
                className="ml-4 bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            )}
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-6">
            {/* Title and Description */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Tickets
            </h1>
            <p className="text-gray-500">
              View and manage your purchased tickets.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative w-full max-w-md">
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tickets..."
                className="w-full pl-12 pr-4 py-3 text-gray-900 bg-gray-50 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-3">
            {["All", "Upcoming", "Past"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedFilter === filter
                    ? "bg-purple-100 text-purple-600"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                <div className="flex flex-col lg:flex-row">
                  <div className="flex-1 p-6">
                    <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-6 w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-6 bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-200 min-w-[180px]">
                    <div className="w-16 h-16 bg-gray-200 rounded mb-4"></div>
                    <div className="w-20 h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              Failed to load tickets
            </h3>
            <p className="text-red-700 mb-4">{error.message}</p>
            <button
              onClick={() => refetch()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Tickets List */}
        {!isLoading && !error && (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Left Section - Ticket Details */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        {ticket.eventName}
                      </h3>
                      <div className="flex gap-2 ml-4">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                          ticket.status === 'Upcoming' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {ticket.status}
                        </span>
                        <span className="px-3 py-1.5 rounded-md text-xs font-medium bg-purple-100 text-purple-700">
                          {ticket.ticketType}
                        </span>
                        {ticket.paymentStatus === 'pending' && (
                          <span className="px-3 py-1.5 rounded-md text-xs font-medium bg-yellow-100 text-yellow-700">
                            Payment Pending
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 mb-6">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm">
                        {ticket.date} | {ticket.time}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex">
                        <span className="text-gray-500 w-32">Ticket ID:</span>
                        <span className="font-semibold text-gray-900">
                          {ticket.ticketId}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 w-32">Purchase date:</span>
                        <span className="font-semibold text-gray-900">
                          {ticket.purchaseDate}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 w-32">Quantity:</span>
                        <span className="font-semibold text-gray-900">
                          {ticket.quantity}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 w-32">Total Price:</span>
                        <span className="font-semibold text-gray-900">
                          {ticket.price}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 w-32">Venue:</span>
                        <span className="font-semibold text-gray-900">
                          {ticket.venue}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - QR Code and Action */}
                  <div className="flex flex-col items-center justify-center p-6 bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-200 min-w-[180px]">
                    <div className="mb-4">
                      <svg
                        className="w-16 h-16 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm-2 8h8v8H3v-8zm2 2v4h4v-4H5zm8-12v8h8V3h-8zm6 6h-4V5h4v4zm-6 4h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4 0h2v2h-2v-2zm2-2h2v2h-2v-2zm0-4h2v2h-2v-2zm-4 0h2v2h-2v-2z" />
                      </svg>
                    </div>
                    <button
                      onClick={() => handleViewTicket(ticket)}
                      disabled={ticket.paymentStatus === 'pending'}
                      className={`px-6 py-2 border-2 rounded-lg font-semibold text-sm transition-colors duration-200 ${
                        ticket.paymentStatus === 'pending'
                          ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                          : 'border-purple-600 text-purple-600 hover:bg-purple-50'
                      }`}
                    >
                      {ticket.paymentStatus === 'pending' ? 'Pending Payment' : 'View Ticket'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && !error && filteredTickets.length === 0 && (
          <div className="text-center py-16">
            <svg
              className="w-24 h-24 text-gray-300 mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM15 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? "No tickets found" : "No tickets yet"}
            </h3>
            <p className="text-gray-500 text-lg mb-4">
              {searchTerm
                ? "Try adjusting your search to find what you're looking for."
                : allTickets.length === 0 
                  ? "You haven't purchased any tickets yet."
                  : "No tickets found matching your criteria."}
            </p>
            {searchTerm ? (
              <button
                onClick={() => setSearchTerm("")}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Clear search
              </button>
            ) : (
              <a
                href="/discover-events"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Browse Events
              </a>
            )}
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {showQRModal && selectedTicket && (
        <div
          className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="text-center">
              <p className="text-gray-600 mb-6">
                {selectedTicket.status === "Past"
                  ? "This ticket has already been used."
                  : "Present this QR code at the venue for entry."}
              </p>

              {/* QR Code */}
              <div className="bg-gray-100 p-8 rounded-xl mb-6 inline-block">
                <svg
                  className="w-48 h-48 text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm-2 8h8v8H3v-8zm2 2v4h4v-4H5zm8-12v8h8V3h-8zm6 6h-4V5h4v4zm-6 4h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4 0h2v2h-2v-2zm2-2h2v2h-2v-2zm0-4h2v2h-2v-2zm-4 0h2v2h-2v-2z" />
                </svg>
              </div>

              {/* Event Details */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedTicket.eventName}
              </h2>
              <p className="text-gray-600 mb-6">
                {selectedTicket.date} | {selectedTicket.time}
              </p>

              {/* Status Badges */}
              <div className="flex justify-center gap-3 mb-6">
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-purple-600 text-white">
                  {selectedTicket.ticketType}
                </span>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedTicket.status === "Upcoming"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {selectedTicket.status === "Past" ? "Used" : "Valid"}
                </span>
              </div>

              {/* Ticket Information */}
              <div className="space-y-3 text-left border-t border-gray-200 pt-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ticket ID:</span>
                  <span className="font-semibold text-gray-900">
                    {selectedTicket.ticketId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Purchase date:</span>
                  <span className="font-semibold text-gray-900">
                    {selectedTicket.purchaseDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-semibold text-gray-900">
                    {selectedTicket.quantity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Price:</span>
                  <span className="font-semibold text-gray-900">
                    {selectedTicket.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTickets;