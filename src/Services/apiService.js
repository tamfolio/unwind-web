import { publicRequest, userRequest } from "../requestMethod";

export const getEventCategories = async () => {
    try {
      const response = await publicRequest.get('events/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching event categories:', error);
      throw error;
    }
  };

  export const getEvents = async (params = {}) => {
    try {
      const {
        page = 1,
        limit = 10,
        sortOrder = 'ASC',
        categoryId,
        categorySlug,
        organizerId,
        search,
        startDateFrom,
        startDateTo,
        minPrice,
        maxPrice,
        city,
        state,
        country,
        isFeatured,
        isVirtual
      } = params;
  
      // Build query parameters
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortOrder
      });
  
      // Add optional parameters if they exist
      if (categoryId) queryParams.append('categoryId', categoryId);
      if (categorySlug) queryParams.append('categorySlug', categorySlug);
      if (organizerId) queryParams.append('organizerId', organizerId);
      if (search) queryParams.append('search', search);
      if (startDateFrom) queryParams.append('startDateFrom', startDateFrom);
      if (startDateTo) queryParams.append('startDateTo', startDateTo);
      if (minPrice !== undefined) queryParams.append('minPrice', minPrice.toString());
      if (maxPrice !== undefined) queryParams.append('maxPrice', maxPrice.toString());
      if (city) queryParams.append('city', city);
      if (state) queryParams.append('state', state);
      if (country) queryParams.append('country', country);
      if (isFeatured !== undefined) queryParams.append('isFeatured', isFeatured.toString());
      if (isVirtual !== undefined) queryParams.append('isVirtual', isVirtual.toString());
  
      const response = await publicRequest.get(`events?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  };