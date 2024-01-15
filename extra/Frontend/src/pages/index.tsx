import { usePizzaService } from 'src/service/pizza';

import { PizzaTable } from 'src/components/pizzaTable';
import { NewPizzaRow } from 'src/components/pizzaTable/newPizzaRow';
import { usePizzaTable } from 'src/components/pizzaTable/use';
import { PizzaRow } from 'src/components/pizzaTable/pizzaRow';

export const Index = () => {
  const pizzaService = usePizzaService();

  const { data: pizzas } = pizzaService.fetchAll();
  const {
    editedId, cancelEdit, saveEdit, startEdit, create, remove,
  } = usePizzaTable(pizzaService.create, pizzaService.replace, pizzaService.remove);

  const isEditHappening = (editedId ?? 0) > 0

  const rows = pizzas?.map((pizza) => {
    const editMode = editedId === pizza.id

    return (
      <PizzaRow
        key={pizza.id}
        pizza={pizza}
        editMode={editMode}
        actionsDisabled={isEditHappening && !editMode}
        onEdit={() => startEdit(pizza)}
        onDelete={() => remove(pizza.id)}
        onCancel={cancelEdit}
        onSubmit={saveEdit}
      />
    )
  })

  return (
    <>
      <h1>Pizzas</h1>
      <PizzaTable>
        {rows}
        <NewPizzaRow
          formId="new-pizza"
          onSubmit={create}
          disabled={isEditHappening}
        />
      </PizzaTable>
    </>
  )
}