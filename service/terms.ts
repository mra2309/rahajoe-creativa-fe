import http from "@/lib/http";
import { TermsResponse } from "@/types/terms";

export const getTerms = async (): Promise<TermsResponse> => {
  const response = await http.get("/terms");
  return response.data;
};
