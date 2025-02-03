import { ZodError, ZodIssue } from 'zod';

const ERROR_MESSAGES = {
  VALIDATION: 'Los datos recibidos no tienen el formato esperado.',
  GENERIC: 'Error interno del servidor.',
  UNKNOWN: 'Ocurrió un error inesperado.',
};

type SerializableErrorDetails = {
  path: (string | number)[];
  message: string;
  code?: string;
};

type SerializableError = {
  message: string;
  details: SerializableErrorDetails[] | null;
};

type ErrorHandlerOptions = {
  validationMessage?: string;
  genericMessage?: string;
};

export const handleError = (
  error: unknown,
  options: ErrorHandlerOptions = {}
): SerializableError => {
  const {
    validationMessage = ERROR_MESSAGES.VALIDATION,
    genericMessage = ERROR_MESSAGES.GENERIC,
  } = options;

  let serializableError: SerializableError = {
    message: ERROR_MESSAGES.UNKNOWN,
    details: null,
  };

  if (error instanceof Error) {
    if (error instanceof ZodError) {
      serializableError = {
        message: validationMessage,
        details: error.issues.map((issue: ZodIssue) => ({
          path: issue.path,
          message: issue.message,
          code: issue.code,
        })),
      };
      return serializableError;
    }

    serializableError = {
      message: error.message || genericMessage,
      details: null,
    };
  } else {
    console.error('Error desconocido:', error);
    serializableError = {
      message: ERROR_MESSAGES.UNKNOWN,
      details: null,
    };
  }

  return serializableError;
};
