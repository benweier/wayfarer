import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { type MarketTradeGood, type ShipResponse } from '@/types/spacetraders'
import { type SellCargoSchema } from './sell.validation'

export type SellCargoProps = {
  good: MarketTradeGood
  action?: (props: ButtonHTMLAttributes<HTMLButtonElement>) => ReactNode
}

export type SellCargoFormProps = {
  ship?: ShipResponse
  good: MarketTradeGood
  onSubmit: (values: SellCargoSchema) => void
}
