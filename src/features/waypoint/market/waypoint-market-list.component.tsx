import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useSystemContext } from '@/context/system.context'
import { useWaypointContext } from '@/context/waypoint.context'
import { getMarket, getWaypointById } from '@/services/api/spacetraders'
import { MarketTradeGood } from '@/types/spacetraders'
import { WaypointMarketItem } from './waypoint-market-item.component'
import { makeSortByTradeAttributeFn } from './waypoint-market-preferences.utilities'
import { WaypointMarketLayout } from './waypoint-market.layout'
import { WaypointMarketNotAvailable } from './waypoint-market.not-available'

export const WaypointMarketList = () => {
  const { systemSymbol } = useSystemContext()
  const { waypointSymbol } = useWaypointContext()
  const [searchParams] = useSearchParams()
  const waypointQuery = useQuery({
    queryKey: ['system', systemSymbol, 'waypoint', waypointSymbol],
    queryFn: ({ signal }) => getWaypointById({ path: { systemSymbol, waypointSymbol } }, { signal }),
  })

  const marketEnabled =
    waypointQuery.isSuccess &&
    waypointQuery.data.data.traits.findIndex((trait) => trait.symbol === 'MARKETPLACE') !== -1

  const marketQuery = useQuery({
    queryKey: ['system', systemSymbol, waypointSymbol, 'market'],
    queryFn: ({ signal }) => getMarket({ path: { systemSymbol, waypointSymbol } }, { signal }),
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
                <span className="font-bold">{waypointSymbol}</span> does not list any imports
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
                <span className="font-bold">{waypointSymbol}</span> does not list any exports
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
                <span className="font-bold">{waypointSymbol}</span> does not list any exchanges
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
