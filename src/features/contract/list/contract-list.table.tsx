import { Table } from '@/components/table'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import type { ContractListTableProps } from './contract-list.types'

export const ContractListTable = ({ data, columns }: ContractListTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return <Table table={table} />
}
