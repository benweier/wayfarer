import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { type MarketTradeGood, type ShipResponse } from '@/types/spacetraders'
import { type PurchaseCargoSchema } from './purchase.validation'

export type PurchaseCargoProps = {
  good: MarketTradeGood
  action?: (props: ButtonHTMLAttributes<HTMLButtonElement>) => ReactNode
}

export type PurchaseCargoFormProps = {
  ship?: ShipResponse
  good: MarketTradeGood
  onSubmit: (values: PurchaseCargoSchema) => void
}
