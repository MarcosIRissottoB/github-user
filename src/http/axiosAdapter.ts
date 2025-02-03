import axios from 'axios';
import { HttpClient } from './httpClient';

const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosAdapter: HttpClient = {
  get: async (url, config) => {
    const response = await axiosInstance.get(url, {
      ...config,
      headers: {
        ...(config?.headers || {}),
      },
    });

    return { data: response.data };
  },
};

export default axiosAdapter;
