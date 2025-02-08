import { GithubRepoArraySchema } from '@/schemas/github';
import { NextApiRequest, NextApiResponse } from 'next';
import { handleError } from '@/errors/handleError';
import httpAdapter from '@/http/httpAdapter';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const USERS_ENDPOINT = process.env.NEXT_PUBLIC_USERS_ENDPOINT || '';
const GITHUB_USERS_URL = `${API_BASE_URL}${USERS_ENDPOINT}`;
const REPOSITORIES_ENDPOINT =
  process.env.NEXT_PUBLIC_REPOSITORIES_ENDPOINT || '';
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const METHOD_GET = 'GET';
  const { username, perPage = '5', page = '1' } = req.query;

  if (req.method === METHOD_GET) {
    if (!username || typeof username !== 'string') {
      return res.status(400).json({
        error: 'El parámetro "username" es requerido o no es válido.',
      });
    }

    try {
      const response = await httpAdapter.get(
        `${GITHUB_USERS_URL}/${username}${REPOSITORIES_ENDPOINT}?per_page=${perPage}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
          },
        }
      );
      const validatedData = GithubRepoArraySchema.parse(response.data);
      res.status(200).json(validatedData);
    } catch (error) {
      const serializableError = handleError(error, {
        validationMessage: 'Los datos del usuario no son válidos.',
        genericMessage: `Error al obtener los repositorios de "${username}".`,
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
