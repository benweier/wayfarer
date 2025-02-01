import { createColumnHelper } from '@tanstack/react-table'
import { Translation } from 'react-i18next'
import { AppIcon } from '@/components/icons'
import { Sort } from '@/components/table'
import { Tooltip } from '@/components/tooltip'
import { ShipCargoItemControls } from '@/features/ship/cargo/ship-cargo-item.controls'
import { TradeGoodContext } from '@/features/trade-good/context'
import { cx } from '@/utilities/cx.helper'
import type { ShipCargoTableSchema } from './ship-cargo.types'

const columnHelper = createColumnHelper<ShipCargoTableSchema>()

export const columns = [
  columnHelper.accessor((row) => row.item.name, {
    id: 'name',
    header: ({ column }) => {
      return (
        <div className="flex w-64 items-center justify-start gap-2 text-right">
          <Translation>{(t) => <div>{t('general.header.name')}</div>}</Translation>
          <div>
            <Sort column={column} type="alpha" />
          </div>
        </div>
      )
    },
    cell: ({ getValue, row }) => {
      return (
        <>
          <div>{getValue()}</div>
          <div className="text-sm whitespace-pre-wrap text-foreground-secondary">{row.original.item.description}</div>
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

      return (
        <div className="text-right">
          <Translation>{(t) => t('formatter.number', { value })}</Translation>
        </div>
      )
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

          <Tooltip trigger={<AppIcon id="help" className="size-4 text-foreground-secondary" />}>
            <Translation>{(t) => t('ship.cargo_market_value_tooltip')}</Translation>
          </Tooltip>
        </div>
      ),
      cell: ({ getValue }) => {
        const value = getValue()

        if (value === undefined) {
          return <div className="text-sm text-right text-foreground-secondary">-</div>
        }

        return (
          <div className="text-right">
            <Translation>{(t) => t('formatter.number', { value })}</Translation>
          </div>
        )
      },
      enableSorting: false,
      minSize: 15,
      maxSize: 15,
    },
  ),
  columnHelper.accessor((row) => row.trade?.purchasePrice, {
    id: 'purchase_price',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-end gap-2 text-right">
          <Translation>
            {(t) => <div className="whitespace-nowrap">{t('general.header.purchase_price')}</div>}
          </Translation>
          <div>
            <Sort column={column} type="numeric" />
          </div>
        </div>
      )
    },
    cell: ({ row, getValue }) => {
      const value = getValue()

      if (value === undefined) {
        return <div className="text-sm text-right text-foreground-secondary">-</div>
      }

      return (
        <div className="flex items-center justify-end gap-2">
          <TradeGoodContext.Consumer>
            {(ctx) => {
              const canBuy = ctx.canBuy?.(row.original.trade)

              return (
                <>
                  <div className={cx('text-sm', { 'text-foreground-secondary': !ctx.Buy || !canBuy })}>
                    <Translation>{(t) => t('formatter.number', { value })}</Translation>
                  </div>
                  {ctx.Buy && <ctx.Buy good={row.original.trade} disabled={!canBuy} />}
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
      return (
        <div className="flex items-center justify-end gap-2 text-right">
          <Translation>{(t) => <div className="whitespace-nowrap">{t('general.header.sell_price')}</div>}</Translation>
          <div>
            <Sort column={column} type="numeric" />
          </div>
        </div>
      )
    },
    cell: ({ row, getValue }) => {
      const value = getValue()

      if (value === undefined) {
        return <div className="text-sm text-right text-foreground-secondary">-</div>
      }

      return (
        <div className="flex items-center justify-end gap-2">
          <TradeGoodContext.Consumer>
            {(ctx) => {
              const canSell = ctx.canSell?.(row.original.trade)

              return (
                <>
                  <div className={cx('text-sm', { 'text-foreground-secondary': !ctx.Sell || !canSell })}>
                    <Translation>{(t) => t('formatter.number', { value })}</Translation>
                  </div>
                  {ctx.Sell && <ctx.Sell good={row.original.trade} disabled={!canSell} />}
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
