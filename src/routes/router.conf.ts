import { createRouter } from '@tanstack/react-router'
import { NotFound } from '@/components/not-found'
import { RouteError } from '@/components/route-error'
import { client } from '@/services/query-client'
import { authStore } from '@/store/auth'
import { routeTree } from './route-tree.gen'
import { Fallback } from './router.fallback'

export const router = createRouter({
  routeTree,
  context: {
    client,
    auth: authStore,
  },
  defaultPreload: false,
  defaultErrorComponent: RouteError,
  defaultPendingComponent: Fallback,
  defaultPendingMinMs: 300,
  defaultPendingMs: 800,
  globalNotFound: NotFound,
})

declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: typeof router
  }
}
