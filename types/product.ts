export interface Product {
  id?: string;
  name: string;
  position: number;
  description: string;
  logo_url: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: Product[];
}

export interface PortfolioWork {
  src: string;
  alt: string;
  id?: string;
  position: number;
}
