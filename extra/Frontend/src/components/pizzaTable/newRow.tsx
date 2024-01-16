import type { FormEventHandler } from 'react'

interface Props {
  formId: string
  disabled?: boolean
  onSubmit?: FormEventHandler
}

export const NewRow = ({ formId, disabled = false, onSubmit }: Props) => {
  return (
    < tr >
      <td />
      <td>
        <input
          type="text"
          name="name"
          disabled={disabled}
          form={formId}
        />
      </td>
      <td>
        <input
          type="text"
          name="description"
          disabled={disabled}
          form={formId}
        />
      </td>
      <td>
        <form id={formId} onSubmit={onSubmit}>
          <button
            type='submit'
            title='submit new pizza'
            disabled={disabled}
          >🍕</button>
          <button
            type="reset"
            title="reset"
            disabled={disabled}
          >↻</button>
        </form>
      </td>
    </tr >
  )
}
