import { type QueryClient } from '@tanstack/react-query'
import { type RouteLoaderFn, defer } from '@tanstack/react-router'
import { type StoreApi } from 'zustand/vanilla'
import { getShipListQuery } from '@/services/api/spacetraders'
import { type AuthStore } from '@/store/auth'

export const loader: RouteLoaderFn<
  Record<string, never>,
  Record<string, never>,
  { client: QueryClient; auth: StoreApi<AuthStore> },
  { meta: MetaFunction }
> = ({ context }) => {
  const ships = context.client.ensureQueryData(getShipListQuery())

  return {
    ships: defer(ships),
  }
}
