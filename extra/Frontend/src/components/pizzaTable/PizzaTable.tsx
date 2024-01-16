import type { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

export const PizzaTable = ({ children }: Props) => {
  return (
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
        {children}
      </tbody>
    </table>
  )
}
