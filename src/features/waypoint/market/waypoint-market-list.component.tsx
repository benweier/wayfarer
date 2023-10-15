import { useSuspenseQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Badge } from '@/components/badge'
import { MARKET_TRADE_GOOD_SUPPLY } from '@/config/constants'
import { ShipContext } from '@/context/ship.context'
import { useWaypointResponse } from '@/context/waypoint.context'
import { TradeGoodBuy } from '@/features/trade-good/buy'
import { TradeGoodSell } from '@/features/trade-good/sell'
import { getWaypointMarketQuery } from '@/services/api/spacetraders'
import { type MarketTradeGood } from '@/types/spacetraders'
import { formatNumber } from '@/utilities/number'
import { WaypointMarketItem } from './waypoint-market-item.component'
import { makeSortByTradeAttributeFn } from './waypoint-market-preferences.utilities'
import { WaypointMarketLayout } from './waypoint-market.layout'
import { type WaypointMarketListProps } from './waypoint-market.types'

export const WaypointMarketList = ({ Item = WaypointMarketItem }: WaypointMarketListProps) => {
  const ship = useContext(ShipContext)
  const waypoint = useWaypointResponse()
  const [searchParams] = useSearchParams()
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

            return (
              <Item
                key={item.symbol}
                item={item}
                trade={
                  good !== undefined && (
                    <div className="flex flex-col items-end justify-end">
                      <span className="font-bold">{formatNumber(good.tradeVolume)}</span>
                      <Badge>{MARKET_TRADE_GOOD_SUPPLY.get(good.supply)}</Badge>
                    </div>
                  )
                }
              >
                {!!good && (
                  <div className="min-w-[280px]">
                    <div className="grid grid-cols-2 gap-2">
                      <TradeGoodBuy ship={ship} good={good} />
                      <TradeGoodSell ship={ship} good={good} />
                    </div>
                  </div>
                )}
              </Item>
            )
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

            return (
              <Item
                key={item.symbol}
                item={item}
                trade={
                  good !== undefined && (
                    <div className="flex flex-col items-end justify-end">
                      <span className="font-bold">{formatNumber(good.tradeVolume)}</span>
                      <Badge>{MARKET_TRADE_GOOD_SUPPLY.get(good.supply)}</Badge>
                    </div>
                  )
                }
              >
                {!!good && (
                  <div className="min-w-[280px]">
                    <div className="grid grid-cols-2 gap-2">
                      <TradeGoodBuy ship={ship} good={good} />
                      <TradeGoodSell ship={ship} good={good} />
                    </div>
                  </div>
                )}
              </Item>
            )
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

            return (
              <Item
                key={item.symbol}
                item={item}
                trade={
                  good !== undefined && (
                    <div className="flex flex-col items-end justify-end">
                      <span className="font-bold">{formatNumber(good.tradeVolume)}</span>
                      <Badge>{MARKET_TRADE_GOOD_SUPPLY.get(good.supply)}</Badge>
                    </div>
                  )
                }
              >
                {!!good && (
                  <div className="min-w-[280px]">
                    <div className="grid grid-cols-2 gap-2">
                      <TradeGoodBuy ship={ship} good={good} />
                      <TradeGoodSell ship={ship} good={good} />
                    </div>
                  </div>
                )}
              </Item>
            )
          })}
        </>
      }
    />
  )
}
