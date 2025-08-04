import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContact } from "@/service/contact";
import { CreateContactRequest, ContactResponse } from "@/types/contact";

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation<ContactResponse, Error, CreateContactRequest>({
    mutationFn: createContact,
    onSuccess: () => {
      // Optionally invalidate and refetch any contact-related queries
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: (error) => {
      // Log error for debugging
      console.error("Failed to create contact:", error);
    },
  });
};
