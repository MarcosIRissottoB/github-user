import { useState, useEffect } from 'react';
import axios from 'axios';
import { ZodError } from 'zod';
import { GithubUser } from '@/types/github';
import { GithubUserArraySchema } from '@/validate/github';

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
        console.log(data);
        const invalidData = {
          id: 'not-a-number', // Tipo incorrecto
          login: 'user123',
        };
        const validatedDataFromGithub =
          GithubUserArraySchema.parse(invalidData);

        setUsers(validatedDataFromGithub as GithubUser[]);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else if (err instanceof ZodError) {
          setError('Error de validación en los datos de la API.'); // Cuando los datos no cumplen con el esquema
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
