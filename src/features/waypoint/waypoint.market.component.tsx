import { useQuery } from '@tanstack/react-query'
import { ErrorComponentProps } from '@/components/error-boundary'
import { PurchaseCargo, SellCargo } from '@/components/market'
import { MarketTradeGoodStore } from '@/context/MarketTradeGood'
import { SystemWaypointStore } from '@/context/SystemWaypoint'
import { getMarket } from '@/services/api/spacetraders'
import { isHttpError } from '@/services/http'
import { MarketGood, MarketTradeGood } from '@/types/spacetraders'

const MarketGoodItem = ({ item, available, children }: WithChildren<{ item: MarketGood; available?: number }>) => {
  return (
    <div key={item.symbol} className="grid gap-4 rounded bg-zinc-500 bg-opacity-5 px-4 py-3 dark:bg-opacity-10">
      <div className="grid gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium">{item.name}</span>
          {available !== undefined && (
            <span className="text-lg font-bold">{new Intl.NumberFormat('en-US').format(available)}</span>
          )}
        </div>
        <div className="text-secondary text-sm">{item.description}</div>
      </div>

      {children}
    </div>
  )
}

export const WaypointMarket = ({ systemID, waypointID }: { systemID: string; waypointID: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['system', systemID, waypointID, 'market'],
    queryFn: ({ signal }) => getMarket({ path: { system: systemID, waypoint: waypointID } }, { signal }),
  })

  if (!isSuccess) return null

  const market = data.data
  const tradeGoods = market.tradeGoods?.reduce<Map<string, MarketTradeGood>>((result, item) => {
    result.set(item.symbol, item)
    return result
  }, new Map())

  return (
    <SystemWaypointStore systemID={systemID} waypointID={waypointID}>
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
                <MarketGoodItem key={item.symbol} item={item} available={good?.tradeVolume}>
                  {!!good && (
                    <MarketTradeGoodStore good={good}>
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
                    </MarketTradeGoodStore>
                  )}
                </MarketGoodItem>
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
                <MarketGoodItem key={item.symbol} item={item} available={good?.tradeVolume}>
                  {!!good && (
                    <MarketTradeGoodStore good={good}>
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
                    </MarketTradeGoodStore>
                  )}
                </MarketGoodItem>
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
                <MarketGoodItem key={item.symbol} item={item} available={good?.tradeVolume}>
                  {!!good && (
                    <MarketTradeGoodStore good={good}>
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
                    </MarketTradeGoodStore>
                  )}
                </MarketGoodItem>
              )
            })}
          </div>
        </div>
      </div>
    </SystemWaypointStore>
  )
}

export const MarketError = ({ error }: ErrorComponentProps) => {
  if (!error) return <></>

  if (isHttpError(error)) {
    return (
      <div className="rounded border-2 border-transparent px-3 py-9">
        <div className="text-secondary text-center text-xl font-bold">{error.statusText}</div>
      </div>
    )
  }

  return <></>
}
