# TanStack Query Implementation for Reviews

## Overview

This implementation provides a robust data fetching solution for the reviews component using TanStack Query, complete with loading states and error handling.

## Features

- **TanStack Query**: Efficient data fetching with caching, background updates, and optimizations
- **Skeleton Loading**: Animated skeleton UI that matches the exact structure of the reviews component
- **Error Handling**: Graceful fallback to static data when API fails
- **Type Safety**: Full TypeScript support with proper type definitions
- **Performance**: Optimized with stale-while-revalidate strategy

## Files Created/Modified

### Core Files

- `providers/query-provider.tsx` - QueryClient provider setup
- `hooks/use-reviews.ts` - Custom hook for reviews data fetching
- `types/review.ts` - TypeScript interfaces for review data
- `service/review.ts` - Updated API service with proper typing
- `components/reviews-skeleton.tsx` - Loading skeleton component
- `app/api/review/route.ts` - Mock API endpoint for testing

### Updated Files

- `app/layout.tsx` - Added QueryProvider wrapper
- `components/reviews.tsx` - Integrated TanStack Query with loading states

## Usage

### Basic Usage

```tsx
import { Reviews } from "@/components/reviews";

export function ReviewsSection() {
  return (
    <section>
      <Reviews />
    </section>
  );
}
```

### Advanced Usage with Options

```tsx
import { useReviews } from "@/hooks/use-reviews";

export function CustomReviews() {
  const { data, isLoading, error } = useReviews({
    enabled: true,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Custom handling logic here
}
```

## API Endpoint

The implementation includes a mock API endpoint at `/api/review` that:

- Simulates network delay (1 second) to demonstrate loading states
- Supports pagination with `limit` and `offset` query parameters
- Returns properly typed data matching the `ReviewsResponse` interface
- Includes error handling

### Example API Response

```json
{
  "reviews": [
    {
      "id": "1",
      "message": "Great work!",
      "name": "John Doe",
      "rating": 5,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 6
}
```

## Configuration

### Query Configuration

- **Stale Time**: 5 minutes - Data considered fresh for 5 minutes
- **GC Time**: 10 minutes - Cached data garbage collected after 10 minutes
- **Retry**: 2 attempts on failure
- **Background Refetch**: Disabled on window focus

### Skeleton Loading

The skeleton component provides:

- Exact UI structure matching the reviews component
- Responsive design with proper spacing
- Smooth animations with Tailwind CSS
- Multiple skeleton items for carousel preview

## Performance Benefits

1. **Caching**: Reduces redundant API calls
2. **Background Updates**: Fresh data without blocking UI
3. **Optimistic Updates**: Immediate UI feedback
4. **Error Recovery**: Automatic retry mechanism
5. **Memory Management**: Automatic cache cleanup

## Testing the Implementation

1. **Loading State**: Refresh the page to see the skeleton loading
2. **Success State**: Reviews load from the API after 1 second delay
3. **Error State**: API errors fallback to static data with console warning
4. **Performance**: Subsequent visits use cached data for instant loading

## Future Enhancements

- **Infinite Scrolling**: Load more reviews on demand
- **Real-time Updates**: WebSocket integration for live reviews
- **Optimistic Updates**: Add new reviews immediately before API confirmation
- **Error Boundary**: React error boundary for better error handling
- **Prefetching**: Preload reviews data for better UX
