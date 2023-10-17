import { useAtom } from 'jotai'
import { type PropsWithChildren } from 'react'
import { Card } from '@/components/card'
import { marketDescriptionAtom } from '@/store/atoms/market.display'
import { type WaypointMarketItemProps } from './waypoint-market.types'

export const WaypointMarketItem = ({ item, trade, children }: PropsWithChildren<WaypointMarketItemProps>) => {
  const [showDescription] = useAtom(marketDescriptionAtom)

  return (
    <Card className="relative @container/market-item">
      <div className="flex flex-col flex-wrap justify-between gap-4 @lg/market-item:flex-row">
        <div className="min-w-[280px] flex-1 space-y-2">
          <div className="flex flex-row justify-between gap-8">
            <div className="text-lg font-medium">{item.name}</div>
            {trade}
          </div>
          {showDescription && <div className="text-secondary text-sm">{item.description}</div>}
        </div>

        {children}
      </div>
    </Card>
  )
}
