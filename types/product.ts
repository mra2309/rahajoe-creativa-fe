export interface Product {
  id?: string;
  name: string;
  description: string;
  logo_url: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsResponse {
  status: string;
  statusCode: number;
  data: Product[];
  total?: number;
}
