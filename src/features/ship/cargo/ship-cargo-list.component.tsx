import { Button } from '@/components/button'
import { ShipNavStatus, WaypointTraits } from '@/config/spacetraders'
import { useShipResponse } from '@/context/ship.context'
import { useWaypointResponse } from '@/context/waypoint.context'
import { TradeGoodBuy } from '@/features/trade-good/buy'
import { TradeGoodContext } from '@/features/trade-good/context'
import { TradeGoodSell } from '@/features/trade-good/sell'
import { hasTrait } from '@/features/waypoint/utilities/has-trait.helper'
import { getWaypointMarketQuery } from '@/services/api/spacetraders/waypoints'
import type { MarketTradeGood } from '@/types/spacetraders'
import { reduceArrayToMap } from '@/utilities/reduce-array-to-map.helper'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { ShipCargoTable } from './ship-cargo-list.table'

export const ShipCargoList = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const ship = useShipResponse()
  const waypoint = useWaypointResponse()
  const hasMarketplace = hasTrait(waypoint.traits, [WaypointTraits.Marketplace])
  const { data, isSuccess } = useQuery({
    ...getWaypointMarketQuery({
      systemSymbol: waypoint.systemSymbol,
      waypointSymbol: waypoint.symbol,
    }),
    enabled: hasMarketplace,
  })
  const inventory = ship.cargo.inventory
  const market = isSuccess
    ? {
        imports: reduceArrayToMap(data.data.imports, 'symbol'),
        exports: reduceArrayToMap(data.data.exports, 'symbol'),
        exchange: reduceArrayToMap(data.data.exchange, 'symbol'),
        trade: reduceArrayToMap(data.data.tradeGoods, 'symbol'),
      }
    : null

  if (!inventory.length) {
    return (
      <div className="flex flex-col gap-2 rounded border-2 border-border-secondary border-dashed px-3 py-9">
        <div className="text-center text-secondary">
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
              void navigate({ to: '/fleet/$shipSymbol/market', params: { shipSymbol: ship.symbol }, replace: true })
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
    <TradeGoodContext
      value={{
        Buy: TradeGoodBuy,
        Sell: TradeGoodSell,
        canBuy: useCallback(
          (good: MarketTradeGood) => {
            if (good === undefined || ship.nav.status !== ShipNavStatus.Docked) return false

            const hasExport = market?.exports.has(good.symbol)
            const hasExchange = market?.exchange.has(good.symbol)

            return Boolean(hasExport) || Boolean(hasExchange)
          },
          [market, ship],
        ),
        canSell: useCallback(
          (good: MarketTradeGood) => {
            if (good === undefined || ship.nav.status !== ShipNavStatus.Docked) return false

            const hasImport = market?.imports.has(good.symbol)
            const hasExchange = market?.exchange.has(good.symbol)

            return Boolean(hasImport) || Boolean(hasExchange)
          },
          [market, ship],
        ),
      }}
    >
      <ShipCargoTable
        data={inventory.map((item) => ({
          item,
          trade: market?.trade.get(item.symbol),
        }))}
      />
    </TradeGoodContext>
  )
}
