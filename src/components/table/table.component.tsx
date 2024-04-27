import * as ScrollArea from '@/components/scroll-area'
import { flexRender } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { Row as RowComponent } from './row.component'
import type { TableProps } from './table.types'

export const Table = <T extends Record<string, any> = Record<string, never>>({
  table,
  Row = RowComponent,
}: TableProps<T>) => {
  const { t } = useTranslation()
  const groups = table.getHeaderGroups()
  const rows = table.getSortedRowModel().rows

  return (
    <ScrollArea.Root width="100%">
      <ScrollArea.Viewport>
        <div className="overflow-hidden rounded-lg">
          <table className="divide-border-primary w-full divide-y">
            <thead className="bg-background-tertiary">
              {groups.map((group) => (
                <tr key={group.id}>
                  {group.headers.map((header) => {
                    const sorted = header.column.getIsSorted()

                    return (
                      <th
                        key={header.id}
                        className="text-foreground-primary typography-sm py-3.5 px-3 font-semibold"
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

            {rows.length > 0 && (
              <tbody className="bg-background-secondary divide-border-secondary divide-y">
                {rows.map((row) => (
                  <Row key={row.id} row={row} />
                ))}
              </tbody>
            )}
          </table>
        </div>
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar orientation="horizontal" />
    </ScrollArea.Root>
  )
}
