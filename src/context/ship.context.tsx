import { useSuspenseQuery } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useRef } from 'react'
import { createStore, useStore } from 'zustand'
import { shallow } from 'zustand/shallow'
import { type StoreApi } from 'zustand/vanilla'
import { getShipByIdQuery } from '@/services/api/spacetraders'
import { type BoundStoreSelector } from '@/store/store.types'
import { type ShipResponse } from '@/types/spacetraders'

const ShipStoreContext = createContext<StoreApi<ShipResponse> | null>(null)

export const useShipStore: BoundStoreSelector<ShipResponse> = (
  selector = (state: ShipResponse) => state,
  equals = shallow,
) => {
  const store = useContext(ShipStoreContext)

  if (!store) throw new Error('ShipStoreContext is missing a store value.')

  return useStore(store, selector, equals)
}

export const ShipStore = ({
  shipSymbol,
  children,
}: WithChildren<{
  shipSymbol: string
}>) => {
  const { data } = useSuspenseQuery({
    queryKey: getShipByIdQuery.getQueryKey({ shipSymbol }),
    queryFn: getShipByIdQuery.queryFn,
  })
  const store = useRef<StoreApi<ShipResponse> | null>(null)

  if (!store.current) {
    store.current = createStore<ShipResponse>()(() => data.data)
  }

  useEffect(() => {
    store.current?.setState(data.data)
  }, [data.data])

  return <ShipStoreContext.Provider value={store.current}>{children}</ShipStoreContext.Provider>
}
