import { useState, useEffect } from 'react';
import axios from 'axios';
import { GithubUserSchema } from '@/schemas/github';
import { ZodError } from 'zod';
import { GithubUser } from '@/types/github';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.github.com';
const ENDPOINT_USER = '/users'; // Endpoint base

const useFetchUser = (username: string) => {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}${ENDPOINT_USER}/${username}`
        );
        const validatedUser = GithubUserSchema.parse(data);
        setUser(validatedUser);
        setError(null);
      } catch (err) {
        if (err instanceof ZodError) {
          setError(
            `Error de validación: ${err.errors
              .map((issue) => {
                const location = issue.path.length
                  ? `${issue.path.join(' > ')}`
                  : 'respuesta completa';
                return `${location}: ${issue.message}`;
              })
              .join(', ')}`
          );
        } else if (err instanceof Error) {
          setError(`Error al obtener el usuario: ${err.message}`);
        } else {
          setError('Error desconocido.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  return { user, isLoading, error };
};

export default useFetchUser;
