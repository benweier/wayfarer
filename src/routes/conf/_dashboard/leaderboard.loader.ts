import { type QueryClient } from '@tanstack/react-query'
import { type RouteLoaderFn, defer } from '@tanstack/react-router'
import { type StoreApi } from 'zustand/vanilla'
import { getStatusQuery } from '@/services/api/spacetraders/status'
import { type AuthStore } from '@/store/auth'

export const loader: RouteLoaderFn<
  Record<string, never>,
  Record<string, never>,
  { client: QueryClient; auth: StoreApi<AuthStore> },
  { meta: MetaFunction }
> = ({ context }) => {
  const status = context.client.ensureQueryData(getStatusQuery())

  return {
    status: defer(status),
  }
}
