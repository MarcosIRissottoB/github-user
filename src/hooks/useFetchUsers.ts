import { useState, useEffect } from 'react';
import createGitHubService from '@/services/githubService';
import { GithubUser } from '@/types/github';
import axiosAdapter from '@/http/axiosAdapter';
import { HttpResponse } from '@/http/httpClient';

const useFetchUsers = () => {
  const [users, setUsers] = useState<GithubUser[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{
    message: string;
    status?: number;
  } | null>(null);

  const githubService = createGitHubService(axiosAdapter);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, status, error }: HttpResponse<GithubUser[]> =
          await githubService.fetchUsers();
        if (error) {
          setError({
            message: error.message || 'Ocurrió un error inesperado.',
            status,
          });
          return;
        }

        setUsers(data || []);
        setError(null);
      } catch (err) {
        setUsers([]);
        setError({
          message: 'Error al conectar con el servidor. Intenta más tarde.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { users, isLoading, error };
};

export default useFetchUsers;
