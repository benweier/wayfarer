import { Router } from '@tanstack/react-router'
import { RouteError } from '@/components/route-error'
import { client } from '@/services/query-client'
import { authStore } from '@/store/auth'
import { notFoundRoute } from './not-found.route'
import { routeTree } from './route-tree.gen'
import { Fallback } from './router.fallback'

export const router = new Router({
  routeTree,
  context: {
    client,
    auth: authStore,
  },
  defaultErrorComponent: RouteError,
  defaultPendingComponent: Fallback,
  defaultPendingMinMs: 300,
  defaultPendingMs: 800,
  notFoundRoute,
})

declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: typeof router
  }
}
