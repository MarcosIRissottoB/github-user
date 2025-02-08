import { useState, useEffect } from 'react';
import createGitHubService from '@/services/githubService';
import { GithubUser } from '@/types/github';
import { HttpResponse } from '@/http/httpClient';
import httpAdapter from '@/http/httpAdapter';

const githubService = createGitHubService(httpAdapter);

interface UseFetchUsersResult {
  data: GithubUser[] | null;
  error: string | null;
  isLoading: boolean;
}

const useFetchUsers = (): UseFetchUsersResult => {
  const [data, setData] = useState<GithubUser[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      const { data, error }: HttpResponse<GithubUser[]> =
        await githubService.fetchUsers();

      setData(data);
      setError(error?.message || null);
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  return { data, error, isLoading };
};

export default useFetchUsers;
