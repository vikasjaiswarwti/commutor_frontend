// src/shared/lib/api/axiosAdapter.ts
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { ApiClient, ApiClientConfig, RequestConfig } from "./apiClient.types";

export class AxiosApiClient implements ApiClient {
  private client: AxiosInstance;

  constructor(config: ApiClientConfig) {
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: 30000,
    });

    // Request interceptor
    this.client.interceptors.request.use((req) => {
      const token = config.getToken();
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
      return req;
    });

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          config.onUnauthorized?.();
        }
        return Promise.reject(error);
      },
    );
  }

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, this.toAxiosConfig(config));
    return response.data;
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<T> {
    const response = await this.client.post<T>(
      url,
      data,
      this.toAxiosConfig(config),
    );
    return response.data;
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<T> {
    const response = await this.client.put<T>(
      url,
      data,
      this.toAxiosConfig(config),
    );
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<T> {
    const response = await this.client.patch<T>(
      url,
      data,
      this.toAxiosConfig(config),
    );
    return response.data;
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    const response = await this.client.delete<T>(
      url,
      this.toAxiosConfig(config),
    );
    return response.data;
  }

  private toAxiosConfig(config?: RequestConfig): AxiosRequestConfig {
    return {
      params: config?.params,
      headers: config?.headers,
    };
  }
}
