import type { TradeGoodBuySchema } from './trade-good-buy.schema'
import type { MarketTradeGood, ShipResponse } from '@/types/spacetraders'
import type { ReactNode } from 'react'

export type TradeGoodBuyProps = {
  good?: MarketTradeGood
  disabled?: boolean
  trigger?: ReactNode
}

export type TradeGoodBuyFormProps = {
  ship?: ShipResponse
  good: MarketTradeGood
  onSubmit: (values: TradeGoodBuySchema) => void
}
