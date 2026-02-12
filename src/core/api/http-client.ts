/**
 * HTTP Client
 * Cliente HTTP base con manejo de errores y transformación de respuestas
 */

import { API_CONFIG } from '@/app/config/api.config';

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: unknown
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = 'ApiError';
  }
}

interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

class HttpClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor(baseURL: string, defaultHeaders: HeadersInit = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = defaultHeaders;
  }

  private buildURL(endpoint: string, params?: Record<string, string | number | boolean>): string {
    // Asegurar que baseURL termine con / para concatenación correcta
    const base = this.baseURL.endsWith('/') ? this.baseURL : `${this.baseURL}/`;
    // Asegurar que endpoint no comience con /
    const path = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

    const url = new URL(path, base);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    return url.toString();
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = await response.text();
      }

      throw new ApiError(response.status, response.statusText, errorData);
    }

    // Si la respuesta es 204 No Content, retornar null
    if (response.status === 204) {
      return null as T;
    }

    try {
      return await response.json();
    } catch {
      return null as T;
    }
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    const url = this.buildURL(endpoint, config?.params);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...this.defaultHeaders,
        ...config?.headers,
      },
      ...config,
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const url = this.buildURL(endpoint, config?.params);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...this.defaultHeaders,
        ...config?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const url = this.buildURL(endpoint, config?.params);

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        ...this.defaultHeaders,
        ...config?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });

    return this.handleResponse<T>(response);
  }

  async patch<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const url = this.buildURL(endpoint, config?.params);

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        ...this.defaultHeaders,
        ...config?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    const url = this.buildURL(endpoint, config?.params);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        ...this.defaultHeaders,
        ...config?.headers,
      },
      ...config,
    });

    return this.handleResponse<T>(response);
  }
}

// Instancia singleton del cliente HTTP
export const httpClient = new HttpClient(API_CONFIG.baseURL, API_CONFIG.headers);

