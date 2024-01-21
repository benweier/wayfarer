import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { type MarketTradeGood, type ShipResponse } from '@/types/spacetraders'
import { type TradeGoodBuySchema } from './trade-good-buy.schema'

export type TradeGoodBuyProps = {
  good?: MarketTradeGood
  action?: (props: ButtonHTMLAttributes<HTMLButtonElement>) => ReactNode
}

export type TradeGoodBuyFormProps = {
  ship?: ShipResponse
  good: MarketTradeGood
  onSubmit: (values: TradeGoodBuySchema) => void
}
