import { usePizzaService } from 'src/service/query/pizza';

export const Index = () => {
  const pizzaService = usePizzaService();

  const { data } = pizzaService.fetchAll();

  return (
    <>
      <h1>hello api</h1>
      <code>{JSON.stringify(data)}</code>
    </>
  )
}