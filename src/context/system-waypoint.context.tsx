import { createContext, useContext } from 'react'

export const SystemWaypointContext = createContext<{ systemID: string; waypointID: string } | null>(null)

export const useSystemWaypointContext = () => {
  const ctx = useContext(SystemWaypointContext)

  if (!ctx) throw new Error('SystemWaypointContext is missing a value.')

  return ctx
}
