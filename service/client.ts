import http from "@/lib/http";
import { ClientsResponse } from "@/types/client";

export const getClients = async (): Promise<ClientsResponse> => {
  const response = await http.get("/client");
  return response.data;
};
