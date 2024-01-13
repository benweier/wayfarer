import { type QueryClient } from '@tanstack/react-query'
import { type RouteLoaderFn } from '@tanstack/react-router'
import { type StoreApi } from 'zustand/vanilla'
import { getSystemByIdQuery } from '@/services/api/spacetraders'
import { type AuthStore } from '@/store/auth'

export const loader: RouteLoaderFn<
  { systemSymbol: string },
  Record<string, never>,
  { client: QueryClient; auth: StoreApi<AuthStore> },
  { meta: MetaFunction }
> = async ({ context, params }) => {
  const system = context.client.ensureQueryData(getSystemByIdQuery({ systemSymbol: params.systemSymbol }))

  return {
    system: await system,
  }
}
