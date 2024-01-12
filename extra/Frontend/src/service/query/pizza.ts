import { useState } from 'react';
import { useQuery } from 'react-query'
import { getAll } from 'src/http/api/pizza';

const BASE_KEY = 'pizza';

export const usePizzaService = () => {
  const [doFetchAll, setDoFetchAll] = useState(false)

  const allPizzasQuery = useQuery(BASE_KEY, ({ signal }) => getAll({ signal }), { enabled: doFetchAll })

  const fetchAll = () => {
    if (!doFetchAll) {
      setDoFetchAll(true)
    }
    return allPizzasQuery
  }

  return {
    fetchAll,
  }
}