import { ErrorStrategy } from './ErrorStrategy';

export const genericErrorStrategy: ErrorStrategy = (error, options = {}) => {
  if (!(error instanceof Error)) {
    throw new Error('genericErrorStrategy recibió un error no compatible');
  }

  const genericMessage =
    options.genericMessage || 'Error interno del servidor.';
  return {
    message: error.message || genericMessage,
    details: null,
  };
};
