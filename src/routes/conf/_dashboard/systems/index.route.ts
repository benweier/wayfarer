import { FileRoute, defer, lazyRouteComponent } from '@tanstack/react-router'
import { z } from 'zod'
import { meta } from '@/routes/systems/systems-route.meta'
import { getSystemListQuery } from '@/services/api/spacetraders'

export const Route = new FileRoute('/_dashboard/systems/').createRoute({
  validateSearch: z.object({
    page: z.number().min(1).optional().catch(1).default(1),
  }),
  loaderDeps: ({ search }) => ({ page: search.page }),
  beforeLoad: () => ({
    meta,
  }),
  loader: ({ context, deps }) => {
    const systems = context.client.ensureQueryData(getSystemListQuery({ page: deps.page, limit: 20 }))

    return {
      systems: defer(systems),
    }
  },
  component: lazyRouteComponent(() => import('@/routes/systems'), 'SystemsRoute'),
})
