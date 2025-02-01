import { getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import { Table } from '@/components/table'
import { columns } from './waypoint-market.columns'
import type { WaypointMarketTableProps } from './waypoint-market.types'
import type { SortingState } from '@tanstack/react-table'

export const WaypointMarketTable = ({ data }: WaypointMarketTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: false }])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  })

  return <Table table={table} />
}
