import { type QueryClient } from '@tanstack/react-query'
import { type RouteLoaderFn } from '@tanstack/react-router'
import { type StoreApi } from 'zustand/vanilla'
import { getAgentBySymbolQuery } from '@/services/api/spacetraders/agent'
import { type AuthStore } from '@/store/auth'

export const loader: RouteLoaderFn<
  { agentSymbol: string },
  Record<string, never>,
  { client: QueryClient; auth: StoreApi<AuthStore> },
  { meta: MetaFunction }
> = async ({ context, params }) => {
  const agent = context.client.ensureQueryData(getAgentBySymbolQuery({ agentSymbol: params.agentSymbol }))

  return {
    agent: await agent,
  }
}
