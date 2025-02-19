import { createRootRouteWithContext } from '@tanstack/react-router'
import { Core } from '@/routes/core.route'
import type { AuthStore } from '@/store/auth'
import type { QueryClient } from '@tanstack/react-query'
import type { StoreApi } from 'zustand'

export const Route = createRootRouteWithContext<{
  auth: StoreApi<AuthStore>
  client: QueryClient
}>()({
  component: Core,
})
