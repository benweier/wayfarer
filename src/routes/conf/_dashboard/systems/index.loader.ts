import { type QueryClient } from '@tanstack/react-query'
import { type RouteLoaderFn, defer } from '@tanstack/react-router'
import { type StoreApi } from 'zustand/vanilla'
import { getSystemListQuery } from '@/services/api/spacetraders'
import { type AuthStore } from '@/store/auth'

export const loader: RouteLoaderFn<
  Record<string, never>,
  { page: number },
  { client: QueryClient; auth: StoreApi<AuthStore> },
  { meta: MetaFunction }
> = ({ context, deps }) => {
  const systems = context.client.ensureQueryData(getSystemListQuery({ page: deps.page, limit: 20 }))

  return {
    systems: defer(systems),
  }
}
