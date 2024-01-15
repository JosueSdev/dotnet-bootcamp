import { Actions, IActions } from './actions';

interface Props extends IActions {
  pizza: Partial<Pizza>
  formIdPrefix: string
  editMode?: boolean
  actionsDisabled?: boolean
}

export const PizzaRow = ({
  pizza, formIdPrefix,
  editMode = false, actionsDisabled = false,
  onCancel, onDelete, onEdit, onSubmit,
}: Props) => {
  const formId = `${formIdPrefix}-${pizza.id}`;

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
          disabled={actionsDisabled}
          onEdit={onEdit}
          onDelete={onDelete}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      </td>
    </tr>
  )
}
