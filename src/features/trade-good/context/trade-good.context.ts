import { type FC, createContext } from 'react'
import { type TradeGoodBuyProps } from '@/features/trade-good/buy'
import { type TradeGoodSellProps } from '@/features/trade-good/sell'
import { type MarketTradeGood } from '@/types/spacetraders'

export const TradeGoodContext = createContext<{
  Buy?: FC<TradeGoodBuyProps>
  Sell?: FC<TradeGoodSellProps>
  canBuy?(good?: MarketTradeGood): boolean
  canSell?(good?: MarketTradeGood): boolean
}>({})
