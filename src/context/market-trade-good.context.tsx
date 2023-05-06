import { createContext, useContext } from 'react'
import { MarketTradeGood } from '@/types/spacetraders'

export const MarketTradeGoodContext = createContext<MarketTradeGood | null>(null)

export const useMarketTradeGoodContext = () => {
  const good = useContext(MarketTradeGoodContext)

  if (!good) throw new Error('MarketTradeGoodContext is missing a value.')

  return good
}
