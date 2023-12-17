import * as Tooltip from '@radix-ui/react-tooltip'
import { createColumnHelper } from '@tanstack/react-table'
import { cx } from 'class-variance-authority'
import { Translation } from 'react-i18next'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { ShipCargoItemControls } from '@/features/ship/cargo/ship-cargo-item.controls'
import { TradeGoodContext } from '@/features/trade-good/context'
import { getSortingIcon } from '@/utilities/get-sorting-icon.helper'
import { formatNumber } from '@/utilities/number'
import { type ShipCargoTableSchema } from './ship-cargo.types'

const columnHelper = createColumnHelper<ShipCargoTableSchema>()

export const columns = [
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
    minSize: 35,
    maxSize: 35,
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
        <div className="flex items-center justify-end gap-2">
          <Translation>{(t) => <div>{t('general.header.market_value')}</div>}</Translation>

          <Tooltip.Provider delayDuration={100}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button>
                  <AppIcon id="help" className="text-secondary h-5 w-5" />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="w-64 rounded-md bg-zinc-200 px-4 py-2 text-xs text-zinc-800" sideOffset={5}>
                  <Translation>{(t) => t('ship.cargo_market_value_tooltip')}</Translation>
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
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
  columnHelper.display({
    id: 'actions',
    header: () => {
      return <></>
    },
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <ShipCargoItemControls item={row.original.item} />
        </div>
      )
    },
    minSize: 5,
    maxSize: 5,
  }),
]