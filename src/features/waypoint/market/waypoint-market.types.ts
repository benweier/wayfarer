import { type FC, type PropsWithChildren, type ReactNode } from 'react'
import { type MarketGood, type MarketTradeGood } from '@/types/spacetraders'

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
