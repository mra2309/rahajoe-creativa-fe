import { useQuery } from "@tanstack/react-query";
import { getTerms } from "@/service/terms";
import { TermsResponse } from "@/types/terms";

interface UseTermsOptions {
  enabled?: boolean;
  refetchInterval?: number;
}

export const useTerms = (options?: UseTermsOptions) => {
  return useQuery<TermsResponse>({
    queryKey: ["terms"],
    queryFn: getTerms,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: options?.enabled ?? true,
    refetchInterval: options?.refetchInterval,
  });
};
