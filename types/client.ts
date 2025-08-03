export interface Client {
  id?: string;
  name: string;
  logo_url: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ClientsResponse {
  status: string;
  statusCode: number;
  data: Client[];
  total?: number;
}
