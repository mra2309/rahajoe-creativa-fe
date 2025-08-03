import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/service/product";
import { ProductsResponse } from "@/types/product";

interface UseProductsOptions {
  enabled?: boolean;
  refetchInterval?: number;
}

export const useProducts = (options?: UseProductsOptions) => {
  return useQuery<ProductsResponse>({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: options?.enabled ?? true,
    refetchInterval: options?.refetchInterval,
  });
};
