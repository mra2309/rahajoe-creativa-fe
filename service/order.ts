import http from "@/lib/http";
import { CreateOrderRequest, CreateOrderResponse } from "@/types/order";

export const createOrder = async (
  data: CreateOrderRequest
): Promise<CreateOrderResponse> => {
  const response = await http.post("/order", data);
  return response.data;
};
