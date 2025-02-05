export interface HttpClient {
  get<T = unknown>(
    url: string,
    config?: Record<string, unknown>
  ): Promise<HttpResponse<T>>;
}

export interface HttpResponse<T> {
  data: T | null;
  status: number;
  error?: {
    message: string;
  } | null;
  [key: string]: unknown;
}
