// src/shared/lib/api/fetchAdapter.ts
export class FetchApiClient implements ApiClient {
  constructor(private config: ApiClientConfig) {}

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    const response = await this.request<T>({
      method: "GET",
      url,
      ...config,
    });
    return response;
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<T> {
    const response = await this.request<T>({
      method: "POST",
      url,
      data,
      ...config,
    });
    return response;
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<T> {
    const response = await this.request<T>({
      method: "PUT",
      url,
      data,
      ...config,
    });
    return response;
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<T> {
    const response = await this.request<T>({
      method: "PATCH",
      url,
      data,
      ...config,
    });
    return response;
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    const response = await this.request<T>({
      method: "DELETE",
      url,
      ...config,
    });
    return response;
  }

  private async request<T>(
    config: RequestConfig & { method: string; url: string; data?: unknown },
  ): Promise<T> {
    const headers = {
      "Content-Type": "application/json",
      ...config.headers,
    };

    const token = this.config.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const queryString = config.params
      ? "?" + new URLSearchParams(config.params).toString()
      : "";

    const response = await fetch(
      `${this.config.baseUrl}${config.url}${queryString}`,
      {
        method: config.method,
        headers,
        body: config.data ? JSON.stringify(config.data) : undefined,
      },
    );

    if (!response.ok) {
      if (response.status === 401) {
        this.config.onUnauthorized?.();
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}
