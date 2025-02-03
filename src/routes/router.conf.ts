import { createRouter } from '@tanstack/react-router'
import { NotFound } from '@/components/not-found'
import { RouteError } from '@/components/route-error'
import { client } from '@/services/query-client'
import { authStore } from '@/store/auth'
import { routeTree } from './route-tree.gen'
import { Fallback } from './router.fallback'
import type { AuthStore } from '@/store/auth'
import type { QueryClient } from '@tanstack/react-query'
import type { StoreApi } from 'zustand'

export const router = createRouter({
  routeTree,
  context: {
    client,
    auth: authStore,
  },
  scrollRestoration: true,
  scrollRestorationBehavior: 'instant',
  defaultPreload: false,
  defaultErrorComponent: RouteError,
  defaultNotFoundComponent: NotFound,
  defaultPendingComponent: Fallback,
  defaultPendingMinMs: 300,
  defaultPendingMs: 800,
})

declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: typeof router
  }
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface RouteContext {
    client: QueryClient
    auth: StoreApi<AuthStore>
  }
}
