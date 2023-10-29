import {
  type SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { MARKET_TRADE_GOOD_SUPPLY } from '@/config/constants'
import { TradeGoodBuy } from '@/features/trade-good/buy'
import { TradeGoodSell } from '@/features/trade-good/sell'
import { type MarketGood, type MarketTradeGood } from '@/types/spacetraders'
import { formatNumber } from '@/utilities/number'

const columnHelper = createColumnHelper<{ good: MarketGood; trade?: MarketTradeGood }>()
const columns = [
  columnHelper.accessor((row) => row.good.name, {
    id: 'name',
    header: ({ column }) => (
      <div className="flex w-64 items-center justify-start gap-2 text-right">
        <div>Name</div>
        <div>
          <Button
            intent={column.getIsSorted() !== false ? 'primary' : undefined}
            kind={column.getIsSorted() !== false ? 'flat' : undefined}
            size="small"
            onClick={column.getToggleSortingHandler()}
          >
            <AppIcon id="arrow:up-down" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    ),
    cell: ({ getValue }) => {
      return <>{getValue()}</>
    },
    enableSorting: true,
  }),
  columnHelper.accessor((row) => row.trade?.tradeVolume, {
    id: 'tradeVolume',
    header: () => <div className="text-right">Trade Volume</div>,
    cell: ({ getValue }) => {
      const value = getValue()

      return <div className="text-right text-sm">{value !== undefined && formatNumber(value)}</div>
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.trade?.supply, {
    id: 'supply',
    header: () => <div className="text-right">Supply</div>,
    cell: ({ getValue }) => {
      const value = getValue()

      return (
        <div className="text-right">{value !== undefined && <Badge>{MARKET_TRADE_GOOD_SUPPLY.get(value)}</Badge>}</div>
      )
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.trade?.purchasePrice, {
    id: 'buy',
    header: ({ column }) => (
      <div className="flex items-center justify-end gap-2 text-right">
        <div>Purchase Price</div>
        <div>
          <Button
            intent={column.getIsSorted() !== false ? 'primary' : undefined}
            kind={column.getIsSorted() !== false ? 'flat' : undefined}
            size="small"
            onClick={column.getToggleSortingHandler()}
          >
            <AppIcon id="arrow:up-down" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    ),
    cell: ({ row, getValue }) => {
      const value = getValue()

      return (
        <div className="flex items-center justify-end gap-2">
          {value !== undefined && <div className="text-sm">{formatNumber(value)}</div>}
          {row.original.trade && <TradeGoodBuy good={row.original.trade} />}
        </div>
      )
    },
    enableSorting: true,
    sortDescFirst: false,
  }),
  columnHelper.accessor((row) => row.trade?.sellPrice, {
    id: 'sell',
    header: ({ column }) => (
      <div className="flex items-center justify-end gap-2 text-right">
        <div>Sell Price</div>
        <div>
          <Button
            intent={column.getIsSorted() !== false ? 'primary' : undefined}
            kind={column.getIsSorted() !== false ? 'flat' : undefined}
            size="small"
            onClick={column.getToggleSortingHandler()}
          >
            <AppIcon id="arrow:up-down" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    ),
    cell: ({ row, getValue }) => {
      const value = getValue()

      return (
        <div className="flex items-center justify-end gap-2">
          {value !== undefined && <div className="text-sm">{formatNumber(value)}</div>}
          {row.original.trade && <TradeGoodSell good={row.original.trade} />}
        </div>
      )
    },
    enableSorting: true,
    sortDescFirst: false,
  }),
]

export const WaypointMarketTable = ({
  goods,
  trade,
}: {
  goods: MarketGood[]
  trade?: Map<string, MarketTradeGood>
}) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: false }])
  const data = useMemo(() => {
    return goods.map((good) => ({ good, trade: trade?.get(good.symbol) }))
  }, [goods, trade])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  })

  return (
    <div className="overflow-hidden ring-1 ring-black ring-opacity-10 sm:rounded-lg">
      <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-950">
        <thead className="bg-zinc-100 dark:bg-zinc-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} scope="col" className="text-primary px-3 py-3.5 text-left text-sm font-semibold">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-zinc-200 bg-zinc-100/50 dark:divide-zinc-950 dark:bg-zinc-800/50">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="text-primary whitespace-nowrap p-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}