import { useSuspenseQuery } from '@tanstack/react-query'
import { useWaypointResponse } from '@/context/waypoint.context'
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
      imports={<WaypointMarketTable goods={market.imports} trade={tradeGoods} />}
      exports={<WaypointMarketTable goods={market.exports} trade={tradeGoods} />}
      exchange={<WaypointMarketTable goods={market.exchange} trade={tradeGoods} />}
    />
  )
}
