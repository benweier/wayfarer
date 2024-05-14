import { render } from '@/test/utilities/render.helper'
import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'

export const createTestRouter = async (el: ReactNode) => {
  const rootRoute = createRootRoute({ component: () => <Outlet /> })
  const testRoute = createRoute({
    path: '/',
    getParentRoute: () => rootRoute,
    component: () => el,
  })
  const router = createRouter({
    history: createMemoryHistory({
      initialEntries: ['/'],
    }),
    routeTree: rootRoute.addChildren([testRoute]),
  })

  router.isServer = true

  await router.load()

  return router
}

export const renderWithTestRouter = async (el: ReactNode) => {
  const router = await createTestRouter(el)

  return render(<RouterProvider router={router} />)
}
