import { handleErrorWithStrategy } from '@/errors/handleErrorWithStrategy';
import { SerializableError } from '@/errors/ErrorStrategy';

export const handleError = (
  error: unknown,
  options: { [key: string]: string } = {}
): SerializableError => {
  return handleErrorWithStrategy(error, options);
};
