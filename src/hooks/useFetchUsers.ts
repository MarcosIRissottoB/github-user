import { useState, useEffect } from 'react';
import axios from 'axios';
import { GithubUserArraySchema } from '@/schemas/github';
import { ZodError } from 'zod';
import { GithubUser } from '@/types/github';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.github.com';
const ENDPOINT_USERS = '/users';

const useFetchUsers = () => {
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}${ENDPOINT_USERS}`);
        const validatedUsers = GithubUserArraySchema.parse(data);
        setUsers(validatedUsers);
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
          setError(`Error al obtener los usuarios: ${err.message}`);
        } else {
          setError('Error desconocido.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, isLoading, error };
};

export default useFetchUsers;
