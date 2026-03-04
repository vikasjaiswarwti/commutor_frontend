// src/shared/lib/api/apiClient.types.ts

export interface ApiClient {
  get<T>(url: string, config?: RequestConfig): Promise<T>;
  post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>;
  put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>;
  patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>;
  delete<T>(url: string, config?: RequestConfig): Promise<T>;
}

export interface RequestConfig {
  params?: Record<string, string>;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface ApiClientConfig {
  baseUrl: string;
  getToken: () => string | null;
  onUnauthorized?: () => void;
}










