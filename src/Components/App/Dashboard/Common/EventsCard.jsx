import React from "react";

// Reusable Event Card Component
const EventCard = ({ event, onEventClick }) => {
  return (
    <div
      onClick={() => onEventClick(event.id)}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      {/* Event Image */}
      <div className="relative h-64">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        {/* Event Category Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg px-3 py-1">
          <span className="text-sm font-medium text-gray-700">
            {event.category}
          </span>
        </div>
        {/* Bookmark Icon */}
        <div className="w-8 h-8 bg-white/40 absolute top-4 right-4 rounded-lg flex items-center justify-center">
          <img src="/assets/book-saved.png" alt="Bookmark" />
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
              e.stopPropagation();
              onEventClick(event.id);
            }}
          >
            {event.isPaid ? "Buy Ticket" : "Get Ticket"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard