export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface Contact {
  id?: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactResponse {
  status: string;
  statusCode: number;
  data: Contact;
  message?: string;
}

export interface CreateContactRequest {
  name: string;
  email: string;
  message: string;
}
