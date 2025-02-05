import { AxiosError } from 'axios';
import { ErrorStrategy } from './ErrorStrategy';

export const axiosErrorStrategy: ErrorStrategy = (error, options = {}) => {
  if (!(error instanceof AxiosError)) {
    throw new Error('axiosErrorStrategy recibió un error no compatible');
  }

  const defaultMessage =
    options.genericMessage || 'Error al comunicarse con el servidor.';

  if (error.response?.status === 404) {
    return {
      message:
        options.notFoundMessage || 'El recurso solicitado no fue encontrado.',
      details: null,
      status: 404,
    };
  }

  return {
    message: error.response?.data?.message || error.message || defaultMessage,
    details: error.response?.data || null,
    status: error.response?.status || 500,
  };
};
