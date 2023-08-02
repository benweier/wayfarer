import { useSuspenseQuery } from '@tanstack/react-query'
import { type PropsWithChildren, createContext, useContext } from 'react'
import { getWaypointByIdQuery } from '@/services/api/spacetraders'
import { type WaypointResponse } from '@/types/spacetraders'

export type WaypointStoreProps = {
  systemSymbol: string
  waypointSymbol: string
}

export const WaypointContext = createContext<{ waypointSymbol: string } | null>(null)

export const useWaypointContext = () => {
  const ctx = useContext(WaypointContext)

  if (!ctx) throw new Error('WaypointContext is missing a value.')

  return ctx
}

const WaypointStoreContext = createContext<WaypointResponse | null>(null)

export const useWaypointResponse = () => {
  const waypoint = useContext(WaypointStoreContext)

  if (!waypoint) throw new Error('WaypointStoreContext is missing a waypoint value.')

  return waypoint
}

export const WaypointStore = ({ systemSymbol, waypointSymbol, children }: PropsWithChildren<WaypointStoreProps>) => {
  const { data } = useSuspenseQuery({
    queryKey: getWaypointByIdQuery.getQueryKey({ systemSymbol, waypointSymbol }),
    queryFn: getWaypointByIdQuery.queryFn,
  })

  return <WaypointStoreContext.Provider value={data.data}>{children}</WaypointStoreContext.Provider>
}
