import { useQuery } from '@tanstack/react-query'
import { PurchaseCargo, SellCargo } from '@/components/market'
import { MarketTradeGoodContext } from '@/context/market-trade-good.context'
import { useSystemWaypointContext } from '@/context/system-waypoint.context'
import { getMarket, getWaypointById } from '@/services/api/spacetraders'
import { MarketTradeGood } from '@/types/spacetraders'
import { Item } from './market-item.component'
import { NotAvailable } from './market-not-available.component'

export const List = () => {
  const { systemID, waypointID } = useSystemWaypointContext()

  const waypointQuery = useQuery({
    queryKey: ['system', systemID, 'waypoint', waypointID],
    queryFn: ({ signal }) => getWaypointById({ path: { system: systemID, waypoint: waypointID } }, { signal }),
  })

  const marketEnabled =
    waypointQuery.isSuccess &&
    waypointQuery.data.data.traits.findIndex((trait) => trait.symbol === 'MARKETPLACE') !== -1

  const marketQuery = useQuery({
    queryKey: ['system', systemID, waypointID, 'market'],
    queryFn: ({ signal }) => getMarket({ path: { system: systemID, waypoint: waypointID } }, { signal }),
    enabled: marketEnabled,
  })

  if (!marketEnabled) {
    return <NotAvailable />
  }

  if (!marketQuery.isSuccess) return null

  const market = marketQuery.data.data
  const tradeGoods = market.tradeGoods?.reduce<Map<string, MarketTradeGood>>((result, item) => {
    result.set(item.symbol, item)
    return result
  }, new Map())

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="flex flex-col gap-4">
        <div className="text-headline text-center">Imports</div>
        <div className="flex flex-col gap-2">
          {market.imports.length === 0 && (
            <div className="rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
              <div className="text-secondary text-center text-sm">
                <span className="font-bold">{waypointID}</span> does not list any imports
              </div>
            </div>
          )}
          {market.imports.map((item) => {
            const good = tradeGoods?.get(item.symbol)

            return (
              <Item key={item.symbol} item={item} available={good?.tradeVolume}>
                {!!good && (
                  <MarketTradeGoodContext.Provider value={good}>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-center text-2xl font-semibold">
                        {new Intl.NumberFormat('en-US').format(good.purchasePrice)}
                      </div>

                      <div className="text-center text-2xl font-semibold">
                        {new Intl.NumberFormat('en-US').format(good.sellPrice)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div />
                      <SellCargo />
                    </div>
                  </MarketTradeGoodContext.Provider>
                )}
              </Item>
            )
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-headline text-center">Exports</div>
        <div className="flex flex-col gap-2">
          {market.exports.length === 0 && (
            <div className="rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
              <div className="text-secondary text-center text-sm">
                <span className="font-bold">{waypointID}</span> does not list any exports
              </div>
            </div>
          )}
          {market.exports.map((item) => {
            const good = tradeGoods?.get(item.symbol)

            return (
              <Item key={item.symbol} item={item} available={good?.tradeVolume}>
                {!!good && (
                  <MarketTradeGoodContext.Provider value={good}>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-center text-2xl font-semibold">
                        {new Intl.NumberFormat('en-US').format(good.purchasePrice)}
                      </div>

                      <div className="text-center text-2xl font-semibold">
                        {new Intl.NumberFormat('en-US').format(good.sellPrice)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <PurchaseCargo />
                      <div />
                    </div>
                  </MarketTradeGoodContext.Provider>
                )}
              </Item>
            )
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-headline text-center">Exchange</div>
        <div className="flex flex-col gap-2">
          {market.exchange.length === 0 && (
            <div className="rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
              <div className="text-secondary text-center text-sm">
                <span className="font-bold">{waypointID}</span> does not list any exchanges
              </div>
            </div>
          )}
          {market.exchange.map((item) => {
            const good = tradeGoods?.get(item.symbol)

            return (
              <Item key={item.symbol} item={item} available={good?.tradeVolume}>
                {!!good && (
                  <MarketTradeGoodContext.Provider value={good}>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-center text-2xl font-semibold">
                        {new Intl.NumberFormat('en-US').format(good.purchasePrice)}
                      </div>

                      <div className="text-center text-2xl font-semibold">
                        {new Intl.NumberFormat('en-US').format(good.sellPrice)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <PurchaseCargo />
                      <SellCargo />
                    </div>
                  </MarketTradeGoodContext.Provider>
                )}
              </Item>
            )
          })}
        </div>
      </div>
    </div>
  )
}
