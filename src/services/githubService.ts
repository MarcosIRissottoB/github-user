import axios from 'axios';
import { ZodError } from 'zod';
import {
  GithubUserSchema,
  GithubUserArraySchema,
  GithubRepoArraySchema,
} from '@/schemas/github';
import { GithubUser, GithubRepo } from '@/types/github';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.github.com';
const ENDPOINT_USERS = '/users';

export const fetchGithubUsers = async (): Promise<GithubUser[] | undefined> => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}${ENDPOINT_USERS}`);
    return GithubUserArraySchema.parse(data);
  } catch (error) {
    handleErrors(error, 'Error al obtener la lista de usuarios.');
  }
};

export const fetchGithubUser = async (
  username: string
): Promise<GithubUser | undefined> => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}${ENDPOINT_USERS}/${username}`
    );
    return GithubUserSchema.parse(data);
  } catch (error) {
    handleErrors(error, `Error al obtener el usuario "${username}".`);
  }
};

export const fetchGithubRepos = async (
  username: string,
  perPage = 5,
  page = 1
): Promise<GithubRepo[] | undefined> => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}${ENDPOINT_USERS}/${username}/repos`,
      {
        params: { per_page: perPage, page },
      }
    );
    return GithubRepoArraySchema.parse(data);
  } catch (error) {
    handleErrors(
      error,
      `Error al obtener los repositorios del usuario "${username}".`
    );
  }
};

const handleErrors = (error: unknown, message: string) => {
  if (error instanceof ZodError) {
    throw new Error(
      `${message}: ${error.errors
        .map((issue) => {
          const location = issue.path.length
            ? `${issue.path.join(' > ')}`
            : 'respuesta completa';
          return `${location}: ${issue.message}`;
        })
        .join(', ')}`
    );
  } else if (error instanceof Error) {
    throw new Error(`${message}: ${error.message}`);
  } else {
    throw new Error(`${message}: Error desconocido.`);
  }
};
