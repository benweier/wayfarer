import { ButtonHTMLAttributes, ReactNode } from 'react'
import { MarketTradeGood } from '@/types/spacetraders'
import { PurchaseCargoSchema } from './purchase.validation'

export type PurchaseCargoProps = {
  good: MarketTradeGood
  action?: (props: ButtonHTMLAttributes<HTMLButtonElement>) => ReactNode
}

export type PurchaseCargoFormProps = {
  good: MarketTradeGood
  onSubmit: (values: PurchaseCargoSchema) => void
}
