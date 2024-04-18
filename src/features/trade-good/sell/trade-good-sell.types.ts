import { type ReactNode } from 'react'
import { type MarketTradeGood, type ShipResponse } from '@/types/spacetraders'
import { type TradeGoodSellSchema } from './trade-good-sell.schema'

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
