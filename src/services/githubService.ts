import { HttpClient, HttpResponse } from '@/http/httpClient';
import { GithubUser, GithubRepo } from '@/types/github';

const API_GITHUB = '/api/github';
const USERS_ENDPOINT = process.env.NEXT_PUBLIC_USERS_ENDPOINT;
const SEARCH_USERS_ENDPOINT = process.env.NEXT_PUBLIC_SEARCH_USERS_ENDPOINT;
const REPOS_ENDPOINT = process.env.NEXT_PUBLIC_REPOSITORIES_ENDPOINT;

const getApiRoute = (path: string): string => {
  const isServer = typeof window === 'undefined';
  const baseUrl = isServer
    ? process.env.NEXT_PUBLIC_API_SERVER_BASE || 'http://localhost:3000'
    : '';
  return `${baseUrl}${path}`;
};

export const API_ROUTES = {
  USERS: `${API_GITHUB}${USERS_ENDPOINT}`,
  SEARCH_USERS: (term: string) =>
    getApiRoute(
      `${API_GITHUB}${USERS_ENDPOINT}${SEARCH_USERS_ENDPOINT}?q=${term}`
    ),
  USER_DETAILS: (username: string) =>
    getApiRoute(`${API_GITHUB}${USERS_ENDPOINT}/${username}`),
  USER_REPOSITORIES: (username: string) =>
    getApiRoute(`${API_GITHUB}${USERS_ENDPOINT}/${username}${REPOS_ENDPOINT}`),
};

const createGitHubService = (httpClient: HttpClient) => {
  const fetchUsers = async (): Promise<HttpResponse<GithubUser[]>> => {
    try {
      const response = await httpClient.get<GithubUser[]>(API_ROUTES.USERS);
      return {
        data: response.data,
        status: 200,
        error: null,
      };
    } catch (error) {
      return {
        data: [],
        status: 500,
        error: {
          code: 'FETCH_USERS_ERROR',
          message: 'An error occurred while fetching users',
          details: error,
        },
      };
    }
  };

  const searchUsers = async (
    term: string
  ): Promise<HttpResponse<GithubUser[]>> => {
    try {
      const response = await httpClient.get<GithubUser[]>(
        API_ROUTES.SEARCH_USERS(term)
      );
      return {
        data: response.data,
        status: 200,
        error: null,
      };
    } catch (error) {
      return {
        data: [],
        status: 500,
        error: {
          code: 'SEARCH_USERS_ERROR',
          message: `Failed to search users with term '${term}'`,
          details: error,
        },
      };
    }
  };

  const fetchUserDetails = async (
    username: string
  ): Promise<HttpResponse<GithubUser>> => {
    try {
      const response = await httpClient.get<GithubUser>(
        API_ROUTES.USER_DETAILS(username)
      );
      return {
        data: response.data,
        status: 200,
        error: null,
      };
    } catch (error) {
      return {
        data: {} as GithubUser,
        status: 500,
        error: {
          code: 'FETCH_USER_DETAILS_ERROR',
          message: `Failed to fetch details for user ${username}`,
          details: error,
        },
      };
    }
  };

  const fetchRepositories = async (
    username: string,
    perPage = 5,
    page = 1
  ): Promise<HttpResponse<GithubRepo[]>> => {
    try {
      const response = await httpClient.get<GithubRepo[]>(
        API_ROUTES.USER_REPOSITORIES(username),
        {
          params: { perPage, page },
        }
      );
      return {
        data: response.data,
        status: 200,
        error: null,
      };
    } catch (error) {
      return {
        data: [],
        status: 500,
        error: {
          code: 'FETCH_REPOSITORIES_ERROR',
          message: `Failed to fetch repositories for user ${username}`,
          details: error,
        },
      };
    }
  };

  return {
    fetchUsers,
    searchUsers,
    fetchUserDetails,
    fetchRepositories,
  };
};

export default createGitHubService;
