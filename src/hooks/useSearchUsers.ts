import { useState } from 'react';
import createGitHubService from '@/services/githubService';
import axiosAdapter from '@/http/axiosAdapter';
import { GithubUser } from '@/types/github';
import { HttpResponse } from '@/http/httpClient';

const githubService = createGitHubService(axiosAdapter);

interface UseSearchUsersResult {
  data: GithubUser[] | null;
}

const useSearchUsers = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchUsers = async (term: string): Promise<UseSearchUsersResult> => {
    setIsLoading(true);
    setError(null);

    const { data, error }: HttpResponse<GithubUser[]> =
      await githubService.searchUsers(term);

    setError(error?.message || null);
    setIsLoading(false);
    return { data };
  };
  return {
    searchUsers,
    isLoading,
    error,
  };
};

export default useSearchUsers;
