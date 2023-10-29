import { type FC, createContext } from 'react'
import { type TradeGoodBuyProps } from '@/features/trade-good/buy'
import { type TradeGoodSellProps } from '@/features/trade-good/sell'

export const TradeGoodContext = createContext<{ Buy?: FC<TradeGoodBuyProps>; Sell?: FC<TradeGoodSellProps> }>({})
