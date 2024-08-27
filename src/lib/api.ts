import { redirect } from 'next/navigation';

export interface ApiConfig {
  baseUrl: string;
  token?: string;
}

export class ApiClient {
  private baseUrl: string;
  private token?: string;

  constructor({ baseUrl, token }: ApiConfig) {
    this.baseUrl = baseUrl;
    this.token = token || this.getTokenFromLocalStorage();
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  clearToken() {
    this.token = undefined;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  private getTokenFromLocalStorage(): string | undefined {
    if (typeof window === 'undefined') {
      return undefined;
    }
    return localStorage.getItem('token') || undefined;
  }

  async request<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: any,
    headers: Record<string, string> = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.clearToken();
        console.log(redirect);
        redirect('/auth/login');
      }

      const contentType = response.headers.get('content-type');
      let errorMessage = 'Something went wrong';

      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } else {
        errorMessage = await response.text();
      }

      throw new Error(errorMessage);
    }

    return response.json() as Promise<T>;
  }

  async get<T>(
    endpoint: string,
    headers: Record<string, string> = {}
  ): Promise<T> {
    return this.request<T>(endpoint, 'GET', undefined, headers);
  }

  async post<T>(
    endpoint: string,
    data: any,
    headers: Record<string, string> = {}
  ): Promise<T> {
    return this.request<T>(endpoint, 'POST', data, headers);
  }

  async put<T>(
    endpoint: string,
    data: any,
    headers: Record<string, string> = {}
  ): Promise<T> {
    return this.request<T>(endpoint, 'PUT', data, headers);
  }

  async delete<T>(
    endpoint: string,
    headers: Record<string, string> = {}
  ): Promise<T> {
    return this.request<T>(endpoint, 'DELETE', undefined, headers);
  }

  async login(email: string, password: string): Promise<void> {
    const response = await this.post<{ token: string }>('/auth/login', {
      email,
      password,
    });
    this.setToken((response as any).data.token);
  }

  async signup(name: string, email: string, password: string): Promise<void> {
    const response = await this.post<{ token: string }>('/auth/register', {
      name,
      email,
      password,
    });
    this.setToken(response.token);
  }

  logout(): void {
    this.clearToken();
    // Optionally, you can also send a request to the server to invalidate the token
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}

const apiClient = new ApiClient({
  baseUrl: 'https://scissors-api-3ypq.onrender.com/api',
});

export default apiClient;
