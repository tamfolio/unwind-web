import React, { useState, useEffect } from "react";

function SavedEvents() {
  const [searchTerm, setSearchTerm] = useState("");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample saved events data
  // const savedEvents = [
  //   {
  //     id: 1,
  //     title: "Tech Conference 2025",
  //     date: "May 25, 2025",
  //     location: "5, Alen Avenue, Lagos",
  //     price: "₦5,000",
  //     type: "paid",
  //     category: "Tech",
  //     image:
  //       "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
  //   },
  //   {
  //     id: 2,
  //     title: "Summer Music Festival",
  //     date: "Jun 15, 2025",
  //     location: "15, Chevron, Lekki, Lagos",
  //     price: "Free",
  //     type: "free",
  //     category: "Music",
  //     image:
  //       "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=250&fit=crop",
  //   },
  //   {
  //     id: 3,
  //     title: "Business Leadership Summit",
  //     date: "Jul 8, 2025",
  //     location: "1, Airport Road, Benin City",
  //     price: "₦2,000",
  //     type: "paid",
  //     category: "Business",
  //     image:
  //       "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=250&fit=crop",
  //   },
  // ];

  const savedEvents = []
  // Filter events based on search
  const filteredEvents = savedEvents.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle event card click
  const handleEventClick = (eventId) => {
    console.log("Navigate to event:", eventId);
  };

  // Handle buy/get ticket button click
  const handleTicketClick = (e, eventId, type) => {
    e.stopPropagation();
    console.log("Navigate to checkout for event:", eventId);
  };

  // Handle browse all events
  const handleBrowseAllEvents = () => {
    console.log("Navigate to all events page");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Title and Description */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Saved Events
              </h1>
              <p className="text-gray-500">
                Events you've bookmarked for future reference.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-600"
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
                placeholder="Search saved events..."
                className="w-full pl-12 pr-4 py-3 text-gray-900 bg-gray-50 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {filteredEvents.length > 0 ? (
          /* Events Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => handleEventClick(event.id)}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
              >
                {/* Event Image */}
                <div className="relative h-52">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-md text-xs font-medium bg-white text-gray-800">
                      {event.category}
                    </span>
                  </div>
                  {/* Bookmark Icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                    <img src="/assets/book-saved.png" alt="" className="w-5 h-5" />
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-5">
                    {/* Date */}
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-4 h-4 mr-2 text-purple-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm">{event.date}</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-4 h-4 mr-2 text-purple-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>

                  {/* Price and Action Button */}
                  <div className="flex justify-between items-center">
                    <div className="text-xl font-bold text-purple-600">
                      {event.price}
                    </div>
                    <button
                      onClick={(e) =>
                        handleTicketClick(e, event.id, event.type)
                      }
                      className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                    >
                      {event.type === "free" ? "Get Ticket" : "Buy Ticket"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-64 h-64 mb-6">
              <svg
                viewBox="0 0 400 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* Calendar illustration */}
                <rect
                  x="80"
                  y="40"
                  width="240"
                  height="200"
                  rx="12"
                  fill="#F9FAFB"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                />
                <rect
                  x="80"
                  y="40"
                  width="240"
                  height="50"
                  rx="12"
                  fill="#9333EA"
                />
                <circle cx="120" cy="65" r="6" fill="white" />
                <circle cx="280" cy="65" r="6" fill="white" />
                
                {/* Calendar grid */}
                <rect x="110" y="120" width="50" height="35" rx="6" fill="#E5E7EB" />
                <rect x="175" y="120" width="50" height="35" rx="6" fill="#E5E7EB" />
                <rect x="240" y="120" width="50" height="35" rx="6" fill="#E5E7EB" />
                <rect x="110" y="170" width="50" height="35" rx="6" fill="#E5E7EB" />
                <rect x="175" y="170" width="50" height="35" rx="6" fill="#9333EA" opacity="0.3" />
                
                {/* Mouse cursor */}
                <path d="M230 200 L230 220 L235 217 L240 225 L245 223 L240 215 L248 215 Z" fill="#9333EA" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {searchTerm ? "No events found" : "No saved events yet"}
            </h2>
            <p className="text-gray-500 text-center mb-8 max-w-md">
              {searchTerm
                ? "Try adjusting your search to find what you're looking for."
                : "Events you've bookmarked will appear here."}
            </p>
            
            {searchTerm ? (
              <button
                onClick={() => setSearchTerm("")}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Clear search
              </button>
            ) : (
              <button
                onClick={handleBrowseAllEvents}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
              >
                Browse All Events
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedEvents;