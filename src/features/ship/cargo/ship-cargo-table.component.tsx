import { type SortingState, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import { TableComponent } from '@/components/table'
import { type CargoInventory, type MarketTradeGood } from '@/types/spacetraders'
import { columns } from './ship-cargo-list.columns'

export const ShipCargoTable = ({ data }: { data: Array<{ item: CargoInventory; trade?: MarketTradeGood }> }) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: false }])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  })

  return <TableComponent table={table} />
}
