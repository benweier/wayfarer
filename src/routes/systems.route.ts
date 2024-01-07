import { Route, defer, lazyRouteComponent } from '@tanstack/react-router'
import { z } from 'zod'
import { dashboardRoute } from '@/routes/dashboard.route'
import { meta } from '@/routes/systems'
import { getSystemListQuery } from '@/services/api/spacetraders'

export const systemsRoute = new Route({
  path: 'systems',
  getParentRoute: () => dashboardRoute,
})
export const systemsIndexRoute = new Route({
  path: '/',
  getParentRoute: () => systemsRoute,
  validateSearch: z.object({
    page: z.number().min(1).optional().catch(1).default(1),
  }),
  beforeLoad: ({ search }) => ({ search, meta }),
  loader: ({ context }) => {
    const systems = context.client.ensureQueryData(getSystemListQuery({ page: context.search.page, limit: 20 }))

    return {
      systems: defer(systems),
    }
  },
  component: lazyRouteComponent(() => import('@/routes/systems'), 'SystemsRoute'),
})
