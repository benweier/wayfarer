import { createContext, useContext, useRef } from 'react'
import { createStore, useStore } from 'zustand'
import { shallow } from 'zustand/shallow'
import { StoreApi } from 'zustand/vanilla'
import { MarketTradeGood } from '@/types/spacetraders'

const MarketTradeGoodContext = createContext<StoreApi<MarketTradeGood> | null>(null)

const createMarketTradeGoodStore = (good: MarketTradeGood) => {
  return createStore<MarketTradeGood>()(() => good)
}

export const useMarketTradeGoodContext = <T,>(
  selector: (state: MarketTradeGood) => T,
  equalityFn: (a: T, b: T) => boolean = shallow,
): T => {
  const store = useContext(MarketTradeGoodContext)

  if (!store) throw new Error('MarketTradeGoodContext is missing a store value.')

  return useStore(store, selector, equalityFn)
}

export const MarketTradeGoodStore = ({
  good,
  children,
}: WithChildren<{
  good: MarketTradeGood
}>) => {
  const store = useRef<StoreApi<MarketTradeGood> | undefined>()

  if (!store.current && good) {
    store.current = createMarketTradeGoodStore(good)
  }

  if (!store.current) return null

  return <MarketTradeGoodContext.Provider value={store.current}>{children}</MarketTradeGoodContext.Provider>
}
