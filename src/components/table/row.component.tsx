import { flexRender } from '@tanstack/react-table'
import { cx } from 'class-variance-authority'
import { type RowProps } from './table.types'

export const RowComponent = ({ className, row }: RowProps) => {
  return (
    <tr className={cx('even:bg-zinc-200/10 dark:even:bg-zinc-700/10', className)}>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="h-14 whitespace-nowrap p-3">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  )
}
