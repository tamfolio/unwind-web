import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { useEvent } from "../../hooks/useEvents"; // Import useEvent from existing file
import PurchaseTicket from "../../Components/App/Dashboard/Attendee/Components/Modals/PurchaseTicket";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTicket, setSelectedTicket] = useState("regular");
  const [quantity, setQuantity] = useState(1);
  const [showTicketModal, setShowTicketModal] = useState(false);

  // Check if we're in the dashboard
  const isDashboard = location.pathname.includes('/dashboard');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Debug the event ID
  console.log('EventDetails - Event ID from params:', id);
  console.log('EventDetails - About to call useEvent hook with ID:', id);

  // Fetch event data using React Query - this should trigger the API call
  const { 
    data: eventData, 
    isLoading: eventLoading, 
    error: eventError,
    refetch: refetchEvent
  } = useEvent(id);

  // Debug the hook results
  console.log('EventDetails - useEvent results:');
  console.log('  - eventData:', eventData);
  console.log('  - eventLoading:', eventLoading);
  console.log('  - eventError:', eventError);

  // Format event data for display
  const formatEventData = (apiEvent) => {
    if (!apiEvent) return null;
    
    console.log('EventDetails - Formatting API event data:', apiEvent);
    
    // Handle fake image URLs
    let imageUrl = apiEvent.imageUrl;
    if (!imageUrl || imageUrl.includes('cdn.example.com') || imageUrl.includes('example.com')) {
      const categoryImageMap = {
        'business': '/assets/event1.png',
        'music': '/assets/event2.png', 
        'tech': '/assets/event3.png',
        'sports': '/assets/event1.png',
        'exhibitions': '/assets/event2.png',
        'religious': '/assets/event3.png'
      };
      imageUrl = categoryImageMap[apiEvent.category?.slug?.toLowerCase()] || '/assets/event1.png';
    }

    return {
      id: apiEvent.id,
      title: apiEvent.title,
      category: apiEvent.category?.name || 'Event',
      date: new Date(apiEvent.startDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: `${new Date(apiEvent.startDate).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      })} - ${new Date(apiEvent.endDate).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      })}`,
      location: `${apiEvent.venue}, ${apiEvent.city}`,
      fullLocation: {
        venue: apiEvent.venue,
        city: apiEvent.city,
        state: apiEvent.state,
        country: apiEvent.country
      },
      image: imageUrl,
      description: `Join us for an unforgettable experience at ${apiEvent.title}`,
      fullDescription: `Get ready to be inspired, informed, and connected at ${apiEvent.title}. This event brings together passionate individuals from the ${apiEvent.category?.name?.toLowerCase()} community for an amazing experience you won't want to miss.`,
      priceRange: apiEvent.priceRange,
      minPrice: apiEvent.priceRange?.min || 0,
      maxPrice: apiEvent.priceRange?.max || 0,
      isFeatured: apiEvent.isFeatured,
      isVirtual: apiEvent.isVirtual,
      ticketTypesCount: apiEvent.ticketTypesCount || 1,
      attendees: Math.floor(Math.random() * 500) + 100, // Random number for demo
    };
  };

  // Loading state
  if (eventLoading) {
    return (
      <div className={`min-h-screen bg-gray-50 ${isDashboard ? '' : 'px-[74px]'}`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading event details...</p>
            <p className="text-sm text-gray-500 mt-2">Event ID: {id}</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (eventError) {
    return (
      <div className={`min-h-screen bg-gray-50 ${isDashboard ? '' : 'px-[74px]'}`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              <h2 className="text-2xl font-bold mb-2">Event Not Found</h2>
              <p>Sorry, we couldn't load the event details.</p>
              <p className="text-sm mt-2">Error: {eventError.message}</p>
              <p className="text-xs mt-1 text-gray-500">Event ID: {id}</p>
            </div>
            <div className="space-x-2">
              <button 
                onClick={() => refetchEvent()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
              <button 
                onClick={() => navigate(isDashboard ? '/dashboard' : '/discover-events')}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
              >
                Back to Events
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentEvent = formatEventData(eventData);
  
  if (!currentEvent) {
    return (
      <div className={`min-h-screen bg-gray-50 ${isDashboard ? '' : 'px-[74px]'}`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-gray-600">No event data available</p>
            <p className="text-xs mt-1 text-gray-500">Event ID: {id}</p>
            <button 
              onClick={() => navigate(isDashboard ? '/dashboard' : '/discover-events')}
              className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Generate ticket types based on API data
  const generateTicketTypes = (event) => {
    const basePrice = event.minPrice;
    const maxPrice = event.maxPrice;
    
    if (basePrice === 0) {
      return [
        {
          id: "free",
          name: "Free",
          price: 0,
          description: "Free admission to the event",
          color: "bg-green-50 border-green-200",
        }
      ];
    }

    const ticketTypes = [
      {
        id: "regular",
        name: "Regular",
        price: basePrice,
        description: "Standard admission with access to all general event areas",
        color: "bg-gray-50 border-gray-200",
      }
    ];

    if (maxPrice > basePrice) {
      const midPrice = Math.floor((basePrice + maxPrice) / 2);
      
      if (event.ticketTypesCount >= 2) {
        ticketTypes.push({
          id: "vip",
          name: "VIP",
          price: midPrice,
          description: "Premium admission with additional perks",
          color: "bg-blue-50 border-blue-200",
        });
      }

      if (event.ticketTypesCount >= 3) {
        ticketTypes.push({
          id: "premium",
          name: "Premium",
          price: maxPrice,
          description: "Premium admission with access to all areas and exclusive benefits",
          color: "bg-purple-50 border-purple-200",
        });
      }
    }

    return ticketTypes;
  };

  const ticketTypes = generateTicketTypes(currentEvent);

  const calculateTotal = () => {
    const selectedTicketType = ticketTypes.find(
      (ticket) => ticket.id === selectedTicket
    );
    return selectedTicketType ? selectedTicketType.price * quantity : 0;
  };

  const handleBackClick = () => {
    if (isDashboard) {
      navigate("/dashboard");
    } else {
      navigate("/discover-events");
    }
  };

  const handleGetTicketsClick = () => {
    if (isDashboard) {
      setShowTicketModal(true);
    } else {
      // For website view, navigate to checkout directly
      navigate('/checkout');
    }
  };

  const handleModalClose = () => {
    setShowTicketModal(false);
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
                  {currentEvent.minPrice === 0 ? 'Free' : 
                   currentEvent.minPrice === currentEvent.maxPrice ? 
                   `₦ ${currentEvent.minPrice.toLocaleString()}` :
                   `₦ ${currentEvent.minPrice.toLocaleString()} - ₦ ${currentEvent.maxPrice.toLocaleString()}`
                  }
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {currentEvent.minPrice === 0 ? 'Free event' : 
                   currentEvent.minPrice === currentEvent.maxPrice ? 'Ticket price' : 'Ticket price range'}
                </p>
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
                <button 
                  onClick={handleGetTicketsClick}
                  className="bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  {currentEvent.minPrice === 0 ? 'Get Free Ticket' : 'Get Tickets'}
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
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

              <h3 className="text-lg font-semibold mb-3">Event Details:</h3>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• <strong>Venue:</strong> {currentEvent.fullLocation.venue}</li>
                <li>• <strong>Location:</strong> {currentEvent.fullLocation.city}, {currentEvent.fullLocation.state}, {currentEvent.fullLocation.country}</li>
                <li>• <strong>Category:</strong> {currentEvent.category}</li>
                {currentEvent.isFeatured && <li>• <strong>Featured Event:</strong> This is a highlighted event</li>}
                {currentEvent.isVirtual && <li>• <strong>Virtual Event:</strong> Join online from anywhere</li>}
              </ul>

              <h3 className="text-lg font-semibold mb-3">Why You Should Attend:</h3>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• Connect with like-minded individuals in the {currentEvent.category.toLowerCase()} community</li>
                <li>• Gain valuable insights and knowledge from industry experts</li>
                <li>• Network with professionals and potential collaborators</li>
                <li>• Experience an unforgettable event in {currentEvent.fullLocation.city}</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3">Don't Miss Out!</h3>
              <p className="text-gray-700">
                This is more than just an event – it's where connections begin and memories are made. 
                Secure your spot today and be part of something extraordinary.
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
                          {ticket.price === 0 ? 'Free' : `₦${ticket.price.toLocaleString()}`}
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
                    <span>Tickets</span>
                    <span>{calculateTotal() === 0 ? 'Free' : `₦${calculateTotal().toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Service Fee</span>
                    <span>₦0</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>{calculateTotal() === 0 ? 'Free' : `₦${calculateTotal().toLocaleString()}`}</span>
                  </div>
                </div>
                <Link to='/checkout'>
                  <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors mb-4">
                    {calculateTotal() === 0 ? 'Get Free Tickets' : 'Get Tickets'}
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
      </div>

      {/* Purchase Ticket Modal */}
      <PurchaseTicket 
        isOpen={showTicketModal} 
        onClose={handleModalClose} 
        eventData={currentEvent} 
      />
    </div>
  );
}

export default EventDetails;