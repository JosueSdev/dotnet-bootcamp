import { usePizzaService } from 'src/service/pizza'

import { PizzaTable, Row, NewRow } from 'src/components/pizzaTable'
import { usePizzaTable } from 'src/components/pizzaTable/use'

export const Index = () => {
  const pizzaService = usePizzaService()

  const { data: pizzas } = pizzaService.fetchAll()
  const {
    editedId, cancelEdit, saveEdit, startEdit, create, remove,
  } = usePizzaTable(pizzaService.create, pizzaService.replace, pizzaService.remove)

  const isEditHappening = (editedId ?? 0) > 0

  const rows = pizzas?.map((pizza) => {
    const editMode = editedId === pizza.id

    return (
      <Row
        key={pizza.id}
        formIdPrefix="edit-pizza"
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
        <NewRow
          formId="new-pizza"
          onSubmit={create}
          disabled={isEditHappening}
        />
      </PizzaTable>
    </>
  )
}
