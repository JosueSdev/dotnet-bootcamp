import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import env from 'src/env';

export const client = axios.create({
  baseURL: env.VITE_RESTFUL_SERVER_URL,
});

export type { AxiosRequestConfig as RequestConfig }
