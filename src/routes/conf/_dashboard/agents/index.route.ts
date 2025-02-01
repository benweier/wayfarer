import { createFileRoute, redirect, retainSearchParams } from '@tanstack/react-router'
import { valibotValidator } from '@tanstack/valibot-adapter'
import * as v from 'valibot'
import { ROUTES } from '@/config/routes'
import { meta } from '@/routes/agents/agents-route.meta'
import { getAgentListQuery } from '@/services/api/spacetraders/agent'

const LIMIT = 20

const SearchParamsSchema = v.object({
  page: v.fallback(v.optional(v.pipe(v.number(), v.integer(), v.toMinValue(1)), 1), 1),
})

export const Route = createFileRoute(ROUTES.AGENTS)({
  validateSearch: valibotValidator(SearchParamsSchema),
  search: {
    middlewares: [retainSearchParams(true)],
  },
  beforeLoad() {
    return { meta }
  },
  loaderDeps({ search }) {
    return { page: search.page }
  },
  async loader({ context, deps }) {
    const agents = await context.client.ensureQueryData(
      getAgentListQuery({
        page: deps.page,
        limit: LIMIT,
      }),
    )
    const max = Math.ceil(agents.meta.total / LIMIT)

    if (deps.page > max) {
      return redirect({
        to: '/agents',
        search: { page: max },
        replace: true,
      })
    }

    return {
      agents,
    }
  },
})
