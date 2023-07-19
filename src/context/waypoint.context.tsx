import { createContext, useContext } from 'react'

export const WaypointContext = createContext<{ waypointSymbol: string } | null>(null)

export const useWaypointContext = () => {
  const ctx = useContext(WaypointContext)

  if (!ctx) throw new Error('WaypointContext is missing a value.')

  return ctx
}
