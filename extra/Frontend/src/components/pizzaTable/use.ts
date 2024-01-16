import { type FormEventHandler, useState } from 'react'

export const usePizzaTable = (
  onCreate: (pizza: FormData) => void,
  onReplace: (pizzaId: number, pizza: FormData) => void,
  onRemove: (pizzaId: number) => void,
) => {
  const [editedId, setEditedId] = useState<number | null>(null);

  const create: FormEventHandler = (event) => {
    event.preventDefault();

    if (event.target instanceof HTMLFormElement) {
      onCreate(new FormData(event.target))
      event.target.reset()
    }
  }
  const startEdit = (pizza: Partial<Pizza>) => {
    if (pizza.id) {
      setEditedId(pizza.id)
    }
  }
  const saveEdit: FormEventHandler = (event) => {
    event.preventDefault();

    if (editedId === null) throw new ReferenceError('editing null id');

    if (event.target instanceof HTMLFormElement) {
      onReplace(editedId, new FormData(event.target))

      setEditedId(null)
    }
  }
  const cancelEdit = () => {
    setEditedId(null)
  }
  const remove = (pizzaId?: number) => {
    if (pizzaId) {
      onRemove(pizzaId)
    }
  }

  return {
    editedId,
    create,
    startEdit,
    saveEdit,
    cancelEdit,
    remove,
  }
}