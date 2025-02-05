import { handleError } from '@/errors/handleError';
import axiosAdapter from '@/http/axiosAdapter';
import { GithubUserArraySchema } from '@/schemas/github';
import { NextApiRequest, NextApiResponse } from 'next';
import { GithubSearchUsersResponse } from '@/types/github';
import { HttpResponse } from '@/http/httpClient';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.github.com';
const USERS_ENDPOINT = process.env.NEXT_PUBLIC_USERS_ENDPOINT;
const SEARCH_ENDPOINT = process.env.NEXT_PUBLIC_SEARCH_USERS_ENDPOINT;
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const METHOD_GET = 'GET';

  if (req.method === METHOD_GET) {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      return res.status(400).json({
        error:
          'El parámetro "q" es obligatorio y debe ser una cadena de texto.',
      });
    }

    try {
      const { data }: HttpResponse<GithubSearchUsersResponse> =
        await axiosAdapter.get(
          `${API_BASE_URL}${SEARCH_ENDPOINT}${USERS_ENDPOINT}`,
          {
            params: { q },
            headers: {
              Authorization: `Bearer ${GITHUB_TOKEN}`,
            },
          }
        );
      if (data?.items.length === 0) {
        return res.status(404).json({
          error: 'No se encontraron usuarios para la búsqueda proporcionada.',
        });
      }

      const validatedUser = GithubUserArraySchema.parse(data?.items);
      res.status(200).json(validatedUser);
    } catch (error) {
      const serializableError = handleError(error, {
        validationMessage: 'Los datos de los usuarios no son válidos.',
        genericMessage: 'Error al buscar usuarios en GitHub.',
      });

      return res.status(serializableError.status || 500).json({
        error: serializableError.message,
        details: serializableError.details ?? undefined,
      });
    }
  } else {
    res.setHeader('Allow', [METHOD_GET]);
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;
