import { createColumnHelper } from '@tanstack/react-table'
import { Translation } from 'react-i18next'
import { Badge } from '@/components/badge'
import { Sort } from '@/components/table'
import { TradeGoodContext } from '@/features/trade-good/context'
import { cx } from '@/utilities/cx.helper'
import type { WaypointMarketTableSchema } from './waypoint-market.types'

const columnHelper = createColumnHelper<WaypointMarketTableSchema>()

export const columns = [
  columnHelper.accessor((row) => row.good.name, {
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
          <div className="text-sm whitespace-pre-wrap text-foreground-secondary">{row.original.good.description}</div>
        </>
      )
    },
    enableSorting: true,
    minSize: 30,
    maxSize: 30,
  }),
  columnHelper.accessor((row) => row.trade?.tradeVolume, {
    id: 'trade_volume',
    header: () => (
      <div className="whitespace-nowrap text-right">
        <Translation>{(t) => t('general.header.trade_volume')}</Translation>
      </div>
    ),
    cell: ({ getValue }) => {
      const value = getValue()

      if (value === undefined) {
        return <div className="text-sm text-right text-foreground-secondary">-</div>
      }

      return (
        <div className="text-sm text-right">
          <Translation>{(t) => t('formatter.number', { value })}</Translation>
        </div>
      )
    },
    enableSorting: false,
    minSize: 15,
    maxSize: 15,
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
        return <div className="text-sm text-right text-foreground-secondary">-</div>
      }

      return (
        <div className="text-right">
          <Badge>
            <Translation ns="spacetraders.trade_supply">{(t) => t(value)}</Translation>
          </Badge>
        </div>
      )
    },
    enableSorting: false,
    minSize: 15,
    maxSize: 15,
  }),
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
            {(ctx) => (
              <>
                <div className={cx('text-sm', { 'text-foreground-secondary': !ctx.Buy })}>
                  <Translation>{(t) => t('formatter.number', { value })}</Translation>
                </div>
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
    minSize: 20,
    maxSize: 20,
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
            {(ctx) => (
              <>
                <div className={cx('text-sm', { 'text-foreground-secondary': !ctx.Sell })}>
                  <Translation>{(t) => t('formatter.number', { value })}</Translation>
                </div>
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
    minSize: 20,
    maxSize: 20,
  }),
]
