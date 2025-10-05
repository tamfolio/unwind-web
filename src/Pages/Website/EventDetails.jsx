import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTicket, setSelectedTicket] = useState("regular");
  const [quantity, setQuantity] = useState(1);

  // Check if we're in the dashboard
  const isDashboard = location.pathname.includes('/dashboard');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample events data (in a real app, this would come from an API)
  const eventsData = {
    1: {
      title: "Tech Conference 2025",
      date: "May 25, 2025",
      time: "9:00 AM - 5:00 PM UTC",
      location: "5, Alen Avenue, Lagos",
      category: "Tech",
      image: "/assets/event1.png",
      description: "Join Us for an Unforgettable Experience at Tech Conference 2025",
      fullDescription: `Get ready to be inspired, informed, and connected at Tech Conference 2025 – the ultimate gathering for tech enthusiasts, innovators, and industry leaders. Whether you're a rising founder, seasoned marketer, or investor, this event is designed to spark ideas and fuel connections that drive the future of technology.`,
      attendees: 238,
    },
    2: {
      title: "Summer Music Festival",
      date: "Jun 15, 2025",
      time: "4:00 PM - 11:00 PM WAT",
      location: "Olympia, Lagos",
      category: "Music",
      image: "/assets/event2.png",
      description: "Experience the hottest music festival of the summer",
      fullDescription: `Get ready for an unforgettable musical journey at Summer Music Festival 2025! Join thousands of music lovers for a day filled with incredible performances, amazing food, and unforgettable memories.`,
      attendees: 512,
    },
    3: {
      title: "Business Leadership Summit",
      date: "Jul 8, 2025",
      time: "10:00 AM - 6:00 PM WAT",
      location: "Airport Road, Benin City",
      category: "Business",
      image: "/assets/event3.png",
      description: "Learn from industry leaders and networking opportunities",
      fullDescription: `Connect with business leaders and entrepreneurs at the Business Leadership Summit 2025. This exclusive event brings together thought leaders, investors, and innovators for a day of insights and networking.`,
      attendees: 156,
    },
  };

  // Get current event data or default
  const currentEvent = eventsData[id] || eventsData[1];

  const ticketTypes = [
    {
      id: "regular",
      name: "Regular",
      price: 5000,
      description: "Standard admission with access to all general event areas",
      color: "bg-gray-50 border-gray-200",
    },
    {
      id: "vip",
      name: "VIP",
      price: 7000,
      description: "Premium admission with access to all general event areas",
      color: "bg-blue-50 border-blue-200",
    },
    {
      id: "premium",
      name: "Premium",
      price: 12000,
      description: "Premium admission with access to all general event areas",
      color: "bg-purple-50 border-purple-200",
    },
  ];

  const relatedEvents = [
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
  ];

  const calculateTotal = () => {
    const selectedTicketType = ticketTypes.find(
      (ticket) => ticket.id === selectedTicket
    );
    return selectedTicketType ? selectedTicketType.price * quantity : 0;
  };

  const handleRelatedEventClick = (eventId) => {
    if (isDashboard) {
      navigate(`/dashboard/event/${eventId}`);
    } else {
      navigate(`/discover-events/${eventId}`);
    }
  };

  const handleBackClick = () => {
    if (isDashboard) {
      navigate("/dashboard");
    } else {
      navigate("/discover-events");
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isDashboard ? '' : 'px-[74px]'}`}>
      {/* Back Button */}
      <div className="bg-white px-4 py-4 border-b">
        <button
          onClick={handleBackClick}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
      </div>

      {/* Hero Section */}
      <div className={`relative ${isDashboard ? 'h-[300px] md:h-[400px]' : 'h-[448px]'} overflow-hidden rounded-2xl`}>
        <img
          src={currentEvent.image}
          alt={currentEvent.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Website Hero Title Overlay */}
        {!isDashboard && (
          <>
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur rounded-lg p-2 cursor-pointer hover:bg-white transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>

            <div className="absolute bottom-6 left-6 text-white">
              <span className="inline-block bg-white bg-opacity-20 text-white text-sm px-3 py-1 rounded-full mb-4">
                {currentEvent.category}
              </span>
              <h1 className="text-4xl font-bold mb-2">{currentEvent.title}</h1>
              <p className="text-lg opacity-90">{currentEvent.description}</p>
            </div>
          </>
        )}
      </div>

      <div className="w-full mx-auto px-4 py-8">
        {/* Title and Ticket Section - Dashboard Only */}
        {isDashboard && (
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            {/* Top Row - Category Badge and Price */}
            <div className="flex justify-between items-start mb-6">
              <div className="inline-block">
                <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium">
                  {currentEvent.category}
                </span>
              </div>
              <div className="text-right">
                <p className="text-3xl md:text-4xl font-bold text-gray-900">
                  ₦ 5,000 - ₦ 12,000
                </p>
                <p className="text-sm text-gray-500 mt-1">Ticket price range</p>
              </div>
            </div>

            {/* Title and Event Details Row */}
            <div className="flex justify-between items-start gap-8">
              {/* Left - Title and Event Info */}
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {currentEvent.title}
                </h1>

                {/* Event Info */}
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-purple-600" />
                    <span>{currentEvent.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-3 text-purple-600" />
                    <span>{currentEvent.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-purple-600" />
                    <span>{currentEvent.location}</span>
                  </div>
                </div>
              </div>

              {/* Right - Get Tickets Button */}
              <div className="flex-shrink-0">
                <Link to='/checkout'>
                  <button className="bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2">
                    Get Tickets
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className={`grid grid-cols-1 ${isDashboard ? 'lg:grid-cols-1' : 'lg:grid-cols-3'} gap-8`}>
          {/* Main Content */}
          <div className={`${isDashboard ? 'lg:col-span-1' : 'lg:col-span-2'} space-y-8`}>
            {/* Event Info - Website Only */}
            {!isDashboard && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{currentEvent.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{currentEvent.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{currentEvent.location}</span>
                  </div>
                </div>

                <div className="flex gap-2 mb-6">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Save
                  </button>
                </div>
              </div>
            )}

            {/* About This Event */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <p className="text-gray-700 mb-4 font-semibold">{currentEvent.description}</p>
              <p className="text-gray-700 mb-6">
                {currentEvent.fullDescription}
              </p>

              <h3 className="text-lg font-semibold mb-3">
                Why You Should Attend:
              </h3>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>
                  • Cutting-Edge Insights: Dive into the latest trends, tools,
                  and breakthroughs in AI, software, Web3, and more
                </li>
                <li>
                  • Unmatched Networking: Meet like-minded professionals,
                  potential collaborators, and decision-makers
                </li>
                <li>
                  • Expert-Led Seminars: Attend thought-provoking sessions and
                  industry experts on entrepreneurship, innovation, and growth
                </li>
                <li>• Stay ahead with insights and future-forward thinking</li>
                <li>
                  • Hands-on Innovation Showcase: Discover cutting-edge products
                  and emerging startups
                </li>
              </ul>

              <h3 className="text-lg font-semibold mb-3">Who Should Attend:</h3>
              <p className="text-gray-700 mb-6">
                Entrepreneurs, developers, designers, product managers,
                investors, tech journalists, students, and anyone passionate
                about the intersection of innovation and technology.
              </p>

              <h3 className="text-lg font-semibold mb-3">
                Sponsorship & Partnerships:
              </h3>
              <p className="text-gray-700 mb-6">
                Looking to showcase your brand or connect with the tech
                community? We offer a variety of sponsorship packages with
                highly targeted audience, exclusive branding opportunities, and
                direct engagement with key players in the ecosystem.
              </p>

              <h3 className="text-lg font-semibold mb-3">Don't Miss Out!</h3>
              <p className="text-gray-700">
                This is more than just a conference – it's where ideas, industry
                connections begin. Secure your spot today and be part of
                something extraordinary.
              </p>
            </div>

            {/* Directions */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Directions</h2>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Interactive Map</p>
                  <p className="text-sm">{currentEvent.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Ticket Selection (Only on Website) */}
          {!isDashboard && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
                <h2 className="text-2xl font-bold mb-6">Get Your Tickets</h2>

                <div className="space-y-4 mb-6">
                  {ticketTypes.map((ticket) => (
                    <div
                      key={ticket.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedTicket === ticket.id
                          ? "border-purple-500 bg-purple-50"
                          : ticket.color
                      }`}
                      onClick={() => setSelectedTicket(ticket.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{ticket.name}</h3>
                        <span className="font-bold text-lg">
                          ₦{ticket.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {ticket.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm text-gray-500">Available</span>
                        {selectedTicket === ticket.id && (
                          <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center py-2 border-x">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span>Regular Tickets</span>
                    <span>₦{calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Service Fee</span>
                    <span>₦0</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>₦{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
                <Link to='/checkout'>
                  <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors mb-4">
                    Get Tickets
                  </button>
                </Link>

                <p className="text-center text-sm text-gray-500">
                  <Users className="w-4 h-4 inline mr-1" />
                  {currentEvent.attendees} people are interested
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Related Events - Hide in dashboard */}
        {!isDashboard && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Events You May Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {relatedEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => handleRelatedEventClick(event.id)}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                >
                  <div className="relative h-64">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg px-3 py-1">
                      <span className="text-sm font-medium text-gray-700">
                        {event.category}
                      </span>
                    </div>
                    <div className="w-[32px] h-[32px] bg-[rgba(255,255,255,0.4)] absolute top-4 right-4 rounded-[8px] flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {event.title}
                    </h3>

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

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-purple-600">
                        {event.price}
                      </div>
                      <Link to={`/discover-events/${event.id}`}>
                        <button
                          className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          {event.isPaid ? "Buy Tickets" : "Get Ticket"}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate("/discover-events")}
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                View All Events
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventDetails;