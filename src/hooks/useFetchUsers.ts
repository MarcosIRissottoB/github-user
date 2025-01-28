import { useState, useEffect } from 'react';
import { fetchGithubUsers } from '@/services/githubService';
import { GithubUser } from '@/types/github';

const useFetchUsers = () => {
  const [users, setUsers] = useState<GithubUser[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await fetchGithubUsers();
        setUsers(usersData ?? []);
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
