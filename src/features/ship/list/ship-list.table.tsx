import { useIsMutating } from '@tanstack/react-query'
import {
  type ColumnFiltersState,
  type Row,
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
import { RowComponent, TableComponent } from '@/components/table'
import { type ShipResponse } from '@/types/spacetraders'
import { columns } from './ship-list.columns'

const ShipRow = ({ row }: { row: Row<{ ship: ShipResponse }> }) => {
  const isMutating =
    useIsMutating({ mutationKey: [{ scope: 'ships', entity: 'item' }, { shipSymbol: row.original.ship.symbol }] }) > 0

  return (
    <RowComponent
      className={cx({
        'pointer-events-none opacity-30': isMutating,
      })}
      row={row}
    />
  )
}

export const ShipListTable = ({ data }: { data: Array<{ ship: ShipResponse }> }) => {
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

  return <TableComponent table={table} Row={ShipRow} />
}
