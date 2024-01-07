import { type QueryClient } from '@tanstack/react-query'
import { Route, rootRouteWithContext } from '@tanstack/react-router'
import { type StoreApi } from 'zustand/vanilla'
import { Core } from '@/routes/core.route'
import { HomeRoute } from '@/routes/home'
import { type AuthStore } from '@/store/auth'

export const rootRoute = rootRouteWithContext<{
  auth: StoreApi<AuthStore>
  client: QueryClient
}>()({
  component: Core,
})

export const rootIndexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomeRoute,
})
