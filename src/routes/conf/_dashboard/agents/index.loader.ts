import { type QueryClient } from '@tanstack/react-query'
import { type RouteLoaderFn, defer } from '@tanstack/react-router'
import { type StoreApi } from 'zustand/vanilla'
import { getAgentListQuery } from '@/services/api/spacetraders/agent'
import { type AuthStore } from '@/store/auth'

export const loader: RouteLoaderFn<
  Record<string, never>,
  { page: number },
  { client: QueryClient; auth: StoreApi<AuthStore> },
  { meta: MetaFunction }
> = ({ context, deps }) => {
  const agents = context.client.ensureQueryData(getAgentListQuery({ page: deps.page, limit: 20 }))

  return {
    agents: defer(agents),
  }
}
