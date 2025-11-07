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
  },

  // Fetch payment methods
  getPaymentMethods: async () => {
    console.log('💳 getPaymentMethods called');
    
    const url = `${API_BASE_URL}/payment-methods`;
    console.log('🌐 Making payment methods API call to:', url);
    
    try {
      const response = await fetch(url);
      console.log('📡 Payment methods response status:', response.status);
      console.log('📡 Payment methods response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Payment methods API Error:', errorText);
        throw new Error(`Failed to fetch payment methods: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('✅ Payment methods API Response:', result);
      
      return result;
    } catch (error) {
      console.error('💥 Error in getPaymentMethods:', error);
      throw error;
    }
  },

  // Fetch saved events (bookmarks) with authentication
  getSavedEvents: async (params = {}, accessToken) => {
    console.log('🔖 getSavedEvents called with params:', params);
    console.log('🔑 Access token provided:', !!accessToken);
    
    if (!accessToken) {
      throw new Error('Access token is required for fetching saved events');
    }

    const defaultParams = {
      page: 1,
      limit: 10
    };

    const queryParams = { ...defaultParams, ...params };
    console.log('📋 Bookmarks query params after merge:', queryParams);
    
    // Remove undefined/null values
    const cleanParams = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    console.log('🧹 Clean bookmarks params:', cleanParams);

    const searchParams = new URLSearchParams(cleanParams);
    const url = `${API_BASE_URL}/attendees/bookmarks?${searchParams}`;
    
    console.log('🌐 Making saved events API call to:', url);
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📡 Saved events response status:', response.status);
      console.log('📡 Saved events response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Saved events API Error:', errorText);
        
        if (response.status === 401) {
          throw new Error('Authentication failed - token may be expired');
        }
        
        throw new Error(`Failed to fetch saved events: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('✅ Saved events API Response:', result);
      console.log('📊 Saved events in response:', result.data?.length || 0);
      console.log('📄 Saved events meta:', result.meta);
      
      // Return in a format that matches the expected structure
      const formattedResponse = {
        events: result.data || [],
        pagination: result.meta || {},
        total: result.meta?.total || 0,
        totalPages: result.meta?.totalPages || 1,
        currentPage: result.meta?.page || 1,
      };
      
      console.log('🔄 Formatted saved events response:', formattedResponse);
      
      return formattedResponse;
    } catch (error) {
      console.error('💥 Error in getSavedEvents:', error);
      throw error;
    }
  },

  // Add bookmark (save event)
  addBookmark: async (eventId, accessToken) => {
    console.log('➕ addBookmark called with eventId:', eventId);
    console.log('🔑 Access token provided:', !!accessToken);
    
    if (!accessToken) {
      throw new Error('Access token is required for adding bookmarks');
    }

    if (!eventId) {
      throw new Error('Event ID is required for adding bookmarks');
    }

    const url = `${API_BASE_URL}/attendees/bookmarks/${eventId}`;
    
    console.log('🌐 Making add bookmark API call to:', url);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📡 Add bookmark response status:', response.status);
      console.log('📡 Add bookmark response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Add bookmark API Error:', errorText);
        
        if (response.status === 401) {
          throw new Error('Authentication failed - token may be expired');
        }
        
        throw new Error(`Failed to add bookmark: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('✅ Add bookmark API Response:', result);
      
      return result;
    } catch (error) {
      console.error('💥 Error in addBookmark:', error);
      throw error;
    }
  },

  // Remove bookmark (unsave event)
  removeBookmark: async (eventId, accessToken) => {
    console.log('➖ removeBookmark called with eventId:', eventId);
    console.log('🔑 Access token provided:', !!accessToken);
    
    if (!accessToken) {
      throw new Error('Access token is required for removing bookmarks');
    }

    if (!eventId) {
      throw new Error('Event ID is required for removing bookmarks');
    }

    const url = `${API_BASE_URL}/attendees/bookmarks/${eventId}`;
    
    console.log('🌐 Making remove bookmark API call to:', url);
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📡 Remove bookmark response status:', response.status);
      console.log('📡 Remove bookmark response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Remove bookmark API Error:', errorText);
        
        if (response.status === 401) {
          throw new Error('Authentication failed - token may be expired');
        }
        
        throw new Error(`Failed to remove bookmark: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('✅ Remove bookmark API Response:', result);
      
      return result;
    } catch (error) {
      console.error('💥 Error in removeBookmark:', error);
      throw error;
    }
  },

  // Get dashboard summary with authentication
  getDashboardSummary: async (accessToken) => {
    console.log('📊 getDashboardSummary called');
    console.log('🔑 Access token provided:', !!accessToken);
    
    if (!accessToken) {
      throw new Error('Access token is required for fetching dashboard summary');
    }

    const url = `${API_BASE_URL}/attendees/dashboard/summary`;
    
    console.log('🌐 Making dashboard summary API call to:', url);
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📡 Dashboard summary response status:', response.status);
      console.log('📡 Dashboard summary response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Dashboard summary API Error:', errorText);
        
        if (response.status === 401) {
          throw new Error('Authentication failed - token may be expired');
        }
        
        throw new Error(`Failed to fetch dashboard summary: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('✅ Dashboard summary API Response:', result);
      
      return result;
    } catch (error) {
      console.error('💥 Error in getDashboardSummary:', error);
      throw error;
    }
  },

  // Get user tickets with authentication and pagination
  getTickets: async (params = {}, accessToken) => {
    console.log('🎫 getTickets called with params:', params);
    console.log('🔑 Access token provided:', !!accessToken);
    
    if (!accessToken) {
      throw new Error('Access token is required for fetching tickets');
    }

    const defaultParams = {
      page: 1,
      limit: 10
    };

    const queryParams = { ...defaultParams, ...params };
    console.log('📋 Tickets query params after merge:', queryParams);
    
    // Remove undefined/null values
    const cleanParams = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    console.log('🧹 Clean tickets params:', cleanParams);

    const searchParams = new URLSearchParams(cleanParams);
    const url = `${API_BASE_URL}/attendees/tickets?${searchParams}`;
    
    console.log('🌐 Making tickets API call to:', url);
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📡 Tickets response status:', response.status);
      console.log('📡 Tickets response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Tickets API Error:', errorText);
        
        if (response.status === 401) {
          throw new Error('Authentication failed - token may be expired');
        }
        
        throw new Error(`Failed to fetch tickets: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('✅ Tickets API Response:', result);
      console.log('📊 Tickets in response:', result.data?.length || 0);
      console.log('📄 Tickets meta:', result.meta);
      
      // Return in a format that matches the expected structure
      const formattedResponse = {
        tickets: result.data || [],
        pagination: result.meta || {},
        total: result.meta?.total || 0,
        totalPages: result.meta?.totalPages || 1,
        currentPage: result.meta?.page || 1,
      };
      
      console.log('🔄 Formatted tickets response:', formattedResponse);
      
      return formattedResponse;
    } catch (error) {
      console.error('💥 Error in getTickets:', error);
      throw error;
    }
  },

  // Purchase tickets
  purchaseTickets: async (purchaseData, accessToken) => {
    console.log('🛒 purchaseTickets called with data:', purchaseData);
    console.log('🔑 Access token provided:', !!accessToken);
    
    if (!accessToken) {
      throw new Error('Access token is required for purchasing tickets');
    }

    const url = `${API_BASE_URL}/events/tickets/purchase`;
    
    console.log('🌐 Making purchase tickets API call to:', url);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(purchaseData)
      });
      
      console.log('📡 Purchase tickets response status:', response.status);
      console.log('📡 Purchase tickets response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Purchase tickets API Error:', errorText);
        
        if (response.status === 401) {
          throw new Error('Authentication failed - token may be expired');
        }
        
        throw new Error(`Failed to purchase tickets: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('✅ Purchase tickets API Response:', result);
      
      return result;
    } catch (error) {
      console.error('💥 Error in purchaseTickets:', error);
      throw error;
    }
  },

  // Verify payment
  verifyPayment: async (reference, accessToken) => {
    console.log('✅ verifyPayment called with reference:', reference);
    console.log('🔑 Access token provided:', !!accessToken);
    
    if (!accessToken) {
      throw new Error('Access token is required for verifying payment');
    }

    if (!reference) {
      throw new Error('Payment reference is required');
    }

    const url = `${API_BASE_URL}/events/tickets/verify/${reference}`;
    
    console.log('🌐 Making verify payment API call to:', url);
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📡 Verify payment response status:', response.status);
      console.log('📡 Verify payment response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Verify payment API Error:', errorText);
        
        if (response.status === 401) {
          throw new Error('Authentication failed - token may be expired');
        }
        
        throw new Error(`Failed to verify payment: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('✅ Verify payment API Response:', result);
      
      return result;
    } catch (error) {
      console.error('💥 Error in verifyPayment:', error);
      throw error;
    }
  }
};