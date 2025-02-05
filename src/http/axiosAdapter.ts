import axios, { AxiosRequestConfig } from 'axios';
import { HttpClient, HttpResponse } from './httpClient';

const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosAdapter: HttpClient = {
  get: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<HttpResponse<T>> => {
    try {
      const response = await axiosInstance.get<T>(url, {
        ...config,
        headers: {
          ...(config?.headers || {}),
        },
      });

      return {
        data: response.data,
        status: response.status,
        error: null,
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return {
          data: null,
          status: error.response?.status || 0,
          error: {
            message: error.response?.data?.message || 'Unknown error',
          },
        };
      }
      return {
        data: null,
        status: 0,
        error: {
          message: 'An unexpected error occurred',
        },
      };
    }
  },
};

export default axiosAdapter;
