import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { type MarketTradeGood, type ShipResponse } from '@/types/spacetraders'
import { type TradeGoodSellSchema } from './trade-good-sell.schema'

export type TradeGoodSellProps = {
  good?: MarketTradeGood
  disabled?: boolean
  action?: (props: ButtonHTMLAttributes<HTMLButtonElement>) => ReactNode
}

export type TradeGoodSellFormProps = {
  ship?: ShipResponse
  good: MarketTradeGood
  onSubmit: (values: TradeGoodSellSchema) => void
}
