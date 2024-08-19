import type { MarketGood, MarketTradeGood } from '@/types/spacetraders'
import type { FC, ReactNode } from 'react'

export type WaypointMarketListProps = {
  imports?: FC<WaypointMarketGroupProps>
  exports?: FC<WaypointMarketGroupProps>
  exchange?: FC<WaypointMarketGroupProps>
}

export type WaypointMarketLayoutProps = {
  imports: ReactNode
  exports: ReactNode
  exchange: ReactNode
}

export type WaypointMarketTableSchema = {
  good: MarketGood
  trade?: MarketTradeGood
}

export type WaypointMarketTableProps = {
  data: WaypointMarketTableSchema[]
}

export type WaypointMarketGroupProps = {
  data: MarketGood[]
  trade: Map<string, MarketTradeGood>
}
