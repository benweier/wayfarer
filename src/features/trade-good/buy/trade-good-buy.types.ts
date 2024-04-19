import type { MarketTradeGood, ShipResponse } from '@/types/spacetraders'
import type { ReactNode } from 'react'
import type { TradeGoodBuySchema } from './trade-good-buy.schema'

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
