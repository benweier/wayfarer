import { type QueryClient } from '@tanstack/react-query'
import { type RouteLoaderFn } from '@tanstack/react-router'
import { type StoreApi } from 'zustand/vanilla'
import { getShipByIdQuery } from '@/services/api/spacetraders'
import { type AuthStore } from '@/store/auth'

export const loader: RouteLoaderFn<
  { shipSymbol: string },
  Record<string, never>,
  { client: QueryClient; auth: StoreApi<AuthStore> },
  { meta: MetaFunction }
> = async ({ context, params }) => {
  const ship = context.client.ensureQueryData(getShipByIdQuery({ shipSymbol: params.shipSymbol }))

  return {
    ship: await ship,
  }
}
