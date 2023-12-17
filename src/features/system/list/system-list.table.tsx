import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { TableComponent } from '@/components/table'
import { type SystemsResponse } from '@/types/spacetraders'
import { columns } from './system-list.columns'

export const SystemListTable = ({ data }: { data: Array<{ system: SystemsResponse; presence: number }> }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return <TableComponent table={table} />
}
