import { HttpClient } from '@/http/httpClient';
import axiosAdapter from '@/http/axiosAdapter';

const httpAdapter: HttpClient = axiosAdapter;

export default httpAdapter;
