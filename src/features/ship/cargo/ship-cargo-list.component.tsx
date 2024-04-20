import { Button } from '@/components/button'
import { WaypointTraits } from '@/config/spacetraders'
import { useShipResponse } from '@/context/ship.context'
import { TradeGoodBuy } from '@/features/trade-good/buy'
import { TradeGoodContext } from '@/features/trade-good/context'
import { TradeGoodSell } from '@/features/trade-good/sell'
import { hasTrait } from '@/features/waypoint/utilities/has-trait.helper'
import { getWaypointByIdQuery, getWaypointMarketQuery } from '@/services/api/spacetraders/waypoints'
import { reduceArrayToMap } from '@/utilities/reduce-array-to-map.helper'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Trans, useTranslation } from 'react-i18next'
import { ShipCargoTable } from './ship-cargo-list.table'

export const ShipCargoList = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const ship = useShipResponse()
  const waypoint = useQuery(
    getWaypointByIdQuery({
      systemSymbol: ship.nav.systemSymbol,
      waypointSymbol: ship.nav.waypointSymbol,
    }),
  )
  const hasMarketplace = waypoint.isSuccess && hasTrait(waypoint.data.data.traits, [WaypointTraits.Marketplace])
  const { data, isSuccess } = useQuery({
    ...getWaypointMarketQuery({
      systemSymbol: ship.nav.systemSymbol,
      waypointSymbol: ship.nav.waypointSymbol,
    }),
    select: (response) => {
      return {
        market: {
          imports: reduceArrayToMap(response.data.imports, 'symbol'),
          exports: reduceArrayToMap(response.data.exports, 'symbol'),
          exchange: reduceArrayToMap(response.data.exchange, 'symbol'),
        },
        trade: reduceArrayToMap(response.data.tradeGoods, 'symbol'),
      }
    },
    enabled: hasMarketplace && ship.nav.status !== 'IN_TRANSIT',
  })
  const inventory = ship.cargo.inventory

  if (!inventory.length) {
    return (
      <div className="flex flex-col gap-2 rounded border-2 border-dashed border-zinc-300 py-9 px-3 dark:border-zinc-600">
        <div className="text-secondary text-center">
          <Trans
            i18nKey="ship.cargo_empty"
            components={{
              ship_symbol: <span className="font-bold">{ship.symbol}</span>,
            }}
          />
        </div>
        <div className="text-center">
          <Button
            intent="info"
            disabled={!hasMarketplace}
            onClick={() => {
              void navigate({ to: '/fleet/$shipSymbol/market', params: { shipSymbol: ship.symbol } })
            }}
          >
            {hasMarketplace
              ? t('waypoint.view_market', { waypointSymbol: ship.nav.waypointSymbol })
              : t('waypoint.no_market', { waypointSymbol: ship.nav.waypointSymbol })}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <TradeGoodContext.Provider
      value={{
        Buy: TradeGoodBuy,
        Sell: TradeGoodSell,
        canBuy: (good) => {
          if (!isSuccess || good === undefined || ship.nav.status !== 'DOCKED') return false

          const hasExport = data.market.exports.has(good.symbol)
          const hasExchange = data.market.exchange.has(good.symbol)

          return hasExport || hasExchange
        },
        canSell: (good) => {
          if (!isSuccess || good === undefined || ship.nav.status !== 'DOCKED') return false

          const hasImport = data.market.imports.has(good.symbol)
          const hasExchange = data.market.exchange.has(good.symbol)

          return hasImport || hasExchange
        },
      }}
    >
      <ShipCargoTable
        data={inventory.map((item) => ({
          item,
          trade: data?.trade.get(item.symbol),
        }))}
      />
    </TradeGoodContext.Provider>
  )
}
