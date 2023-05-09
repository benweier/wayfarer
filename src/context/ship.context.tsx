import { createContext, useContext, useEffect, useRef } from 'react'
import { createStore, useStore } from 'zustand'
import { shallow } from 'zustand/shallow'
import { StoreApi } from 'zustand/vanilla'
import { BoundStoreSelector } from '@/store/store.types'
import { ShipResponse } from '@/types/spacetraders'

const ShipContext = createContext<StoreApi<ShipResponse> | null>(null)

export const useShipContext: BoundStoreSelector<ShipResponse> = (
  selector = (state: ShipResponse) => state,
  equals = shallow,
) => {
  const store = useContext(ShipContext)

  if (!store) throw new Error('ShipContext is missing a store value.')

  return useStore(store, selector, equals)
}

export const ShipStore = ({
  ship,
  children,
}: WithChildren<{
  ship: ShipResponse
}>) => {
  const store = useRef<StoreApi<ShipResponse> | undefined>()

  if (!store.current && ship) {
    store.current = createStore<ShipResponse>()(() => ship)
  }

  useEffect(() => {
    store.current?.setState(ship)
  }, [ship])

  if (!store.current) return null

  return <ShipContext.Provider value={store.current}>{children}</ShipContext.Provider>
}
