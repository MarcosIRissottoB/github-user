import { useState, useEffect } from 'react';
import createGitHubService from '@/services/githubService';
import { GithubUser } from '@/types/github';
import axiosAdapter from '@/http/axiosAdapter';

const useFetchUsers = () => {
  const [users, setUsers] = useState<GithubUser[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const githubService = createGitHubService(axiosAdapter);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await githubService.fetchUsers();
        setUsers(usersData?.data || []);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error desconocido.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { users, isLoading, error };
};

export default useFetchUsers;
