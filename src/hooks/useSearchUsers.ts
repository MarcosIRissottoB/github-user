import { useState } from 'react';
import createGitHubService, { API_ROUTES } from '@/services/githubService';
import axiosAdapter from '@/http/axiosAdapter';
import { GithubUser } from '@/types/github';
import { HttpResponse } from '@/http/httpClient';

const useSearchUsers = () => {
  const [users, setUsers] = useState<GithubUser[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const githubService = createGitHubService(axiosAdapter);

  const searchUsers = async (
    term: string
  ): Promise<HttpResponse<GithubUser[] | []>> => {
    setIsLoading(true);
    setError(null);

    try {
      const result: HttpResponse<GithubUser[] | []> =
        await githubService.searchUsers(term);
      if (result.status === 200) {
        setUsers(result.data || []);
        return {
          data: result.data || [],
          status: 200,
          error: null,
        };
      } else {
        setUsers([]);
        setError(result.error?.message || 'No se encontró un usuario.');
        return result;
      }
    } catch (err) {
      let errorMessage = 'Error desconocido';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);

      return {
        data: [],
        status: 500,
        error: {
          code: 'SEARCH_USERS_ERROR',
          message: `Failed to search users with term '${term}'`,
          details: err,
        },
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { searchUsers, isLoading, error };
};

export default useSearchUsers;
