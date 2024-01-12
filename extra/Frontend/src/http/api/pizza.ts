import { client } from 'src/http/client';
import type { RequestConfig } from 'src/http/client';

const ENDPOINT_NAME = '/pizza';

export const getAll = (config?: RequestConfig) => client
  .get<Array<Partial<Pizza>> | undefined>(ENDPOINT_NAME, config)
  .then((response) => response.data);