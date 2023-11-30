import {
  type SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { cx } from 'class-variance-authority'
import { useState } from 'react'
import { Translation } from 'react-i18next'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { MARKET_TRADE_GOOD_SUPPLY } from '@/config/constants'
import { TradeGoodContext } from '@/features/trade-good/context'
import { type MarketGood, type MarketTradeGood } from '@/types/spacetraders'
import { getSortingIcon } from '@/utilities/get-sorting-icon.helper'
import { formatNumber } from '@/utilities/number'

const columnHelper = createColumnHelper<{ good: MarketGood; trade?: MarketTradeGood }>()
const columns = [
  columnHelper.accessor((row) => row.good.name, {
    id: 'name',
    header: ({ column }) => {
      const sorted = column.getIsSorted()

      return (
        <div className="flex w-64 items-center justify-start gap-2 text-right">
          <Translation>{(t) => <div>{t('general.header.name')}</div>}</Translation>
          <div>
            <Button
              intent={sorted === false ? 'dim' : 'primary'}
              kind="flat"
              size="small"
              onClick={column.getToggleSortingHandler()}
            >
              <AppIcon id={getSortingIcon(sorted, 'alpha')} className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    },
    cell: ({ getValue }) => {
      return <>{getValue()}</>
    },
    enableSorting: true,
  }),
  columnHelper.accessor((row) => row.trade?.tradeVolume, {
    id: 'trade_volume',
    header: () => (
      <div className="text-right">
        <Translation>{(t) => t('general.header.trade_volume')}</Translation>
      </div>
    ),
    cell: ({ getValue }) => {
      const value = getValue()

      if (value === undefined) {
        return <div className="text-secondary text-right text-sm">-</div>
      }

      return <div className="text-right text-sm">{formatNumber(value)}</div>
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.trade?.supply, {
    id: 'supply',
    header: () => (
      <div className="text-right">
        <Translation>{(t) => t('general.header.supply')}</Translation>
      </div>
    ),
    cell: ({ getValue }) => {
      const value = getValue()

      if (value === undefined) {
        return <div className="text-secondary text-right text-sm">-</div>
      }

      return (
        <div className="text-right">
          <Badge>{MARKET_TRADE_GOOD_SUPPLY.get(value)}</Badge>
        </div>
      )
    },
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.trade?.purchasePrice, {
    id: 'purchase_price',
    header: ({ column }) => {
      const sorted = column.getIsSorted()

      return (
        <div className="flex items-center justify-end gap-2 text-right">
          <Translation>{(t) => <div>{t('general.header.purchase_price')}</div>}</Translation>
          <div>
            <Button
              intent={sorted === false ? 'dim' : 'primary'}
              kind="flat"
              size="small"
              onClick={column.getToggleSortingHandler()}
            >
              <AppIcon id={getSortingIcon(sorted, 'numeric')} className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    },
    cell: ({ row, getValue }) => {
      const value = getValue()

      if (value === undefined) {
        return <div className="text-secondary text-right text-sm">-</div>
      }

      return (
        <div className="flex items-center justify-end gap-2">
          <TradeGoodContext.Consumer>
            {(ctx) => (
              <>
                <div className={cx('text-sm', { 'text-secondary': !ctx.Buy })}>{formatNumber(value)}</div>
                {ctx.Buy !== undefined && row.original.trade !== undefined ? (
                  <ctx.Buy good={row.original.trade} />
                ) : null}
              </>
            )}
          </TradeGoodContext.Consumer>
        </div>
      )
    },
    enableSorting: true,
    sortDescFirst: false,
  }),
  columnHelper.accessor((row) => row.trade?.sellPrice, {
    id: 'sell_price',
    header: ({ column }) => {
      const sorted = column.getIsSorted()

      return (
        <div className="flex items-center justify-end gap-2 text-right">
          <Translation>{(t) => <div>{t('general.header.sell_price')}</div>}</Translation>
          <div>
            <Button
              intent={sorted === false ? 'dim' : 'primary'}
              kind="flat"
              size="small"
              onClick={column.getToggleSortingHandler()}
            >
              <AppIcon id={getSortingIcon(sorted, 'numeric')} className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    },
    cell: ({ row, getValue }) => {
      const value = getValue()

      if (value === undefined) {
        return <div className="text-secondary text-right text-sm">-</div>
      }

      return (
        <div className="flex items-center justify-end gap-2">
          <TradeGoodContext.Consumer>
            {(ctx) => (
              <>
                <div className={cx('text-sm', { 'text-secondary': !ctx.Sell })}>{formatNumber(value)}</div>
                {ctx.Sell !== undefined && row.original.trade !== undefined ? (
                  <ctx.Sell good={row.original.trade} />
                ) : null}
              </>
            )}
          </TradeGoodContext.Consumer>
        </div>
      )
    },
    enableSorting: true,
    sortDescFirst: false,
  }),
]

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

  return (
    <div className="overflow-hidden rounded-xl">
      <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-950">
        <thead className="bg-zinc-200/50 dark:bg-zinc-700/50">
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
            <tr key={row.id} className="even:bg-zinc-300/10 dark:even:bg-zinc-700/10">
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
