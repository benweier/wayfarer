import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useWaypointResponse } from '@/context/waypoint.context'
import { getWaypointMarketQuery } from '@/services/api/spacetraders'
import { type MarketTradeGood } from '@/types/spacetraders'
import { WaypointMarketItem } from './waypoint-market-item.component'
import { makeSortByTradeAttributeFn } from './waypoint-market-preferences.utilities'
import { WaypointMarketLayout } from './waypoint-market.layout'
import { WaypointMarketNotAvailable } from './waypoint-market.not-available'

export const WaypointMarketList = () => {
  const waypoint = useWaypointResponse()
  const [searchParams] = useSearchParams()

  const marketEnabled = waypoint.traits.findIndex((trait) => trait.symbol === 'MARKETPLACE') !== -1

  const marketQuery = useQuery({
    queryKey: getWaypointMarketQuery.getQueryKey({
      systemSymbol: waypoint.systemSymbol,
      waypointSymbol: waypoint.symbol,
    }),
    queryFn: getWaypointMarketQuery.queryFn,
    enabled: marketEnabled,
  })

  if (!marketEnabled) {
    return <WaypointMarketNotAvailable />
  }

  if (!marketQuery.isSuccess) return null

  const market = marketQuery.data.data
  const tradeGoods = market.tradeGoods?.reduce<Map<string, MarketTradeGood>>((result, item) => {
    result.set(item.symbol, item)
    return result
  }, new Map())
  const sorter = makeSortByTradeAttributeFn(searchParams.get('sort'), tradeGoods)

  return (
    <WaypointMarketLayout
      imports={
        <>
          {market.imports.length === 0 && (
            <div className="rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
              <div className="text-secondary text-center text-sm">
                <span className="font-bold">{waypoint.symbol}</span> does not list any imports
              </div>
            </div>
          )}
          {market.imports.sort(sorter).map((item) => {
            const good = tradeGoods?.get(item.symbol)

            return <WaypointMarketItem key={item.symbol} item={item} trade={good} />
          })}
        </>
      }
      exports={
        <>
          {market.exports.length === 0 && (
            <div className="rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
              <div className="text-secondary text-center text-sm">
                <span className="font-bold">{waypoint.symbol}</span> does not list any exports
              </div>
            </div>
          )}
          {market.exports.sort(sorter).map((item) => {
            const good = tradeGoods?.get(item.symbol)

            return <WaypointMarketItem key={item.symbol} item={item} trade={good} />
          })}
        </>
      }
      exchange={
        <>
          {market.exchange.length === 0 && (
            <div className="rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
              <div className="text-secondary text-center text-sm">
                <span className="font-bold">{waypoint.symbol}</span> does not list any exchanges
              </div>
            </div>
          )}
          {market.exchange.sort(sorter).map((item) => {
            const good = tradeGoods?.get(item.symbol)

            return <WaypointMarketItem key={item.symbol} item={item} trade={good} />
          })}
        </>
      }
    />
  )
}
