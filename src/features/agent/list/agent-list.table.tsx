import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Table } from '@/components/table'
import { columns } from './agent-list.columns'
import type { AgentListTableProps } from './agent-list.types'

export const AgentListTable = ({ data }: AgentListTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return <Table table={table} />
}
