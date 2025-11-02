import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useSavedEvents, useRemoveBookmark } from '@hooks/useEvents';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

function SavedEvents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10
  });
  const [removingEvents, setRemovingEvents] = useState(new Set()); // Track which events are being removed

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // FIXED: Use the correct Redux path (state.user instead of state.auth)
  const currentUser = useSelector((state) => state.user?.currentUser);
  const reduxToken = currentUser?.access_token;
  const localStorageToken = localStorage.getItem('access_token') || localStorage.getItem('accessToken');
  
  // Use Redux token first, then localStorage as fallback
  const access_token = reduxToken || localStorageToken;

  // Remove bookmark mutation
  const removeBookmarkMutation = useRemoveBookmark({
    onSuccess: (data, variables) => {
      console.log('✅ Bookmark removed successfully');
      queryClient.invalidateQueries(['savedEvents']);
      setRemovingEvents(prev => {
        const newSet = new Set(prev);
        newSet.delete(variables.eventId);
        return newSet;
      });
    },
    onError: (error, variables) => {
      console.error('❌ Failed to remove bookmark:', error);
      setRemovingEvents(prev => {
        const newSet = new Set(prev);
        newSet.delete(variables.eventId);
        return newSet;
      });
    }
  });

  console.log('🔍 Debug Token Info:');
  console.log('  - Redux currentUser:', currentUser);
  console.log('  - Redux token:', reduxToken);
  console.log('  - LocalStorage token:', localStorageToken);
  console.log('  - Final token:', access_token);
  console.log('  - Token exists:', !!access_token);

  // Fetch saved events using the authenticated API
  const { 
    data: savedEventsData, 
    isLoading, 
    error,
    refetch 
  } = useSavedEvents(filters, access_token);

  // Debug the API call results
  console.log('🔍 API Debug Info:');
  console.log('  - savedEventsData:', savedEventsData);
  console.log('  - isLoading:', isLoading);
  console.log('  - error:', error);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update search filter when searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      setFilters(prev => ({ ...prev, search: searchTerm, page: 1 }));
    } else {
      setFilters(prev => {
        const { search, ...rest } = prev;
        return { ...rest, page: 1 };
      });
    }
  }, [searchTerm]);

  // Format event data to match your existing structure
  const formatEventData = (event) => {
    if (!event) return null;
    
    // Handle the event data structure - might be nested under event property
    const eventDetails = event.event || event;
    
    let imageUrl = eventDetails.imageUrl;
    if (!imageUrl || imageUrl.includes('cdn.example.com') || imageUrl.includes('example.com')) {
      // Use your existing unsplash images as fallback
      const imageMap = {
        'tech': "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
        'music': "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=250&fit=crop", 
        'business': "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=250&fit=crop",
        'sports': "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
        'exhibitions': "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=250&fit=crop",
        'religious': "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=250&fit=crop"
      };
      imageUrl = imageMap[eventDetails.category?.slug?.toLowerCase()] || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop";
    }

    // Handle price - the API response doesn't include priceRange, so we'll show a default
    const hasPrice = eventDetails.price !== undefined && eventDetails.price !== null;
    const price = hasPrice ? `₦${eventDetails.price.toLocaleString()}` : 'Free';
    const type = hasPrice && eventDetails.price > 0 ? 'paid' : 'free';

    return {
      id: eventDetails.id,
      title: eventDetails.title,
      date: new Date(eventDetails.startDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      location: `${eventDetails.venue || ''}, ${eventDetails.city || ''}`.replace(/^,\s*/, ''),
      price: price,
      type: type,
      category: eventDetails.category?.name || 'Event',
      image: imageUrl,
    };
  };

  // Get the saved events and filter by search term
  const savedEvents = savedEventsData?.events ? 
    savedEventsData.events.map(formatEventData).filter(event => event) : [];

  const filteredEvents = savedEvents.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle event card click
  const handleEventClick = (eventId) => {
    navigate(`/dashboard/event/${eventId}`);
  };

  // Handle buy/get ticket button click
  const handleTicketClick = (e, eventId, type) => {
    e.stopPropagation();
    navigate(`/dashboard/event/${eventId}`);
  };

  // Handle browse all events
  const handleBrowseAllEvents = () => {
    navigate("/discover-events");
  };

  // Handle remove bookmark click
  const handleRemoveBookmark = async (e, eventId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!access_token) {
      console.log('User not authenticated');
      return;
    }

    if (removingEvents.has(eventId)) {
      // Already processing this event
      return;
    }

    // Add to loading set
    setRemovingEvents(prev => new Set(prev).add(eventId));

    try {
      await removeBookmarkMutation.mutateAsync({ 
        eventId, 
        accessToken: access_token 
      });
    } catch (error) {
      console.error('Remove bookmark operation failed:', error);
      // Error handling is done in the mutation callbacks
    }
  };

  // Show login prompt if no access token
  if (!access_token) {
    return (
      <div className="min-h-screen bg-white">
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
            Sign in to view saved events
          </h2>
          <p className="text-gray-500 text-center mb-8 max-w-md">
            Save events you're interested in and access them here.
          </p>
          
          {/* Debug info in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 max-w-md text-sm">
              <h3 className="font-semibold text-yellow-800 mb-2">🔍 Debug Info:</h3>
              <div className="text-yellow-700 space-y-1">
                <p>Redux Token: {reduxToken ? '✅ Found' : '❌ Missing'}</p>
                <p>LocalStorage Token: {localStorageToken ? '✅ Found' : '❌ Missing'}</p>
                <p>Current User: {currentUser ? '✅ Found' : '❌ Missing'}</p>
              </div>
            </div>
          )}
          
          <Link 
            to="/login"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  // Show error details if there's a 401 error
  if (error && error.message.includes('401')) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl">
            <h2 className="text-2xl font-bold text-red-900 mb-4">
              Authentication Error (401)
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-red-800">Error:</strong>
                <p className="text-red-700">{error.message}</p>
              </div>
              <div>
                <strong className="text-red-800">Token Info:</strong>
                <ul className="text-red-700 ml-4 list-disc">
                  <li>Redux Token: {reduxToken ? 'Present' : 'Missing'}</li>
                  <li>LocalStorage Token: {localStorageToken ? 'Present' : 'Missing'}</li>
                  <li>Using Token: {access_token ? access_token.substring(0, 20) + '...' : 'None'}</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 space-x-3">
              <button 
                onClick={() => refetch()}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
              <button 
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Clear Storage & Reload
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Development Debug Panel */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-blue-50 border-b border-blue-200 p-3 text-sm">
          <div className="max-w-7xl mx-auto">
            <strong className="text-blue-800">🔍 Debug:</strong>
            <span className="text-blue-700 ml-2">
              Token: {access_token ? '✅ Present' : '❌ Missing'} | 
              Loading: {isLoading ? 'Yes' : 'No'} | 
              Error: {error ? 'Yes' : 'No'} |
              Events: {savedEvents.length} |
              API Response: {savedEventsData ? `Total: ${savedEventsData.total}` : 'None'}
            </span>
          </div>
        </div>
      )}

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
        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
                <div className="h-52 bg-gray-200"></div>
                <div className="p-5">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-5"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    <div className="h-8 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State (non-401 errors) */}
        {error && !error.message.includes('401') && (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Failed to load saved events
            </h2>
            <p className="text-gray-500 text-center mb-8 max-w-md">
              {error.message}
            </p>
            <button 
              onClick={() => refetch()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Success State - Events or Empty */}
        {!isLoading && !error && (
          <>
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
                      {/* Bookmark Button - Your existing style with remove functionality */}
                      <div 
                        className={`w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 absolute top-3 right-3 ${
                          removingEvents.has(event.id) ? 'opacity-50' : 'hover:bg-purple-700'
                        }`}
                        onClick={(e) => handleRemoveBookmark(e, event.id)}
                        title="Remove from saved events"
                      >
                        {removingEvents.has(event.id) ? (
                          // Loading spinner
                          <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                          <img src="/assets/book-saved.png" alt="Remove bookmark" className="w-5 h-5" />
                        )}
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
              /* Empty State - No Saved Events */
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
                    : "Start exploring events and save the ones you're interested in to see them here!"}
                </p>
                
                {/* Success message in development to confirm API is working */}
                {process.env.NODE_ENV === 'development' && savedEventsData && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 max-w-md text-sm">
                    <h3 className="font-semibold text-green-800 mb-2">✅ API Working!</h3>
                    <p className="text-green-700">
                      Successfully fetched data. Total saved events: {savedEventsData.total}
                    </p>
                  </div>
                )}
                
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
          </>
        )}
      </div>
    </div>
  );
}

export default SavedEvents;