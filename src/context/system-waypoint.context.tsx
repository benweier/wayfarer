import { createContext, useContext, useRef } from 'react'
import { createStore, useStore } from 'zustand'
import { shallow } from 'zustand/shallow'
import { StoreApi } from 'zustand/vanilla'
import { BoundStoreSelector } from '@/services/store/store.types'

const SystemWaypointContext = createContext<StoreApi<{ systemID: string; waypointID: string }> | null>(null)

export const useSystemWaypointContext: BoundStoreSelector<{ systemID: string; waypointID: string }> = (
  selector = (state: { systemID: string; waypointID: string }) => state,
  equals = shallow,
) => {
  const store = useContext(SystemWaypointContext)

  if (!store) throw new Error('SystemWaypointContext is missing a store value.')

  return useStore(store, selector, equals)
}

export const SystemWaypointStore = ({
  systemID,
  waypointID,
  children,
}: WithChildren<{
  systemID: string
  waypointID: string
}>) => {
  const store = useRef<StoreApi<{ systemID: string; waypointID: string }> | undefined>()

  if (!store.current && systemID && waypointID) {
    store.current = createStore<{ systemID: string; waypointID: string }>()(() => ({ systemID, waypointID }))
  }

  if (!store.current) return null

  return <SystemWaypointContext.Provider value={store.current}>{children}</SystemWaypointContext.Provider>
}
