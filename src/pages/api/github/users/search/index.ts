import { handleError } from '@/errors/handleError';
import axiosAdapter from '@/http/axiosAdapter';
import { GithubUserArraySchema } from '@/schemas/github';
import { NextApiRequest, NextApiResponse } from 'next';
import { GithubSearchUsersResponse, GithubUser } from '@/types/github';
import { HttpResponse } from '@/http/httpClient';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.github.com';
const USERS_ENDPOINT = process.env.NEXT_PUBLIC_USERS_ENDPOINT;
const SEARCH_ENDPOINT = process.env.NEXT_PUBLIC_SEARCH_USERS_ENDPOINT;
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<HttpResponse<GithubUser[]>>
) => {
  const METHOD_GET = 'GET';
  if (req.method !== METHOD_GET) {
    res.setHeader('Allow', [METHOD_GET]);
    return res.status(405).json({
      data: null,
      status: 405,
      error: {
        message: 'Method Not Allowed',
      },
    });
  }

  const { q } = req.query;
  if (!q || typeof q !== 'string') {
    return res.status(400).json({
      data: null,
      status: 400,
      error: {
        message:
          'El parámetro "q" es obligatorio y debe ser una cadena de texto.',
      },
    });
  }

  try {
    const { data, status, error } =
      await axiosAdapter.get<GithubSearchUsersResponse>(
        `${API_BASE_URL}${SEARCH_ENDPOINT}${USERS_ENDPOINT}`,
        {
          params: { q },
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
          },
        }
      );

    if (error) {
      return res.status(status).json({
        data: null,
        status,
        error,
      });
    }

    const rawUsers = data?.items ?? [];

    if (!rawUsers.length) {
      return res.status(404).json({
        data: null,
        status: 404,
        error: {
          message: `No se encontró un usuario con el nombre "${q}".`,
        },
      });
    }

    const validatedUsers = GithubUserArraySchema.parse(rawUsers);

    return res.status(200).json({
      data: validatedUsers,
      status: 200,
      error: null,
    });
  } catch (error) {
    const serializableError = handleError(error, {
      validationMessage: 'Los datos de los usuarios no son válidos.',
      genericMessage: 'Error al buscar usuarios en GitHub.',
    });

    const statusCode = serializableError.status ?? 500;

    return res.status(statusCode).json({
      data: null,
      status: statusCode,
      error: {
        message: serializableError.message,
      },
    });
  }
};

export default handler;
