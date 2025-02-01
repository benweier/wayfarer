import { useSuspenseQuery } from '@tanstack/react-query'
import { useWaypointResponse } from '@/context/waypoint.context'
import { getWaypointMarketQuery } from '@/services/api/spacetraders/waypoints'
import { reduceArrayToMap } from '@/utilities/reduce-array-to-map.helper'
import {
  WaypointMarketExchange,
  WaypointMarketExports,
  WaypointMarketImports,
} from './waypoint-market-groups.component'
import { WaypointMarketLayout } from './waypoint-market.layout'
import type { WaypointMarketListProps } from '@/features/waypoint/market/waypoint-market.types'

export const WaypointMarketList = ({
  imports: Imports = WaypointMarketImports,
  exports: Exports = WaypointMarketExports,
  exchange: Exchange = WaypointMarketExchange,
}: WaypointMarketListProps) => {
  const waypoint = useWaypointResponse()
  const { data } = useSuspenseQuery(
    getWaypointMarketQuery({
      systemSymbol: waypoint.systemSymbol,
      waypointSymbol: waypoint.symbol,
    }),
  )
  const market = data.data
  const tradeGoods = reduceArrayToMap(data.data.tradeGoods, 'symbol')

  return (
    <WaypointMarketLayout
      imports={<Imports data={market.imports} trade={tradeGoods} />}
      exports={<Exports data={market.exports} trade={tradeGoods} />}
      exchange={<Exchange data={market.exchange} trade={tradeGoods} />}
    />
  )
}
