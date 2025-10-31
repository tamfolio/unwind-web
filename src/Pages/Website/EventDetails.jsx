import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  Globe,
  Mail,
  Info,
  Navigation,
} from "lucide-react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { useEvent } from "../../hooks/useEvents";
import PurchaseTicket from "../../Components/App/Dashboard/Attendee/Components/Modals/PurchaseTicket";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTicket, setSelectedTicket] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showTicketModal, setShowTicketModal] = useState(false);

  // Check if we're in the dashboard
  const isDashboard = location.pathname.includes('/dashboard');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch event data using React Query
  const { 
    data: eventData, 
    isLoading: eventLoading, 
    error: eventError,
    refetch: refetchEvent
  } = useEvent(id);

  // Format event data for display
  const formatEventData = (apiEvent) => {
    if (!apiEvent) return null;
    
    console.log('EventDetails - Formatting enhanced API event data:', apiEvent);
    
    // Handle fake image URLs with better fallbacks
    let imageUrl = apiEvent.imageUrl;
    let bannerUrl = apiEvent.bannerUrl;
    
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
    
    if (!bannerUrl || bannerUrl.includes('cdn.example.com')) {
      bannerUrl = imageUrl; // Use main image as banner fallback
    }

    // Format dates and times
    const startDate = new Date(apiEvent.startDate);
    const endDate = new Date(apiEvent.endDate);
    
    return {
      id: apiEvent.id,
      title: apiEvent.title,
      slug: apiEvent.slug,
      description: apiEvent.description || `Join us for an unforgettable experience at ${apiEvent.title}`,
      category: apiEvent.category?.name || 'Event',
      categorySlug: apiEvent.category?.slug,
      
      // Enhanced date/time formatting
      date: startDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      shortDate: startDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      time: `${startDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      })} - ${endDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      })}`,
      timezone: apiEvent.timezone,
      
      // Enhanced location data
      venue: apiEvent.venue,
      address: apiEvent.address,
      city: apiEvent.city,
      state: apiEvent.state,
      country: apiEvent.country,
      fullAddress: `${apiEvent.venue}, ${apiEvent.address}, ${apiEvent.city}, ${apiEvent.state}, ${apiEvent.country}`,
      directions: apiEvent.directions,
      additionalInfo: apiEvent.additionalInfo,
      
      // Images
      image: imageUrl,
      bannerUrl: bannerUrl,
      
      // Event flags
      isFeatured: apiEvent.isFeatured,
      isVirtual: apiEvent.isVirtual,
      
      // Organizer info
      organizer: apiEvent.organizer,
      
      // Pricing
      priceRange: apiEvent.priceRange,
      minPrice: apiEvent.priceRange?.min || 0,
      maxPrice: apiEvent.priceRange?.max || 0,
      
      // Ticket types from API
      ticketTypes: apiEvent.ticketTypes || [],
      
      // Calculate total attendees and availability
      totalCapacity: apiEvent.ticketTypes?.reduce((total, ticket) => total + ticket.quantity, 0) || 0,
      totalSold: apiEvent.ticketTypes?.reduce((total, ticket) => total + ticket.sold, 0) || 0,
      totalAvailable: apiEvent.ticketTypes?.reduce((total, ticket) => total + ticket.available, 0) || 0,
    };
  };

  // Set default ticket when data loads
  useEffect(() => {
    if (eventData?.ticketTypes && eventData.ticketTypes.length > 0 && !selectedTicket) {
      setSelectedTicket(eventData.ticketTypes[0].id);
    }
  }, [eventData, selectedTicket]);

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

  const calculateTotal = () => {
    const selectedTicketType = currentEvent.ticketTypes.find(
      (ticket) => ticket.id === selectedTicket
    );
    return selectedTicketType ? selectedTicketType.price * quantity : 0;
  };

  const getAvailabilityStatus = (ticket) => {
    const availablePercentage = (ticket.available / ticket.quantity) * 100;
    if (availablePercentage <= 10) return { status: 'limited', color: 'text-red-600', text: 'Only few left!' };
    if (availablePercentage <= 30) return { status: 'selling-fast', color: 'text-orange-600', text: 'Selling fast' };
    return { status: 'available', color: 'text-green-600', text: 'Available' };
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
          src={currentEvent.bannerUrl}
          alt={currentEvent.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.src = currentEvent.image;
          }}
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
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block bg-white bg-opacity-20 text-white text-sm px-3 py-1 rounded-full">
                  {currentEvent.category}
                </span>
                {currentEvent.isFeatured && (
                  <span className="inline-flex items-center bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </span>
                )}
                {currentEvent.isVirtual && (
                  <span className="inline-flex items-center bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    <Globe className="w-3 h-3 mr-1" />
                    Virtual
                  </span>
                )}
              </div>
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
              <div className="flex items-center gap-2">
                <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium">
                  {currentEvent.category}
                </span>
                {currentEvent.isFeatured && (
                  <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </span>
                )}
                {currentEvent.isVirtual && (
                  <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    <Globe className="w-3 h-3 mr-1" />
                    Virtual
                  </span>
                )}
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
                    <span>{currentEvent.time} ({currentEvent.timezone})</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-purple-600" />
                    <span>{currentEvent.venue}, {currentEvent.city}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-3 text-purple-600" />
                    <span>{currentEvent.totalSold} attending • {currentEvent.totalAvailable} tickets left</span>
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
                    <span>{currentEvent.venue}, {currentEvent.city}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{currentEvent.totalSold} attending</span>
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
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {currentEvent.description}
              </p>

              <h3 className="text-lg font-semibold mb-3">Event Details:</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Venue</span>
                    <p className="text-gray-900">{currentEvent.venue}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Address</span>
                    <p className="text-gray-900">{currentEvent.address}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Location</span>
                    <p className="text-gray-900">{currentEvent.city}, {currentEvent.state}, {currentEvent.country}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Category</span>
                    <p className="text-gray-900">{currentEvent.category}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Organizer</span>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900">{currentEvent.organizer?.name}</p>
                      {currentEvent.organizer?.email && (
                        <a 
                          href={`mailto:${currentEvent.organizer.email}`}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Timezone</span>
                    <p className="text-gray-900">{currentEvent.timezone}</p>
                  </div>
                </div>
              </div>

              {currentEvent.additionalInfo && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">Additional Information</h4>
                      <p className="text-blue-800 text-sm">{currentEvent.additionalInfo}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Directions */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Location & Directions</h2>
              
              {currentEvent.directions && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <Navigation className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-yellow-900 mb-1">Directions</h4>
                      <p className="text-yellow-800 text-sm">{currentEvent.directions}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Interactive Map</p>
                  <p className="text-sm">{currentEvent.fullAddress}</p>
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
                  {currentEvent.ticketTypes.map((ticket) => {
                    const availability = getAvailabilityStatus(ticket);
                    return (
                      <div
                        key={ticket.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedTicket === ticket.id
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-gray-300"
                        } ${ticket.available === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => ticket.available > 0 && setSelectedTicket(ticket.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{ticket.name}</h3>
                          <span className="font-bold text-lg">
                            ₦{ticket.price.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {ticket.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${availability.color}`}>
                            {ticket.available === 0 ? 'Sold Out' : availability.text}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">
                              {ticket.available} of {ticket.quantity} left
                            </span>
                            {selectedTicket === ticket.id && ticket.available > 0 && (
                              <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {selectedTicket && (
                  <>
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
                        <span>Tickets ({quantity}x)</span>
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
                  </>
                )}

                <p className="text-center text-sm text-gray-500">
                  <Users className="w-4 h-4 inline mr-1" />
                  {currentEvent.totalSold} people attending
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