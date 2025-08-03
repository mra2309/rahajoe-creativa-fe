import { useQuery } from "@tanstack/react-query";
import { ClientsResponse } from "@/types/client";
import { getClients } from "@/service/client";

interface UseClientsOptions {
  enabled?: boolean;
  refetchInterval?: number;
}

export const useClients = (options?: UseClientsOptions) => {
  return useQuery<ClientsResponse>({
    queryKey: ["clients"],
    queryFn: getClients,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: options?.enabled ?? true,
    refetchInterval: options?.refetchInterval,
  });
};
