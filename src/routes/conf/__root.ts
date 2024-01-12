import { type QueryClient } from '@tanstack/react-query'
import { rootRouteWithContext } from '@tanstack/react-router'
import { type StoreApi } from 'zustand/vanilla'
import { Core } from '@/routes/core.route'
import { type AuthStore } from '@/store/auth'

export const Route = rootRouteWithContext<{
  auth: StoreApi<AuthStore>
  client: QueryClient
}>()({
  component: Core,
})
