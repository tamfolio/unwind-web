import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { eventsAPI } from '../Services/api'; // ⚠️ Make sure this path matches your folder structure

// Query keys for cache management
export const queryKeys = {
  events: (filters) => ['events', filters],
  categories: ['categories'],
};

/**
 * Hook to fetch events with filtering and pagination
 * @param {Object} filters - Event filter parameters
 * @param {number} filters.page - Page number (default: 1)
 * @param {number} filters.limit - Items per page (default: 10)
 * @param {string} filters.sortOrder - Sort order: ASC or DESC (default: ASC)
 * @param {string} filters.categoryId - Filter by category ID (UUID)
 * @param {string} filters.categorySlug - Filter by category slug
 * @param {string} filters.organizerId - Filter by organizer ID (UUID)
 * @param {string} filters.search - Search by event title or description
 * @param {string} filters.startDateFrom - Filter events starting from this date
 * @param {string} filters.startDateTo - Filter events starting until this date
 * @param {number} filters.minPrice - Minimum ticket price
 * @param {number} filters.maxPrice - Maximum ticket price
 * @param {string} filters.city - City filter
 * @param {string} filters.state - State filter
 * @param {string} filters.country - Country filter
 * @param {boolean} filters.isFeatured - Filter for featured events
 * @param {boolean} filters.isVirtual - Filter for virtual events
 * @param {string} filters.sortBy - Sort by field
 * @param {Object} options - React Query options
 */
export const useEvents = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: queryKeys.events(filters),
    queryFn: () => eventsAPI.getEvents(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Hook to fetch event categories
 * @param {Object} options - React Query options
 */
export const useCategories = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: eventsAPI.getCategories,
    staleTime: 30 * 60 * 1000, // 30 minutes (categories change less frequently)
    ...options,
  });
};

/**
 * Hook to fetch single event by ID
 * @param {string} eventId - Event ID to fetch
 * @param {Object} options - React Query options
 */
export const useEvent = (eventId, options = {}) => {
  console.log('🎣 useEvent hook called with eventId:', eventId);
  console.log('🎣 useEvent hook options:', options);
  
  return useQuery({
    queryKey: ['event', eventId],
    queryFn: () => {
      console.log('🎣 useEvent queryFn called - about to call eventsAPI.getEventById');
      return eventsAPI.getEventById(eventId);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!eventId, // Only run query if eventId exists
    ...options,
  });
};

export const useEventsWithPagination = (initialFilters = {}) => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sortOrder: 'ASC',
    ...initialFilters,
  });

  const query = useEvents(filters);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 })); // Reset to page 1 when filters change
  };

  const nextPage = () => {
    setFilters(prev => ({ ...prev, page: prev.page + 1 }));
  };

  const prevPage = () => {
    setFilters(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }));
  };

  const goToPage = (page) => {
    setFilters(prev => ({ ...prev, page: Math.max(1, page) }));
  };

  return {
    ...query,
    filters,
    updateFilters,
    nextPage,
    prevPage,
    goToPage,
  };
};