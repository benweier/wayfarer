import { createContext, useContext, useRef } from 'react'
import { createStore, useStore } from 'zustand'
import { shallow } from 'zustand/shallow'
import { StoreApi } from 'zustand/vanilla'

const SystemWaypointContext = createContext<StoreApi<{ systemID: string; waypointID: string }> | null>(null)

const createSystemWaypointStore = (systemID: string, waypointID: string) => {
  return createStore<{ systemID: string; waypointID: string }>()(() => ({ systemID, waypointID }))
}

export const useSystemWaypointContext = <T,>(
  selector: (state: { systemID: string; waypointID: string }) => T,
  equalityFn: (a: T, b: T) => boolean = shallow,
): T => {
  const store = useContext(SystemWaypointContext)

  if (!store) throw new Error('SystemWaypointContext is missing a store value.')

  return useStore(store, selector, equalityFn)
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
    store.current = createSystemWaypointStore(systemID, waypointID)
  }

  if (!store.current) return null

  return <SystemWaypointContext.Provider value={store.current}>{children}</SystemWaypointContext.Provider>
}
