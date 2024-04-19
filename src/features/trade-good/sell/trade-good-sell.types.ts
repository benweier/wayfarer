import type { MarketTradeGood, ShipResponse } from '@/types/spacetraders'
import type { ReactNode } from 'react'
import type { TradeGoodSellSchema } from './trade-good-sell.schema'

export type TradeGoodSellProps = {
  good?: MarketTradeGood
  disabled?: boolean
  trigger?: ReactNode
}

export type TradeGoodSellFormProps = {
  ship?: ShipResponse
  good: MarketTradeGood
  onSubmit: (values: TradeGoodSellSchema) => void
}
