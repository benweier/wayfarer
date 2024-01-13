import { type QueryClient } from '@tanstack/react-query'
import { type RouteLoaderFn, defer } from '@tanstack/react-router'
import { type StoreApi } from 'zustand/vanilla'
import { getContractListQuery } from '@/services/api/spacetraders'
import { type AuthStore } from '@/store/auth'

export const loader: RouteLoaderFn<
  Record<string, never>,
  Record<string, never>,
  { client: QueryClient; auth: StoreApi<AuthStore> },
  { meta: MetaFunction }
> = ({ context }) => {
  const contracts = context.client.ensureQueryData(getContractListQuery())

  return {
    contracts: defer(contracts),
  }
}
