import { type ReactNode } from 'react'
import { type MarketGood, type MarketTradeGood } from '@/types/spacetraders'

export type WaypointMarketLayoutProps = {
  imports: ReactNode
  exports: ReactNode
  exchange: ReactNode
}

export type WaypointMarketItemProps = { item: MarketGood; trade?: MarketTradeGood }
