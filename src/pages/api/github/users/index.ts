import { handleError } from '@/errors/handleError';
import { GithubUserArraySchema } from '@/schemas/github';
import { NextApiRequest, NextApiResponse } from 'next';
import { HttpResponse } from '@/http/httpClient';
import { GithubUser } from '@/types/github';
import httpAdapter from '@/http/httpAdapter';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const USERS_ENDPOINT = process.env.NEXT_PUBLIC_USERS_ENDPOINT || '';
const GITHUB_USERS_URL = `${API_BASE_URL}${USERS_ENDPOINT}`;
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

  try {
    const {
      data: rawData,
      status: fetchStatus,
      error,
    } = await httpAdapter.get<GithubUser[]>(GITHUB_USERS_URL, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (error) {
      return res.status(fetchStatus).json({
        data: null,
        status: fetchStatus,
        error,
      });
    }

    const validatedData = GithubUserArraySchema.parse(rawData);

    return res.status(200).json({
      data: validatedData,
      status: 200,
      error: null,
    });
  } catch (error) {
    const serializableError = handleError(error, {
      validationMessage: 'Los datos de los usuarios no son válidos.',
      genericMessage: 'Error al obtener la lista de usuarios.',
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
