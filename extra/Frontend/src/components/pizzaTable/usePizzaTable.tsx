import { type FormEventHandler, useState } from 'react';
import { usePizzaService } from 'src/service/query/pizza';

export const usePizzaTable = () => {
  const pizzaService = usePizzaService();
  const [editedId, setEditedId] = useState<number | null>(null);

  const { data } = pizzaService.fetchAll();
  const deletePizza = (pizzaId?: number) => {
    if (pizzaId) {
      pizzaService.remove(pizzaId)
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
      pizzaService.replace(editedId, new FormData(event.target))

      setEditedId(null)
    }
  }
  const cancelEdit = () => {
    setEditedId(null)
  }

  return {
    data,
    editedId,
    deletePizza,
    startEdit,
    saveEdit,
    cancelEdit,
  }
}