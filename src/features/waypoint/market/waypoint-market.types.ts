import { type FC, type ReactNode } from 'react'
import { type MarketGood, type MarketTradeGood } from '@/types/spacetraders'

export type WaypointMarketLayoutProps = {
  imports: ReactNode
  exports: ReactNode
  exchange: ReactNode
}

export type WaypointMarketListProps = {
  Item?: FC<WaypointMarketItemProps>
}

export type WaypointMarketItemProps = { item: MarketGood; trade?: MarketTradeGood }
