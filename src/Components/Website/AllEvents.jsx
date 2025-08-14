import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AllEvents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("Location");
  const [priceFilter, setPriceFilter] = useState("Price");
  const [dateFilter, setDateFilter] = useState("Date");
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filterTabs = [
    "All",
    "Music",
    "Tech",
    "Sports",
    "Business",
    "Food & Drinks",
    "Gaming",
  ];

  // Sample events data
  const events = [
    {
      id: 1,
      title: "Tech Conference 2025",
      date: "May 25, 2025",
      location: "San Antonio, Lagos",
      price: "₦5,000",
      type: "paid",
      category: "Tech",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
    },
    {
      id: 2,
      title: "Summer Music Festival",
      date: "Jun 15, 2025",
      location: "Olympia, Lagos",
      price: "Free",
      type: "free",
      category: "Music",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=250&fit=crop",
    },
    {
      id: 3,
      title: "Business Leadership Summit",
      date: "Jul 8, 2025",
      location: "Airport Road, Benin City",
      price: "₦2,000",
      type: "paid",
      category: "Business",
      image:
        "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=250&fit=crop",
    },
    {
      id: 4,
      title: "Gaming Championship",
      date: "Aug 12, 2025",
      location: "Victoria Island, Lagos",
      price: "₦3,500",
      type: "paid",
      category: "Gaming",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop",
    },
    {
      id: 5,
      title: "Food & Wine Festival",
      date: "Sep 5, 2025",
      location: "Ikoyi, Lagos",
      price: "₦4,000",
      type: "paid",
      category: "Food & Drinks",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop",
    },
    {
      id: 6,
      title: "Sports Meet 2025",
      date: "Oct 20, 2025",
      location: "National Stadium, Abuja",
      price: "Free",
      type: "free",
      category: "Sports",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=250&fit=crop",
    },
  ];

  // Duplicate events to show more items
  const allEvents = [...events, ...events, ...events];

  // Filter events based on search and category
  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" || event.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Handle event card click
  const handleEventClick = (eventId) => {
    // In a real app, this would use navigate(`/discover-events/${eventId}`)
    navigate(`/discover-events/${eventId}`);
  };

  // Handle buy now button click (prevent event propagation)
  const handleBuyNowClick = (e, eventId) => {
    e.stopPropagation();
    navigate(`/checkout`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Discover Amazing Events */}
      <div
        className="relative bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 py-20 px-4"
        style={{
          background:
            "linear-gradient(91.66deg, #C598FF 0.26%, #9747FF 98.96%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Discover Amazing Events
          </h1>
          <p className="text-lg md:text-xl text-purple-100 mb-12 max-w-2xl mx-auto">
            Find your next favorite experience with thousands of events
            worldwide
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
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
                  placeholder="Search events..."
                  className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white rounded-xl border-0 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-200"
                />
              </div>
              <button className="px-8 py-4 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedFilter === tab
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span className="flex items-center gap-2">
                  {tab === "All" && "🎯"}
                  {tab === "Music" && "🎵"}
                  {tab === "Tech" && "💻"}
                  {tab === "Sports" && "⚽"}
                  {tab === "Business" && "👔"}
                  {tab === "Food & Drinks" && "🍽️"}
                  {tab === "Gaming" && "🎮"}
                  {tab}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              All Events ({filteredEvents.length})
            </h2>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex gap-4">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>Location</option>
              <option>Lagos</option>
              <option>Abuja</option>
              <option>Port Harcourt</option>
            </select>

            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>Price</option>
              <option>Free</option>
              <option>Under ₦5,000</option>
              <option>₦5,000+</option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>Date</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>Next Month</option>
            </select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <div
              key={`${event.id}-${index}`}
              onClick={() => handleEventClick(event.id)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105"
            >
              {/* Event Image */}
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                {/* FIXED: Show category instead of paid/free */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-gray-700">
                    {event.category}
                  </span>
                </div>

                <div className="w-[32px] h-[32px] bg-[rgba(255,255,255,0.4)] absolute top-4 right-4 rounded-[8px] flex items-center justify-center">
                  <img src="/assets/book-saved.png" alt="" />
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
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
                    <span className="text-sm">{event.date}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <svg
                      className="w-4 h-4 mr-2"
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

                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {event.price}
                  </div>
                  <button
                    onClick={(e) => handleBuyNowClick(e, event.id)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    {event.type === "free" ? "Get Ticket" : "Buy Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show no results message */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">
              No events found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedFilter("All");
              }}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {filteredEvents.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
              Load More Events
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllEvents;
