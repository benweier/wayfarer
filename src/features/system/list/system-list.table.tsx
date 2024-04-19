import { Table } from '@/components/table'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { columns } from './system-list.columns'
import type { SystemListTableProps } from './system-list.types'

export const SystemListTable = ({ data }: SystemListTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return <Table table={table} />
}
