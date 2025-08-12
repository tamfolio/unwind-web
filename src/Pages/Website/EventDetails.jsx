import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTicket, setSelectedTicket] = useState("regular");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample events data (in a real app, this would come from an API)
  const eventsData = {
    1: {
      title: "Tech Conference 2025",
      date: "May 25, 2025",
      time: "9:00 AM - 5:00 PM WAT",
      location: "B Ann Avenue, Lagos",
      category: "Technology",
      image: "/assets/event-image.png",
      description:
        "Join Us for an Unforgettable Experience at Tech Conference 2025",
      fullDescription: `Get ready to be inspired, informed, and connected at Tech Conference 2025 – the ultimate gathering for tech enthusiasts, innovators, and industry leaders. Whether you're a rising founder, seasoned marketer, or investor, this event is designed to spark ideas and fuel connections that drive the future of technology.`,
      attendees: 238,
    },
    2: {
      title: "Summer Music Festival",
      date: "Jun 15, 2025",
      time: "4:00 PM - 11:00 PM WAT",
      location: "Olympia, Lagos",
      category: "Music",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=400&fit=crop",
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
      image:
        "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=400&fit=crop",
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
      id: 1,
      title: "Tech Conference 2025",
      date: "May 25, 2025",
      time: "9:00 AM",
      location: "B Ann Avenue, Lagos",
      price: 5000,
      image: "/api/placeholder/300/200",
    },
    {
      id: 2,
      title: "Summer Music Festival",
      date: "Jun 15, 2025",
      time: "4:00 PM",
      location: "16 Owerinte lands, Lagos",
      price: "Free",
      image: "/api/placeholder/300/200",
    },
    {
      id: 3,
      title: "Business Leadership Summit",
      date: "Jul 8, 2025",
      time: "10:00 AM",
      location: "4 Airport Road, River City",
      price: 2000,
      image: "/api/placeholder/300/200",
    },
  ];

  const calculateTotal = () => {
    const selectedTicketType = ticketTypes.find(
      (ticket) => ticket.id === selectedTicket
    );
    return selectedTicketType ? selectedTicketType.price * quantity : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 px-[74px]">
      {/* Back Button */}
      <div className="bg-white px-4 py-4 border-b">
        <button
          onClick={() => navigate("/discover-events")}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative h-[448px] overflow-hidden rounded-2xl">
        <img
          src={currentEvent.image}
          alt={currentEvent.title}
          className="absolute inset-0 w-full h-[448px] object-cover"
        />

        <div className="absolute bottom-6 left-6 text-white">
          <span className="inline-block bg-white bg-opacity-20 text-white text-sm px-3 py-1 rounded-full mb-4">
            {currentEvent.category}
          </span>
          <h1 className="text-4xl font-bold mb-2">{currentEvent.title}</h1>
          <p className="text-lg opacity-90">{currentEvent.description}</p>
        </div>
      </div>

      <div className="w-full mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Info */}
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

            {/* About This Event */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <p className="text-gray-700 mb-4">{currentEvent.description}</p>
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

          {/* Sidebar - Ticket Selection */}
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
        </div>

        {/* Related Events */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Events You May Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {relatedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{event.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-purple-600">
                      {typeof event.price === "number"
                        ? `₦${event.price.toLocaleString()}`
                        : event.price}
                    </span>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              View All Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
