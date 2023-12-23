import { useIsMutating } from '@tanstack/react-query'
import {
  type ColumnFiltersState,
  type SortingState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { cx } from 'class-variance-authority'
import { useState } from 'react'
import { Row, Table } from '@/components/table'
import { columns } from './ship-list.columns'
import { type ShipListTableProps, type ShipRowProps } from './ship-list.types'

const ShipRow = ({ row }: ShipRowProps) => {
  const isMutating =
    useIsMutating({ mutationKey: [{ scope: 'ships', entity: 'item' }, { shipSymbol: row.original.ship.symbol }] }) > 0

  return (
    <Row
      className={cx({
        'pointer-events-none opacity-30': isMutating,
      })}
      row={row}
    />
  )
}

export const ShipListTable = ({ data }: ShipListTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'symbol', desc: false }])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: { sorting, columnFilters },
    enableHiding: true,
    enableFilters: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
  })

  return <Table table={table} Row={ShipRow} />
}
