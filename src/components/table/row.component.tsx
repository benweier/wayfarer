import { flexRender } from '@tanstack/react-table'
import { cx } from 'class-variance-authority'
import { type RowProps } from './table.types'

export const Row = ({ className, row }: RowProps) => {
  return (
    <tr className={cx('h-full even:bg-zinc-200/10 dark:even:bg-zinc-700/10', className)}>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="relative h-full whitespace-nowrap p-3">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  )
}
