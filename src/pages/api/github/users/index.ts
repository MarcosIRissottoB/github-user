import { handleError } from '@/utils/errorHandler';
import axiosAdapter from '@/http/axiosAdapter';
import { GithubUserArraySchema } from '@/schemas/github';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_ROUTES } from '@/services/githubService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const USERS_ENDPOINT = process.env.NEXT_PUBLIC_USERS_ENDPOINT || '';
const GITHUB_USERS_URL = `${API_BASE_URL}${USERS_ENDPOINT}`;
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const METHOD_GET = 'GET';
  if (req.method === METHOD_GET) {
    try {
      const response = await axiosAdapter.get(GITHUB_USERS_URL, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      });

      const validatedData = GithubUserArraySchema.parse(response.data);
      res.status(200).json(validatedData);
    } catch (error) {
      const serializableError = handleError(error, {
        validationMessage: 'Los datos de los usuarios no son válidos.',
        genericMessage: 'Error al obtener la lista de usuarios.',
      });

      return res.status(500).json({
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
