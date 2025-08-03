import http from "@/lib/http";
import { ContactResponse, CreateContactRequest } from "@/types/contact";

export const createContact = async (
  data: CreateContactRequest
): Promise<ContactResponse> => {
  const response = await http.post("/message", data);
  return response.data;
};
