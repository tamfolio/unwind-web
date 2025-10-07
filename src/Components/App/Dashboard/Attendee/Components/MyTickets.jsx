import React, { useState, useEffect } from "react";

function MyTickets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Upcoming");
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample tickets data
  const tickets = [
    {
      id: 1,
      eventName: "Tech Conference 2025",
      date: "Jul 8, 2025",
      time: "12:30PM",
      ticketId: "TKT-564747",
      purchaseDate: "May 10, 2025",
      price: "₦5,000",
      status: "Upcoming",
      ticketType: "VIP",
    },
    {
      id: 2,
      eventName: "Summer Music Festival",
      date: "Jul 8, 2025",
      time: "12:30PM",
      ticketId: "TKT-285248",
      purchaseDate: "May 10, 2025",
      price: "₦5,000",
      status: "Upcoming",
      ticketType: "Regular",
    },
    {
      id: 3,
      eventName: "Business Leadership Summit",
      date: "Jul 8, 2025",
      time: "12:30PM",
      ticketId: "TKT-538296",
      purchaseDate: "May 10, 2025",
      price: "₦5,000",
      status: "Upcoming",
      ticketType: "VIP",
    },
    {
      id: 4,
      eventName: "Business Leadership Summit",
      date: "Jul 8, 2025",
      time: "12:30PM",
      ticketId: "TKT-564747",
      purchaseDate: "May 10, 2025",
      price: "₦5,000",
      status: "Past",
      ticketType: "VIP",
    },
    {
      id: 5,
      eventName: "Tech Conference 2025",
      date: "Jul 8, 2025",
      time: "12:30PM",
      ticketId: "TKT-564747",
      purchaseDate: "May 10, 2025",
      price: "₦5,000",
      status: "Past",
      ticketType: "VIP",
    },
  ];

  // Filter tickets based on search and status
  const filteredTickets = tickets.filter((ticket) => {
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

  return (
    <div className="min-h-screen bg-gray-50">
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

          {/* Filter Tabs */}
          <div className="flex gap-3">
            {["Upcoming", "Past", "All"].map((filter) => (
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
                      <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-purple-600 text-white">
                        {ticket.status}
                      </span>
                      <span className="px-3 py-1.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                        {ticket.ticketType}
                      </span>
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
                      <span className="text-gray-500 w-32">Price:</span>
                      <span className="font-semibold text-gray-900">
                        {ticket.price}
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
                    className="px-6 py-2 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 rounded-lg font-semibold text-sm transition-colors duration-200"
                  >
                    View Ticket
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTickets.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">
              No tickets found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedFilter("All");
              }}
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              Clear filters
            </button>
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
                      ? "bg-purple-600 text-white"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {selectedTicket.status === "Past" ? "Expired" : "Valid"}
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
                  <span className="text-gray-600">Price:</span>
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