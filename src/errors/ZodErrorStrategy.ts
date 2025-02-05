import { ErrorStrategy } from '@/errors/ErrorStrategy';
import { ZodError } from 'zod';

export const zodErrorStrategy: ErrorStrategy = (error, options = {}) => {
  if (!(error instanceof ZodError)) {
    throw new Error('zodErrorStrategy recibió un error no compatible');
  }

  const validationMessage =
    options.validationMessage || 'Formato de datos inválido.';

  return {
    message: validationMessage,
    details: error.issues.map((issue) => ({
      path: issue.path,
      message: issue.message,
      code: issue.code,
    })),
  };
};
