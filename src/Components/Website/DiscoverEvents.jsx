import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEvents, useCategories } from "../../hooks/useEvents";

const DiscoverEvents = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're in the dashboard
  const isDashboard = location.pathname.includes('/dashboard');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch categories first
  const { 
    data: categoriesData, 
    isLoading: categoriesLoading,
    error: categoriesError 
  } = useCategories();

  // Build filters for API call (after categoriesData is available)
  const filters = {
    page: currentPage,
    limit: 6, // Show 6 events per page to match your grid
    sortOrder: 'ASC'
  };

  // Only add categoryId if a specific category is selected (not "All")
  if (activeCategory !== "All") {
    // Find the selected category ID from the categories data
    const selectedCategory = categoriesData?.find(cat => cat.name === activeCategory);
    if (selectedCategory) {
      filters.categoryId = selectedCategory.id;  // Use categoryId, not categorySlug
    }
  }
  // When "All" is selected, don't add any category filter - this will return all events

  // Fetch events using the filters
  const { 
    data: eventsData, 
    isLoading: eventsLoading, 
    error: eventsError,
    refetch: refetchEvents 
  } = useEvents(filters);

  // Define events early to avoid "Cannot access before initialization" error
  const events = eventsData?.events || [];
  const pagination = eventsData?.pagination || {};

  // Format categories for the UI (add "All" option and map to expected format)
  // Make sure categoriesData is available before using it
  const categories = [
    { name: "All", icon: "📋", slug: "all" },
    ...(categoriesData || []).map(category => ({
      name: category.name,
      icon: getCategoryIcon(category.name),
      slug: category.slug
    }))
  ];

  // Debug logging
  console.log('=== DiscoverEvents Debug ===');
  console.log('Active category:', activeCategory);
  console.log('Current page:', currentPage);
  console.log('Filters being sent to API:', filters);
  console.log('Categories data:', categoriesData);
  console.log('Categories loading:', categoriesLoading);
  console.log('Categories error:', categoriesError);
  console.log('Events data:', eventsData);
  console.log('Events loading:', eventsLoading);
  console.log('Events error:', eventsError);
  console.log('Events array length:', events.length);
  console.log('Categories array:', categories);
  console.log('================================');

  // Helper function to get category icons
  function getCategoryIcon(categoryName) {
    const iconMap = {
      "Music": "🎵",
      "Tech": "💻", 
      "Sports": "🏆",
      "Business": "💼",
      "Food & Drinks": "🍷",
      "Gaming": "🎮",
      "Exhibitions": "🎪",
      "Religious": "🙏"
    };
    return iconMap[categoryName] || "📅";
  }

  // Format events for display
  const formatEvent = (event) => {
    // Handle example/fake image URLs
    let imageUrl = event.imageUrl;
    if (!imageUrl || imageUrl.includes('cdn.example.com') || imageUrl.includes('example.com')) {
      // Use local fallback images based on category
      const categoryImageMap = {
        'business': '/assets/event1.png',
        'music': '/assets/event2.png', 
        'tech': '/assets/event3.png',
        'sports': '/assets/event1.png',
        'exhibitions': '/assets/event2.png',
        'religious': '/assets/event3.png'
      };
      imageUrl = categoryImageMap[event.category.slug.toLowerCase()] || '/assets/event1.png';
    }

    return {
      id: event.id,
      title: event.title,
      category: event.category.name,
      date: new Date(event.startDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      location: `${event.venue}, ${event.city}`,
      price: event.priceRange.min === 0 ? "Free" : `₦ ${event.priceRange.min.toLocaleString()}`,
      image: imageUrl, // Use the processed image URL
      isPaid: event.priceRange.min > 0,
      isFeatured: event.isFeatured,
      isVirtual: event.isVirtual,
      venue: event.venue,
      city: event.city,
      state: event.state,
      country: event.country,
      priceRange: event.priceRange,
      ticketTypesCount: event.ticketTypesCount
    };
  };

  const handleCategoryChange = (categoryName) => {
    setActiveCategory(categoryName);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleEventClick = (eventId) => {
    // Navigate based on current location
    if (isDashboard) {
      navigate(`/dashboard/event/${eventId}`);
    } else {
      navigate(`/discover-events/${eventId}`);
    }
  };

  // Loading state
  if (eventsLoading && !eventsData) {
    return (
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading events...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (eventsError) {
    return (
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading events: {eventsError.message}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          {categoriesLoading ? (
            <div className="text-gray-500">Loading categories...</div>
          ) : categoriesError ? (
            <div className="text-red-500">
              Error loading categories: {categoriesError.message}
              <button 
                onClick={() => window.location.reload()}
                className="ml-2 text-purple-600 underline"
              >
                Retry
              </button>
            </div>
          ) : (
            categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryChange(category.name)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-200 ${
                  activeCategory === category.name
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-purple-600 hover:text-purple-600"
                }`}
              >
                <span className="text-sm">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))
          )}
        </div>

        {/* Event Cards */}
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-2">
            Showing {events.length} events {activeCategory !== "All" && `in ${activeCategory}`}
            {eventsData?.pagination && ` (Page ${currentPage} of ${eventsData.pagination.totalPages})`}
          </div>
          {eventsError && (
            <div className="text-red-500 mb-4">
              Error loading events: {eventsError.message}
              <button 
                onClick={() => refetchEvents()}
                className="ml-2 text-purple-600 underline"
              >
                Retry
              </button>
            </div>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.length > 0 ? (
            events.map((event) => {
              try {
                const formattedEvent = formatEvent(event);
                return (
                  <div
                    key={event.id}
                    onClick={() => handleEventClick(event.id)}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  >
                    {/* Event Image */}
                    <div className="relative h-64">
                      <img
                        src={formattedEvent.image}
                        alt={formattedEvent.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Multiple fallback levels
                          const fallbacks = ['/assets/event1.png', '/assets/event2.png', '/assets/event3.png'];
                          const currentSrc = e.target.src;
                          
                          // Find the next fallback that hasn't been tried
                          for (let fallback of fallbacks) {
                            if (!currentSrc.includes(fallback)) {
                              console.log(`Image failed to load: ${currentSrc}, trying fallback: ${fallback}`);
                              e.target.src = fallback;
                              break;
                            }
                          }
                        }}
                      />
                      {/* Event Category Badge */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg px-3 py-1">
                        <span className="text-sm font-medium text-gray-700">
                          {formattedEvent.category}
                        </span>
                      </div>
                      {/* Featured Badge */}
                      {formattedEvent.isFeatured && (
                        <div className="absolute top-4 left-4 mt-10 bg-purple-600 text-white rounded-lg px-2 py-1">
                          <span className="text-xs font-medium">Featured</span>
                        </div>
                      )}
                      {/* Virtual Badge */}
                      {formattedEvent.isVirtual && (
                        <div className="absolute top-4 left-4 mt-20 bg-blue-600 text-white rounded-lg px-2 py-1">
                          <span className="text-xs font-medium">Virtual</span>
                        </div>
                      )}
                      {/* Bookmark Icon */}
                      <div className="w-[32px] h-[32px] bg-[rgba(255,255,255,0.4)] absolute top-4 right-4 rounded-[8px] flex items-center justify-center">
                        <img src="/assets/book-saved.png" alt="" />
                      </div>
                    </div>

                    {/* Event Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {formattedEvent.title}
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
                        <span className="text-gray-600">{formattedEvent.date}</span>
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
                          {formattedEvent.location}
                        </span>
                      </div>

                      {/* Price and Button */}
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-purple-600">
                          {formattedEvent.price}
                          {formattedEvent.priceRange.max > formattedEvent.priceRange.min && (
                            <span className="text-sm text-gray-500 ml-1">
                              - ₦ {formattedEvent.priceRange.max.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <button
                          className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEventClick(event.id);
                          }}
                        >
                          {formattedEvent.isPaid ? "Buy Tickets" : "Get Ticket"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              } catch (error) {
                console.error('Error rendering event:', event, error);
                return (
                  <div key={event.id} className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <p>Error rendering event: {event.title}</p>
                    <p className="text-sm">{error.message}</p>
                  </div>
                );
              }
            })
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">
                {eventsLoading ? 'Loading events...' : 'No events found.'}
              </p>
            </div>
          )}
        </div>

        {/* Show message when no events found */}
        {events.length === 0 && !eventsLoading && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">
              No events found in this category.
            </p>
            <button
              onClick={() => handleCategoryChange("All")}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Show all events
            </button>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mb-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            
            <span className="text-gray-600">
              Page {currentPage} of {pagination.totalPages}
            </span>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= pagination.totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}

        {/* View All Events Button - Only show on website, not dashboard */}
        {!isDashboard && (
          <div className="text-center">
            <Link to="/discover-events">
              <button className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
                View All Events
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverEvents;