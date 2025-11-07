import { useQuery } from '@tanstack/react-query';
import { eventsAPI } from '../Services/api'; // Same path as useEvents
import { useSelector } from 'react-redux';

// Query keys for cache management
export const dashboardQueryKeys = {
  summary: (accessToken) => ['dashboardSummary', accessToken],
};

/**
 * Hook to fetch dashboard summary with authentication
 * @param {Object} options - React Query options
 */
export const useDashboardSummary = (options = {}) => {
  // Get user token from Redux store - FIXED: Use the correct token path
  const currentUser = useSelector((state) => state.user?.currentUser);
  const reduxToken = currentUser?.access_token;
  const localStorageToken = localStorage.getItem('access_token') || localStorage.getItem('accessToken');
  
  // Use Redux token first, then localStorage as fallback
  const accessToken = reduxToken || localStorageToken;

  console.log('📊 useDashboardSummary hook called');
  console.log('🔑 Access token available:', !!accessToken);
  console.log('🔍 Token source:', reduxToken ? 'Redux' : localStorageToken ? 'LocalStorage' : 'None');

  return useQuery({
    queryKey: dashboardQueryKeys.summary(accessToken),
    queryFn: () => {
      console.log('📊 Dashboard summary queryFn called - calling eventsAPI.getDashboardSummary');
      return eventsAPI.getDashboardSummary(accessToken);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!accessToken, // Only run query if user is authenticated
    retry: (failureCount, error) => {
      // Don't retry on authentication errors
      if (error?.message?.includes('Authentication failed')) {
        return false;
      }
      return failureCount < 3;
    },
    ...options,
  });
};