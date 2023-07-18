import { ButtonHTMLAttributes, ReactNode } from 'react'
import { MarketTradeGood, ShipResponse } from '@/types/spacetraders'
import { SellCargoSchema } from './sell.validation'

export type SellCargoProps = {
  good: MarketTradeGood
  action?: (props: ButtonHTMLAttributes<HTMLButtonElement>) => ReactNode
}

export type SellCargoFormProps = {
  ship?: ShipResponse
  good: MarketTradeGood
  onSubmit: (values: SellCargoSchema) => void
}
