import { ErrorStrategy } from './ErrorStrategy';

export const unknownErrorStrategy: ErrorStrategy = (error, options = {}) => {
  return {
    message: options.unknownMessage || 'Ocurrió un error inesperado.',
    details: null,
  };
};
