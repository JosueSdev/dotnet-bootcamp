import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAll, post, put, remove as removeRequest } from 'src/http/api/pizza';

const BASE_KEY = 'pizza';

export const usePizzaService = () => {
  const queryClient = useQueryClient();
  const [doFetchAll, setDoFetchAll] = useState(false)

  const allPizzasQuery = useQuery(BASE_KEY, ({ signal }) => getAll({ signal }), { enabled: doFetchAll })
  const removeMutation = useMutation({
    mutationFn: (pizzaId: number) => removeRequest(pizzaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BASE_KEY })
    },
  })
  const createMutation = useMutation({
    mutationFn: ((pizza: FormData) => post(pizza)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BASE_KEY })
    },
  })
  const replaceMutation = useMutation({
    mutationFn: ({ id, pizza }: { id: number, pizza: FormData }) => put(id, pizza),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BASE_KEY })
    },
  })

  const fetchAll = () => {
    if (!doFetchAll) {
      setDoFetchAll(true)
    }
    return allPizzasQuery
  }
  const create = (pizza: FormData) => {
    const { isLoading, isSuccess } = replaceMutation;
    createMutation.mutate(pizza)
    return { isLoading, isSuccess }
  }
  const remove = (id: number) => {
    const { isLoading, isSuccess } = removeMutation;
    removeMutation.mutate(id)
    return { isLoading, isSuccess }
  }
  const replace = (id: number, pizza: FormData) => {
    const { isLoading, isSuccess } = replaceMutation;
    replaceMutation.mutate({ id, pizza })
    return { isLoading, isSuccess }
  }

  return {
    fetchAll,
    create,
    replace,
    remove,
  }
}