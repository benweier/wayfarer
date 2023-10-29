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
        <TradeGoodContext.Provider value={{ Sell: TradeGoodSell }}>
          <WaypointMarketTable data={market.imports.map((good) => ({ good, trade: tradeGoods?.get(good.symbol) }))} />
        </TradeGoodContext.Provider>
      }
      exports={
        <TradeGoodContext.Provider value={{ Buy: TradeGoodBuy }}>
          <WaypointMarketTable data={market.exports.map((good) => ({ good, trade: tradeGoods?.get(good.symbol) }))} />
        </TradeGoodContext.Provider>
      }
      exchange={
        <TradeGoodContext.Provider value={{ Buy: TradeGoodBuy, Sell: TradeGoodSell }}>
          <WaypointMarketTable data={market.exchange.map((good) => ({ good, trade: tradeGoods?.get(good.symbol) }))} />
        </TradeGoodContext.Provider>
      }
    />
  )
}
