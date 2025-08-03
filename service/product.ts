import http from "@/lib/http";
import { ProductsResponse } from "@/types/product";

export const getProducts = async (): Promise<ProductsResponse> => {
  const response = await http.get("/product");
  return response.data;
};
