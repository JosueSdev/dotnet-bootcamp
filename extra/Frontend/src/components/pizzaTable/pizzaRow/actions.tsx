import { FormEventHandler } from 'react'

export interface IActions {
  onEdit?: () => void
  onDelete?: () => void
  onCancel?: () => void
  onSubmit?: FormEventHandler
}

interface Props extends IActions {
  mode: 'list' | 'edit'
  formId?: string
  disabled?: boolean
}

export const Actions = ({
  mode,
  formId,
  disabled = false,
  onEdit, onDelete, onSubmit: onSave, onCancel }: Props) => {
  return (
    <form id={formId} onSubmit={onSave}>
      {mode == 'list' && (
        <>
          <button
            title="edit"
            type="button"
            disabled={disabled}
            onClick={onEdit}>✎</button>
          <button
            title="delete"
            type="button"
            disabled={disabled}
            onClick={onDelete}>🗑️</button>
        </>
      )}
      {mode === 'edit' && (
        <>
          <button
            title="save"
            type="submit"
            disabled={disabled}>💾</button>
          <button
            title="cancel"
            type="button"
            disabled={disabled}
            onClick={onCancel}>↩️</button>
        </>
      )}
    </form>
  );
}
