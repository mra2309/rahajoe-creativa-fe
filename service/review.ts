import http from "@/lib/http";
import { ReviewsResponse } from "@/types/review";

export const getReviews = async (): Promise<ReviewsResponse> => {
  const response = await http.get("/review");
  return response.data;
};
