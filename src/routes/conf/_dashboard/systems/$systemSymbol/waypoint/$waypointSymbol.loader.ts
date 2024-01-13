import { type QueryClient } from '@tanstack/react-query'
import { type RouteLoaderFn } from '@tanstack/react-router'
import { type StoreApi } from 'zustand/vanilla'
import { getWaypointByIdQuery } from '@/services/api/spacetraders'
import { type AuthStore } from '@/store/auth'

export const loader: RouteLoaderFn<
  { systemSymbol: string; waypointSymbol: string },
  Record<string, never>,
  { client: QueryClient; auth: StoreApi<AuthStore> },
  { meta: MetaFunction }
> = async ({ context, params }) => {
  const waypoint = context.client.ensureQueryData(
    getWaypointByIdQuery({ systemSymbol: params.systemSymbol, waypointSymbol: params.waypointSymbol }),
  )

  return {
    waypoint: await waypoint,
  }
}
