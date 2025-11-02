import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddBookmark, useRemoveBookmark } from '@hooks/useEvents';
import { useQueryClient } from '@tanstack/react-query';

const BookmarkButton = ({ 
  eventId, 
  isBookmarked = false, 
  className = "",
  size = "default",
  showToast = true 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  // Get access token from Redux
  const { access_token } = useSelector((state) => state.user?.currentUser || {});

  // Bookmark mutations
  const addBookmarkMutation = useAddBookmark({
    onSuccess: () => {
      console.log('✅ Bookmark added successfully');
      // Invalidate and refetch saved events to update the list
      queryClient.invalidateQueries(['savedEvents']);
      setIsLoading(false);
      if (showToast) {
        // You can add a toast notification here
        console.log('Event saved to bookmarks!');
      }
    },
    onError: (error) => {
      console.error('❌ Failed to add bookmark:', error);
      setIsLoading(false);
      if (showToast) {
        // You can add an error toast here
        console.error('Failed to save event:', error.message);
      }
    }
  });

  const removeBookmarkMutation = useRemoveBookmark({
    onSuccess: () => {
      console.log('✅ Bookmark removed successfully');
      // Invalidate and refetch saved events to update the list
      queryClient.invalidateQueries(['savedEvents']);
      setIsLoading(false);
      if (showToast) {
        // You can add a toast notification here
        console.log('Event removed from bookmarks!');
      }
    },
    onError: (error) => {
      console.error('❌ Failed to remove bookmark:', error);
      setIsLoading(false);
      if (showToast) {
        // You can add an error toast here
        console.error('Failed to remove event:', error.message);
      }
    }
  });

  const handleBookmarkClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!access_token) {
      console.log('User not authenticated');
      if (showToast) {
        console.log('Please sign in to save events');
      }
      return;
    }

    if (isLoading) return;

    setIsLoading(true);

    try {
      if (isBookmarked) {
        // Remove bookmark
        await removeBookmarkMutation.mutateAsync({ 
          eventId, 
          accessToken: access_token 
        });
      } else {
        // Add bookmark
        await addBookmarkMutation.mutateAsync({ 
          eventId, 
          accessToken: access_token 
        });
      }
    } catch (error) {
      console.error('Bookmark operation failed:', error);
      setIsLoading(false);
    }
  };

  // Button size variants
  const sizeClasses = {
    small: "w-6 h-6",
    default: "w-8 h-8", 
    large: "w-10 h-10"
  };

  const iconSize = {
    small: "w-3 h-3",
    default: "w-4 h-4",
    large: "w-5 h-5"
  };

  return (
    <button
      onClick={handleBookmarkClick}
      disabled={isLoading || !access_token}
      className={`
        ${sizeClasses[size]} 
        bg-white/90 backdrop-blur rounded-lg 
        flex items-center justify-center
        hover:bg-white transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      title={
        !access_token 
          ? "Sign in to save events" 
          : isBookmarked 
            ? "Remove from saved events" 
            : "Save event"
      }
    >
      {isLoading ? (
        <div className={`${iconSize[size]} animate-spin rounded-full border-2 border-purple-600 border-t-transparent`} />
      ) : (
        <svg
          className={`${iconSize[size]} ${isBookmarked ? 'text-purple-600 fill-current' : 'text-gray-600'}`}
          fill={isBookmarked ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      )}
    </button>
  );
};

export default BookmarkButton;