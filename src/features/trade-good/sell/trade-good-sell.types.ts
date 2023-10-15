import { type MarketTradeGood, type ShipResponse } from '@/types/spacetraders'
import { type TradeGoodSellSchema } from './trade-good-sell.validation'

export type TradeGoodSellProps = {
  ship?: ShipResponse
  good: MarketTradeGood
}

export type TradeGoodSellFormProps = {
  ship?: ShipResponse
  good: MarketTradeGood
  onSubmit: (values: TradeGoodSellSchema) => void
}
