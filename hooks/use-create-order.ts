import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "@/service/order";
import { CreateOrderRequest, CreateOrderResponse } from "@/types/order";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateOrderResponse, Error, CreateOrderRequest>({
    mutationFn: createOrder,
    onSuccess: (data) => {
      // Optionally invalidate and refetch any order-related queries
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      // Log success for debugging
      console.log("Order created successfully:", data);
    },
    onError: (error) => {
      // Log error for debugging
      console.error("Failed to create order:", error);
    },
  });
};
