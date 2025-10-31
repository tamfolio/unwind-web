// API base configuration
const API_BASE_URL = 'https://api.gettounwind.com';

// API service functions
export const eventsAPI = {
  // Fetch events with filters and pagination
  getEvents: async (params = {}) => {
    console.log('🚀 getEvents called with params:', params);
    
    const defaultParams = {
      page: 1,
      limit: 10,
      sortOrder: 'ASC'
    };

    const queryParams = { ...defaultParams, ...params };
    console.log('📋 Query params after merge:', queryParams);
    
    // Remove undefined/null values
    const cleanParams = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    console.log('🧹 Clean params:', cleanParams);

    const searchParams = new URLSearchParams(cleanParams);
    const url = `${API_BASE_URL}/events?${searchParams}`;
    
    console.log('🌐 Making API call to:', url);
    console.log('📝 Search params string:', searchParams.toString());
    
    try {
      const response = await fetch(url);
      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error:', errorText);
        throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('✅ Raw API Response:', result);
      console.log('📊 Events in response:', result.data?.length || 0);
      console.log('📄 Meta in response:', result.meta);
      
      // Return in a format that matches the expected structure
      const formattedResponse = {
        events: result.data || [],
        pagination: result.meta || {},
        total: result.meta?.total || 0,
        totalPages: result.meta?.totalPages || 1,
        currentPage: result.meta?.page || 1,
      };
      
      console.log('🔄 Formatted response:', formattedResponse);
      console.log('📈 Events array length:', formattedResponse.events.length);
      
      return formattedResponse;
    } catch (error) {
      console.error('💥 Error in getEvents:', error);
      throw error;
    }
  },

  // Fetch event categories
  getCategories: async () => {
    const url = `${API_BASE_URL}/events/categories`;
    console.log('Making categories API call to:', url);
    
    const response = await fetch(url);
    
    console.log('Categories response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Categories API Error:', errorText);
      throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('Categories API Response:', result);
    
    return result;
  },

  // 🆕 ADD THIS MISSING FUNCTION
  // Fetch single event by ID
  getEventById: async (eventId) => {
    console.log('🎯 getEventById called with ID:', eventId);
    
    const url = `${API_BASE_URL}/events/${eventId}`;
    console.log('🌐 Making single event API call to:', url);
    
    try {
      const response = await fetch(url);
      console.log('📡 Single event response status:', response.status);
      console.log('📡 Single event response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Single event API Error:', errorText);
        throw new Error(`Failed to fetch event: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('✅ Single event API Response:', result);
      
      return result;
    } catch (error) {
      console.error('💥 Error in getEventById:', error);
      throw error;
    }
  }
};