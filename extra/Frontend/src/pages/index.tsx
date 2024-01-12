import { Actions } from 'src/components/pizzaTable/actions';
import { usePizzaTable } from 'src/components/pizzaTable/usePizzaTable';

export const Index = () => {
  const {
    data, editedId, deletePizza, cancelEdit, saveEdit, startEdit
  } = usePizzaTable();

  return (
    <>
      <h1>Pizzas</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((pizza) => {
            const editMode = editedId === pizza.id
            const formId = `edit-${pizza.id}`;

            return (
              <tr key={pizza.id}>
                <td>{pizza.id}</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    defaultValue={pizza.name}
                    disabled={!editMode}
                    form={formId}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="description"
                    defaultValue={pizza.description}
                    disabled={!editMode}
                    form={formId}
                  />
                </td>
                <td>
                  <Actions
                    formId={formId}
                    mode={editMode ? 'edit' : 'list'}
                    disabled={!!(editedId && !editMode)}
                    onEdit={() => startEdit(pizza)}
                    onDelete={() => deletePizza(pizza.id)}
                    onCancel={cancelEdit}
                    onSubmit={saveEdit}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}