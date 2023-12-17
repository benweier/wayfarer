import { createColumnHelper } from '@tanstack/react-table'
import { cx } from 'class-variance-authority'
import { Translation } from 'react-i18next'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { TradeGoodContext } from '@/features/trade-good/context'
import { getSortingIcon } from '@/utilities/get-sorting-icon.helper'
import { formatNumber } from '@/utilities/number'
import { type WaypointMarketTableSchema } from './waypoint-market.types'

const columnHelper = createColumnHelper<WaypointMarketTableSchema>()

export const columns = [
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
    cell: ({ getValue, row }) => {
      return (
        <>
          <div>{getValue()}</div>
          <div className="text-secondary whitespace-pre-wrap text-sm">{row.original.good.description}</div>
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
        return <div className="text-secondary text-right text-sm">-</div>
      }

      return <div className="text-right text-sm">{formatNumber(value)}</div>
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
        return <div className="text-secondary text-right text-sm">-</div>
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
    minSize: 20,
    maxSize: 20,
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
    minSize: 20,
    maxSize: 20,
  }),
]
