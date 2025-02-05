export type ErrorStrategy = (
  error: unknown,
  options?: { [key: string]: string }
) => SerializableError;

export type SerializableError = {
  message: string;
  details: SerializableErrorDetails[] | null;
  status?: number;
};

export type SerializableErrorDetails = {
  path: (string | number)[];
  message: string;
  code?: string;
};
