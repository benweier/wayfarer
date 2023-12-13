import { useQuery } from '@tanstack/react-query'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/button'
import { useShipResponse } from '@/context/ship.context'
import { useWaypointResponse } from '@/context/waypoint.context'
import { ShipCargoTable } from '@/features/ship/cargo/ship-cargo-table.component'
import { TradeGoodBuy } from '@/features/trade-good/buy'
import { TradeGoodContext } from '@/features/trade-good/context'
import { TradeGoodSell } from '@/features/trade-good/sell'
import { getWaypointMarketQuery } from '@/services/api/spacetraders'
import { type MarketTradeGood } from '@/types/spacetraders'

export const ShipCargoList = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const ship = useShipResponse()
  const waypoint = useWaypointResponse()
  const hasMarketplace = waypoint.traits.findIndex((trait) => trait.symbol === 'MARKETPLACE') !== -1
  const { data, isSuccess } = useQuery({
    queryKey: getWaypointMarketQuery.getQueryKey({
      systemSymbol: ship.nav.systemSymbol,
      waypointSymbol: ship.nav.waypointSymbol,
    }),
    queryFn: getWaypointMarketQuery.queryFn,
    select: (response) => {
      const trade = response.data.tradeGoods?.reduce<Map<string, MarketTradeGood>>((result, item) => {
        result.set(item.symbol, item)

        return result
      }, new Map())

      return {
        market: response.data,
        trade,
      }
    },
    enabled: hasMarketplace,
  })
  const inventory = ship.cargo.inventory

  if (!inventory.length) {
    return (
      <div className="flex flex-col gap-2 rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
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
            intent="primary"
            disabled={!hasMarketplace}
            onClick={() => {
              navigate(`/fleet/ship/${ship.symbol}/market`)
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
        canBuy(good) {
          const hasExport = isSuccess && data.market.exports.findIndex((item) => item.symbol === good?.symbol) !== -1
          const hasExchange = isSuccess && data.market.exchange.findIndex((item) => item.symbol === good?.symbol) !== -1

          return hasExport || hasExchange
        },
        canSell(good) {
          const hasImport = isSuccess && data.market.imports.findIndex((item) => item.symbol === good?.symbol) !== -1
          const hasExchange = isSuccess && data.market.exchange.findIndex((item) => item.symbol === good?.symbol) !== -1

          return hasImport || hasExchange
        },
      }}
    >
      <ShipCargoTable
        data={inventory.map((item) => ({
          item,
          trade: data?.trade?.get(item.symbol),
        }))}
      />
    </TradeGoodContext.Provider>
  )
}
