export interface Review {
  id?: string;
  name: string;
  message: string;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReviewsResponse {
  status: boolean;
  statusCode: number;
  data: Review[];
  total?: number;
}
