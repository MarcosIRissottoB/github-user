export interface HttpClient {
  get<T = unknown>(
    url: string,
    config?: Record<string, unknown>
  ): Promise<{ data: T }>;
}

export interface HttpResponse<T> {
  data: T;
  status?: number;
  error?: {
    code: string;
    message: string;
    details?: unknown;
    [key: string]: unknown;
  } | null;
  [key: string]: unknown;
}
