export interface Term {
  id: string;
  title: string;
  description: string | null;
  content: string[];
  position: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TermsResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: Term[];
}
