import { type MarketTradeGood, type ShipResponse } from '@/types/spacetraders'
import { type TradeGoodBuySchema } from './trade-good-buy.validation'

export type TradeGoodBuyProps = {
  ship?: ShipResponse
  good: MarketTradeGood
}

export type TradeGoodBuyFormProps = {
  ship?: ShipResponse
  good: MarketTradeGood
  onSubmit: (values: TradeGoodBuySchema) => void
}
