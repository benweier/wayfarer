import { type SortingState, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import { TableComponent } from '@/components/table'
import { type MarketGood, type MarketTradeGood } from '@/types/spacetraders'
import { columns } from './waypoint-market.columns'

export const WaypointMarketTable = ({ data }: { data: Array<{ good: MarketGood; trade?: MarketTradeGood }> }) => {
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
