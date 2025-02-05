import { ErrorStrategy, SerializableError } from './ErrorStrategy';
import { ZodError } from 'zod';
import { zodErrorStrategy } from '@/errors/ZodErrorStrategy';
import { genericErrorStrategy } from '@/errors/GenericErrorStrategy';
import { unknownErrorStrategy } from '@/errors/UnknownErrorStrategy';
import { AxiosError } from 'axios';
import { axiosErrorStrategy } from '@/errors/AxiosErrorStrategy';

export const handleErrorWithStrategy = (
  error: unknown,
  options: { [key: string]: string } = {}
): SerializableError => {
  let strategy: ErrorStrategy;

  if (error instanceof ZodError) {
    strategy = zodErrorStrategy;
  } else if (error instanceof AxiosError) {
    strategy = axiosErrorStrategy;
  } else if (error instanceof Error) {
    strategy = genericErrorStrategy;
  } else {
    strategy = unknownErrorStrategy;
  }

  return strategy(error, options);
};
