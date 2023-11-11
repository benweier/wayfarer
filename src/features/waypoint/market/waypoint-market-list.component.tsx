import { useSuspenseQuery } from '@tanstack/react-query'
import { useWaypointResponse } from '@/context/waypoint.context'
import { TradeGoodBuy } from '@/features/trade-good/buy'
import { TradeGoodContext } from '@/features/trade-good/context'
import { TradeGoodSell } from '@/features/trade-good/sell'
import { getWaypointMarketQuery } from '@/services/api/spacetraders'
import { type MarketTradeGood } from '@/types/spacetraders'
import { WaypointMarketTable } from './waypoint-market-table.component'
import { WaypointMarketLayout } from './waypoint-market.layout'

export const WaypointMarketList = () => {
  const waypoint = useWaypointResponse()
  const { data } = useSuspenseQuery({
    queryKey: getWaypointMarketQuery.getQueryKey({
      systemSymbol: waypoint.systemSymbol,
      waypointSymbol: waypoint.symbol,
    }),
    queryFn: getWaypointMarketQuery.queryFn,
  })
  const market = data.data
  const tradeGoods = market.tradeGoods?.reduce<Map<string, MarketTradeGood>>((result, item) => {
    result.set(item.symbol, item)

    return result
  }, new Map())

  return (
    <WaypointMarketLayout
      imports={
        market.imports.length === 0 ? (
          <div className="flex flex-col gap-4 rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
            <div className="text-overline text-center">No Market Imports Available</div>
          </div>
        ) : (
          <TradeGoodContext.Provider value={{ Sell: TradeGoodSell }}>
            <WaypointMarketTable data={market.imports.map((good) => ({ good, trade: tradeGoods?.get(good.symbol) }))} />
          </TradeGoodContext.Provider>
        )
      }
      exports={
        market.exports.length === 0 ? (
          <div className="flex flex-col gap-4 rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
            <div className="text-overline text-center">No Market Exports Available</div>
          </div>
        ) : (
          <TradeGoodContext.Provider value={{ Buy: TradeGoodBuy }}>
            <WaypointMarketTable data={market.exports.map((good) => ({ good, trade: tradeGoods?.get(good.symbol) }))} />
          </TradeGoodContext.Provider>
        )
      }
      exchange={
        market.exchange.length === 0 ? (
          <div className="flex flex-col gap-4 rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
            <div className="text-overline text-center">No Market Exchanges Available</div>
          </div>
        ) : (
          <TradeGoodContext.Provider value={{ Buy: TradeGoodBuy, Sell: TradeGoodSell }}>
            <WaypointMarketTable
              data={market.exchange.map((good) => ({ good, trade: tradeGoods?.get(good.symbol) }))}
            />
          </TradeGoodContext.Provider>
        )
      }
    />
  )
}
