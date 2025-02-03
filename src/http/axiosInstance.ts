import axios, { AxiosInstance } from 'axios';

const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      console.log('🚀 Enviando solicitud a:', config.url);
      return config;
    },
    (error) => {
      console.error('❌ Error en la solicitud:', error.message);
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log('✅ Respuesta recibida:', response.config.url);
      return response;
    },
    (error) => {
      console.error(
        '❌ Error en la respuesta:',
        error.response?.data || error.message
      );
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default createAxiosInstance;
