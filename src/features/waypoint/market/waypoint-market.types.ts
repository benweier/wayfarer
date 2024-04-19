import type { MarketGood, MarketTradeGood } from '@/types/spacetraders'
import type { FC, PropsWithChildren, ReactNode } from 'react'

export type WaypointMarketLayoutProps = {
  imports: ReactNode
  exports: ReactNode
  exchange: ReactNode
}

export type WaypointMarketListProps = {
  Item?: FC<PropsWithChildren<WaypointMarketItemProps>>
}

export type WaypointMarketItemProps = { item: MarketGood; trade?: ReactNode }

export type WaypointMarketTableSchema = {
  good: MarketGood
  trade?: MarketTradeGood
}

export type WaypointMarketTableProps = {
  data: WaypointMarketTableSchema[]
}
