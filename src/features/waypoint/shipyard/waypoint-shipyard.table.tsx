import {
  type SortingState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { Table } from '@/components/table'
import { columns } from './waypoint-shipyard.columns'
import { type WaypointShipyardTableProps } from './waypoint-shipyard.types'

export const WaypointShipyardTable = ({ data }: WaypointShipyardTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'type', desc: false }])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onSortingChange: setSorting,
    state: { sorting },
    enableHiding: true,
    enableFilters: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
  })

  return <Table table={table} />
}
