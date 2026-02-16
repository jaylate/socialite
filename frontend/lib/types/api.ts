export interface ApiConfig {
  baseUrl: string;
  apiPrefix: string;
  version: string;
  defaultUserId: number;
  getApiUrl: (endpoint: string) => string;
}

export interface ApiError {
  status: number;
  text: string;
}
