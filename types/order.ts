export interface Order {
  // Required fields
  firstName: string; // min: 2, max: 50
  lastName: string; // min: 2, max: 50
  email: string; // email format
  budget: string;
  brandName: string; // min: 2, max: 100
  businessDescription: string; // min: 5, max: 1000
  portfolioPermission: "yes" | "no";

  // Optional fields
  slogan?: string; // max: 200
  nameReason?: string; // max: 500
  brandValues?: string; // max: 500
  targetAudience?: string; // min: 5, max: 500
  brandKeywords?: string; // max: 300
  businessGoals?: string; // max: 500
  competitors?: string; // max: 500
  logoColorPreferences?: string; // max: 300
  logoMessage?: string; // max: 500
  logoIdea?: string; // max: 500
  logoExamples?: string[]; // array of strings
  designStyles?: string[];
  websiteSocial?: string; // max: 300
  otherComments?: string; // max: 1000
  identityDesign?: string[];
  identityOther?: string; // max: 300
}

export interface CreateOrderRequest {
  // Required fields
  firstName: string; // min: 2, max: 50
  lastName: string; // min: 2, max: 50
  email: string; // email format
  budget: string;
  brandName: string; // min: 2, max: 100
  businessDescription: string; // min: 5, max: 1000
  portfolioPermission: "yes" | "no";

  // Optional fields
  slogan?: string; // max: 200
  nameReason?: string; // max: 500
  brandValues?: string; // max: 500
  targetAudience?: string; // min: 5, max: 500
  brandKeywords?: string; // max: 300
  businessGoals?: string; // max: 500
  competitors?: string; // max: 500
  logoColorPreferences?: string; // max: 300
  logoMessage?: string; // max: 500
  logoIdea?: string; // max: 500
  logoExamples?: string[]; // array of strings
  designStyles?: string[];
  websiteSocial?: string; // max: 300
  otherComments?: string; // max: 1000
  identityDesign?: string[];
  identityOther?: string; // max: 300
}

export interface CreateOrderResponse {
  status: string;
  statusCode: number;
  data: Order;
}

export interface UpdateOrderRequest {
  id: string;
  updates: Partial<Order>;
}
