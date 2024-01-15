import { client } from 'src/http/client';
import type { RequestConfig } from 'src/http/client';

const ENDPOINT_NAME = '/pizza';

export const getAll = (config?: RequestConfig) => client
  .get<Array<Partial<Pizza>> | undefined>(ENDPOINT_NAME, config)
  .then((response) => response.data)

export const post = (pizza: FormData, config?: RequestConfig) => client
  .post(`${ENDPOINT_NAME}`, pizza, { ...config })

export const put = (id: number, pizza: FormData, config?: RequestConfig) => client
  .put(`${ENDPOINT_NAME}/${id}`, pizza, { ...config })

export const remove = (pizzaId: number, config?: RequestConfig) => client
  .delete(`${ENDPOINT_NAME}/${pizzaId}`, config)