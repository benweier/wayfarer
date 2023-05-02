import { createContext, useContext, useRef } from 'react'
import { createStore, useStore } from 'zustand'
import { shallow } from 'zustand/shallow'
import { StoreApi } from 'zustand/vanilla'
import { BoundStoreSelector } from '@/services/store/store.types'
import { MarketTradeGood } from '@/types/spacetraders'

const MarketTradeGoodContext = createContext<StoreApi<MarketTradeGood> | null>(null)

export const useMarketTradeGoodContext: BoundStoreSelector<MarketTradeGood> = (
  selector = (state: MarketTradeGood) => state,
  equals = shallow,
) => {
  const store = useContext(MarketTradeGoodContext)

  if (!store) throw new Error('MarketTradeGoodContext is missing a store value.')

  return useStore(store, selector, equals)
}

export const MarketTradeGoodStore = ({
  good,
  children,
}: WithChildren<{
  good: MarketTradeGood
}>) => {
  const store = useRef<StoreApi<MarketTradeGood> | undefined>()

  if (!store.current && good) {
    store.current = createStore<MarketTradeGood>()(() => good)
  }

  if (!store.current) return null

  return <MarketTradeGoodContext.Provider value={store.current}>{children}</MarketTradeGoodContext.Provider>
}
