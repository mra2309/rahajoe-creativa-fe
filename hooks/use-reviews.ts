import { useQuery } from "@tanstack/react-query";
import { getReviews } from "@/service/review";
import { ReviewsResponse } from "@/types/review";

interface UseReviewsOptions {
  enabled?: boolean;
  refetchInterval?: number;
}

export const useReviews = (options?: UseReviewsOptions) => {
  return useQuery<ReviewsResponse>({
    queryKey: ["reviews"],
    queryFn: getReviews,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: options?.enabled ?? true,
    refetchInterval: options?.refetchInterval,
  });
};
