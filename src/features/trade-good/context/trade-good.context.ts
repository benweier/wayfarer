import type { TradeGoodBuyProps } from '@/features/trade-good/buy'
import type { TradeGoodSellProps } from '@/features/trade-good/sell'
import type { MarketTradeGood } from '@/types/spacetraders'
import { type FC, createContext } from 'react'

export const TradeGoodContext = createContext<{
  Buy?: FC<TradeGoodBuyProps>
  Sell?: FC<TradeGoodSellProps>
  canBuy?(good?: MarketTradeGood): boolean
  canSell?(good?: MarketTradeGood): boolean
}>({})
