import { useState, useEffect } from 'react';
import createGitHubService from '@/services/githubService';
import { GithubUser } from '@/types/github';
import axiosAdapter from '@/http/axiosAdapter';
import { HttpResponse } from '@/http/httpClient';

const githubService = createGitHubService(axiosAdapter);

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
