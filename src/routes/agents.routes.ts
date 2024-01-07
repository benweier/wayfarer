import { Route, defer, lazyRouteComponent } from '@tanstack/react-router'
import { z } from 'zod'
import { meta } from '@/routes/agents'
import { dashboardRoute } from '@/routes/dashboard.route'
import { getAgentListQuery } from '@/services/api/spacetraders/agent'

export const agentsRoute = new Route({
  path: 'agents',
  getParentRoute: () => dashboardRoute,
})

export const agentsIndexRoute = new Route({
  path: '/',
  getParentRoute: () => agentsRoute,
  validateSearch: z.object({
    page: z.number().min(1).optional().catch(1).default(1),
  }),
  beforeLoad: ({ search }) => ({ search, meta }),
  loader: ({ context }) => {
    const agents = context.client.ensureQueryData(getAgentListQuery({ page: context.search.page, limit: 20 }))

    return {
      agents: defer(agents),
    }
  },
  component: lazyRouteComponent(() => import('@/routes/agents'), 'AgentsRoute'),
})
