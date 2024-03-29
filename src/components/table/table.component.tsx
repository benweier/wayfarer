import { flexRender } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { Row as RowComponent } from './row.component'
import { type TableProps } from './table.types'

export const Table = <T extends Record<string, any> = Record<string, never>>({
  table,
  Row = RowComponent,
}: TableProps<T>) => {
  const { t } = useTranslation()
  const groups = table.getHeaderGroups()
  const rows = table.getSortedRowModel().rows

  return (
    <div className="w-full max-w-full overflow-x-auto overflow-y-hidden">
      <table className="w-full divide-y divide-zinc-200 overflow-hidden rounded-xl dark:divide-zinc-950">
        <thead className="bg-zinc-100 dark:bg-zinc-800">
          {groups.map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => {
                const sorted = header.column.getIsSorted()

                return (
                  <th
                    key={header.id}
                    className="text-primary py-3.5 px-3 text-sm font-semibold"
                    style={{ width: `${header.getSize()}%` }}
                    aria-sort={
                      sorted
                        ? sorted === 'asc'
                          ? (t('general.sorting.asc') as 'ascending')
                          : (t('general.sorting.desc') as 'descending')
                        : undefined
                    }
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-zinc-200 bg-zinc-100/50 dark:divide-zinc-950 dark:bg-zinc-800/50">
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
