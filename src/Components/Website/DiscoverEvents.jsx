import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DiscoverEvents = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { name: "All", icon: "📋" },
    { name: "Music", icon: "🎵" },
    { name: "Tech", icon: "💻" },
    { name: "Sports", icon: "🏆" },
    { name: "Business", icon: "💼" },
    { name: "Food & Drinks", icon: "🍷" },
    { name: "Gaming", icon: "🎮" },
  ];

  const events = [
    {
      id: 1,
      title: "Tech Conference 2025",
      category: "Tech",
      date: "May 25, 2025",
      location: "5, Alen Avenue, Lagos",
      price: "₦ 5,000",
      image: "/assets/event1.png",
      isPaid: true,
    },
    {
      id: 2,
      title: "Summer Music Festival",
      category: "Music",
      date: "Jun 15, 2025",
      location: "15, Chevron, Lekki, Lagos",
      price: "Free",
      image: "/assets/event2.png",
      isPaid: false,
    },
    {
      id: 3,
      title: "Business Leadership Summit",
      category: "Business",
      date: "Jul 8, 2025",
      location: "1, Airport Road, Benin City",
      price: "₦ 2,000",
      image: "/assets/event3.png",
      isPaid: true,
    },
    {
      id: 4,
      title: "Gaming Championship",
      category: "Gaming",
      date: "Aug 12, 2025",
      location: "10, Victoria Island, Lagos",
      price: "₦ 1,500",
      image: "/assets/event1.png",
      isPaid: true,
    },
    {
      id: 5,
      title: "Food & Wine Expo",
      category: "Food & Drinks",
      date: "Sep 20, 2025",
      location: "25, Ikoyi, Lagos",
      price: "Free",
      image: "/assets/event2.png",
      isPaid: false,
    },
    {
      id: 6,
      title: "Sports Analytics Conference",
      category: "Sports",
      date: "Oct 5, 2025",
      location: "12, Abuja Central",
      price: "₦ 3,000",
      image: "/assets/event3.png",
      isPaid: true,
    },
  ];

  // Filter events based on active category
  const filteredEvents =
    activeCategory === "All"
      ? events
      : events.filter((event) => event.category === activeCategory);

  const handleEventClick = (eventId) => {
    // Navigate to event details - you can replace this with your routing logic
    navigate(`/discover-events/${eventId}`)
    console.log(`Navigate to event ${eventId}`);
    // In a real app: navigate(`/discover-events/${eventId}`);
  };

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Events You'll Love
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From intimate workshops to massive festivals, find events that match
            your interests and budget.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-200 ${
                activeCategory === category.name
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-purple-600 hover:text-purple-600"
              }`}
            >
              <span className="text-sm">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => handleEventClick(event.id)}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              {/* Event Image */}
              <div className="relative h-64">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                {/* Event Category Badge - Shows category like "Tech", "Music", "Business" */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg px-3 py-1">
                  <span className="text-sm font-medium text-gray-700">
                    {event.category}
                  </span>
                </div>
                {/* Bookmark Icon */}
                {/* <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg p-2 hover:bg-white transition-colors">
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
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </div> */}
                <div className="w-[32px] h-[32px] bg-[rgba(255,255,255,0.4)] absolute top-4 right-4 rounded-[8px] flex items-center justify-center">
                  <img src="/assets/book-saved.png" alt="" />
                </div>
                
              </div>

              {/* Event Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {event.title}
                </h3>

                {/* Date */}
                <div className="flex items-center space-x-2 mb-3">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600">{event.date}</span>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2 mb-6">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 text-sm">
                    {event.location}
                  </span>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-purple-600">
                    {event.price}
                  </div>
                  <button
                    className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click when button is clicked
                      handleEventClick(event.id);
                    }}
                  >
                    {event.isPaid ? "" : "Get Ticket"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show message when no events match filter */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">
              No events found in this category.
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Show all events
            </button>
          </div>
        )}

        {/* View All Events Button */}
        <div className="text-center">
          <Link to="/discover-events">
            <button className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
              View All Events
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DiscoverEvents;
