import { Core } from '@/routes/core.route'
import type { AuthStore } from '@/store/auth'
import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext } from '@tanstack/react-router'
import type { StoreApi } from 'zustand/vanilla'

export const Route = createRootRouteWithContext<{
  auth: StoreApi<AuthStore>
  client: QueryClient
}>()({
  component: Core,
})
