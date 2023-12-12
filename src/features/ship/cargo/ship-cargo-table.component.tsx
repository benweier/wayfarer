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
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { TradeGoodContext } from '@/features/trade-good/context'
import { type CargoInventory, type MarketTradeGood } from '@/types/spacetraders'
import { getSortingIcon } from '@/utilities/get-sorting-icon.helper'
import { formatNumber } from '@/utilities/number'

const columnHelper = createColumnHelper<{ item: CargoInventory; trade?: MarketTradeGood }>()
const columns = [
  columnHelper.accessor((row) => row.item.name, {
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
    cell: ({ getValue, row }) => {
      return (
        <>
          <div>{getValue()}</div>
          <div className="text-secondary whitespace-pre-wrap text-sm">{row.original.item.description}</div>
        </>
      )
    },
    enableSorting: true,
    minSize: 30,
    maxSize: 30,
  }),
  columnHelper.accessor((row) => row.item.units, {
    id: 'quantity',
    header: () => (
      <div className="text-right">
        <Translation>{(t) => t('general.header.quantity')}</Translation>
      </div>
    ),
    cell: ({ getValue }) => {
      const value = getValue()

      return <div className="text-right">{formatNumber(value)}</div>
    },
    enableSorting: false,
    minSize: 15,
    maxSize: 15,
  }),
  columnHelper.accessor(
    (row) => {
      const units = row.item.units
      const sell = row.trade?.sellPrice

      if (sell === undefined) {
        return undefined
      }

      return units * sell
    },
    {
      id: 'market_value',
      header: () => (
        <div className="text-right">
          <Translation>{(t) => t('general.header.market_value')}</Translation>
        </div>
      ),
      cell: ({ getValue }) => {
        const value = getValue()

        if (value === undefined) {
          return <div className="text-secondary text-right text-sm">-</div>
        }

        return <div className="text-right">{formatNumber(value)}</div>
      },
      enableSorting: false,
      minSize: 15,
      maxSize: 15,
    },
  ),
  columnHelper.accessor((row) => row.trade?.purchasePrice, {
    id: 'purchase_price',
    header: ({ column }) => {
      const sorted = column.getIsSorted()

      return (
        <div className="flex items-center justify-end gap-2 text-right">
          <Translation>
            {(t) => <div className="whitespace-nowrap">{t('general.header.purchase_price')}</div>}
          </Translation>
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
            {(ctx) => {
              const canBuy = ctx.canBuy?.(row.original.trade)

              return (
                <>
                  <div className={cx('text-sm', { 'text-secondary': !ctx.Buy || !canBuy })}>{formatNumber(value)}</div>
                  {ctx.Buy && canBuy && <ctx.Buy good={row.original.trade} />}
                </>
              )
            }}
          </TradeGoodContext.Consumer>
        </div>
      )
    },
    enableSorting: true,
    sortDescFirst: false,
    minSize: 15,
    maxSize: 15,
  }),
  columnHelper.accessor((row) => row.trade?.sellPrice, {
    id: 'sell_price',
    header: ({ column }) => {
      const sorted = column.getIsSorted()

      return (
        <div className="flex items-center justify-end gap-2 text-right">
          <Translation>{(t) => <div className="whitespace-nowrap">{t('general.header.sell_price')}</div>}</Translation>
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
            {(ctx) => {
              const canSell = ctx.canSell?.(row.original.trade)

              return (
                <>
                  <div className={cx('text-sm', { 'text-secondary': !ctx.Sell || !canSell })}>
                    {formatNumber(value)}
                  </div>
                  {ctx.Sell && canSell && <ctx.Sell good={row.original.trade} />}
                </>
              )
            }}
          </TradeGoodContext.Consumer>
        </div>
      )
    },
    enableSorting: true,
    sortDescFirst: false,
    minSize: 15,
    maxSize: 15,
  }),
]

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

  return (
    <div className="w-full max-w-full overflow-x-auto overflow-y-hidden">
      <table className="w-full divide-y divide-zinc-200 overflow-hidden rounded-xl dark:divide-zinc-950">
        <thead className="bg-zinc-200/50 dark:bg-zinc-700/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className="text-primary px-3 py-3.5 text-left text-sm font-semibold"
                  style={{ width: `${header.getSize()}%` }}
                >
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
