import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "@/service/order";
import { CreateOrderRequest, CreateOrderResponse } from "@/types/order";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateOrderResponse, Error, CreateOrderRequest>({
    mutationFn: createOrder,
    onSuccess: () => {
      // Optionally invalidate and refetch any order-related queries
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      // Log error for debugging
      console.error("Failed to create order:", error);
    },
  });
};
