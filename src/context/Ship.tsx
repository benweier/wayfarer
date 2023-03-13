import { createContext, useContext, useEffect, useRef } from 'react'
import { createStore, useStore } from 'zustand'
import { shallow } from 'zustand/shallow'
import { StoreApi } from 'zustand/vanilla'
import { ShipResponse } from '@/types/spacetraders'

const ShipContext = createContext<StoreApi<ShipResponse> | null>(null)

const createShipStore = (ship: ShipResponse) => {
  return createStore<ShipResponse>()(() => ship)
}

export const useShipContext = <T,>(
  selector: (state: ShipResponse) => T,
  equalityFn: (a: T, b: T) => boolean = shallow,
): T => {
  const store = useContext(ShipContext)

  if (!store) throw new Error('ShipContext is missing a store value.')

  return useStore(store, selector, equalityFn)
}

export const ShipStore = ({
  ship,
  children,
}: WithChildren<{
  ship?: ShipResponse
}>) => {
  const store = useRef<StoreApi<ShipResponse> | undefined>()

  if (!store.current && ship) {
    store.current = createShipStore(ship)
  }

  useEffect(() => {
    if (!ship) return

    store.current?.setState(ship)
  }, [ship])

  if (!store.current) return null

  return <ShipContext.Provider value={store.current}>{children}</ShipContext.Provider>
}
