import { FileRoute, defer } from '@tanstack/react-router'
import { z } from 'zod'
import { meta } from '@/routes/agents/agents-route.meta'
import { getAgentListQuery } from '@/services/api/spacetraders/agent'

export const Route = new FileRoute('/_dashboard/agents/').createRoute({
  validateSearch: z.object({
    page: z.number().min(1).optional().catch(1).default(1),
  }),
  loaderDeps: ({ search }) => ({ page: search.page }),
  beforeLoad: () => ({
    meta,
  }),
  loader: ({ context, deps }) => {
    const agents = context.client.ensureQueryData(getAgentListQuery({ page: deps.page, limit: 20 }))

    return {
      agents: defer(agents),
    }
  },
})
