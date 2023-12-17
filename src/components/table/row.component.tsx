import { flexRender } from '@tanstack/react-table'
import { type RowProps } from './table.types'

export const RowComponent = ({ row }: RowProps) => {
  return (
    <tr>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="h-14 whitespace-nowrap p-3">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  )
}
