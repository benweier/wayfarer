import { useAtom } from 'jotai'
import { Badge } from '@/components/badge'
import { PurchaseCargo } from '@/components/market/purchase-cargo'
import { SellCargo } from '@/components/market/sell-cargo'
import { MARKET_TRADE_GOOD_SUPPLY } from '@/config/constants'
import { marketDescriptionAtom } from '@/store/atoms/market.display'
import { formatNumber } from '@/utilities/number'
import { type WaypointMarketItemProps } from './waypoint-market.types'

export const WaypointMarketItem = ({ item, trade }: WaypointMarketItemProps) => {
  const [showDescription] = useAtom(marketDescriptionAtom)

  return (
    <div className="relative @container/market-item">
      <div className="flex flex-col flex-wrap justify-between gap-4 rounded bg-zinc-500 bg-opacity-5 p-4 @lg/market-item:flex-row dark:bg-opacity-10">
        <div className="min-w-[280px] flex-1 space-y-2">
          <div className="flex flex-row justify-between gap-8">
            <div className="text-lg font-medium">{item.name}</div>
            {trade !== undefined && (
              <div className="flex flex-col items-end justify-end">
                <span className="font-bold">{formatNumber(trade.tradeVolume)}</span>
                <Badge>{MARKET_TRADE_GOOD_SUPPLY.get(trade.supply)}</Badge>
              </div>
            )}
          </div>
          {showDescription && <div className="text-secondary text-sm">{item.description}</div>}
        </div>

        {!!trade && (
          <div className="min-w-[280px]">
            <div className="grid grid-cols-2 gap-2">
              <PurchaseCargo
                good={trade}
                action={(props) => (
                  <button className="btn btn-outline btn-danger" {...props}>
                    <span className="flex flex-col">
                      <span className="text-xs uppercase">Buy</span>
                      <span className="text-base font-bold">{formatNumber(trade.purchasePrice)}</span>
                    </span>
                  </button>
                )}
              />
              <SellCargo
                good={trade}
                action={(props) => (
                  <button className="btn btn-outline btn-confirm" {...props}>
                    <span className="flex flex-col">
                      <span className="text-xs uppercase">Sell</span>
                      <span className="text-base font-bold">{formatNumber(trade.sellPrice)}</span>
                    </span>
                  </button>
                )}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
