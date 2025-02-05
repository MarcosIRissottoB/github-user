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
    return await httpClient.get<GithubUser[]>(API_ROUTES.USERS);
  };

  const searchUsers = async (
    term: string
  ): Promise<HttpResponse<GithubUser[]>> => {
    return await httpClient.get<GithubUser[]>(API_ROUTES.SEARCH_USERS(term));
  };

  const fetchUserDetails = async (
    username: string
  ): Promise<HttpResponse<GithubUser>> => {
    return await httpClient.get<GithubUser>(API_ROUTES.USER_DETAILS(username));
  };

  const fetchRepositories = async (
    username: string,
    perPage = 5,
    page = 1
  ): Promise<HttpResponse<GithubRepo[]>> => {
    return await httpClient.get<GithubRepo[]>(
      API_ROUTES.USER_REPOSITORIES(username),
      {
        params: { perPage, page },
      }
    );
  };

  return {
    fetchUsers,
    searchUsers,
    fetchUserDetails,
    fetchRepositories,
  };
};

export default createGitHubService;
