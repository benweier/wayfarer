import { meta } from '@/routes/agents/agents-route.meta'
import { getAgentListQuery } from '@/services/api/spacetraders/agent'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { fallback, integer, number, object, parse, pipe, toMinValue } from 'valibot'

const LIMIT = 20

const SearchParamsSchema = object({
  page: fallback(pipe(number(), integer(), toMinValue(1)), 1),
})

export const Route = createFileRoute('/_dashboard/agents/')({
  validateSearch: (search) => parse(SearchParamsSchema, search),
  loaderDeps: ({ search }) => ({ page: search.page }),
  beforeLoad: () => ({ meta }),
  loader: async ({ context, deps }) => {
    const agents = await context.client.ensureQueryData(getAgentListQuery({ page: deps.page, limit: LIMIT }))
    const max = Math.ceil(agents.meta.total / LIMIT)

    if (deps.page > max) {
      return redirect({
        search: { page: max },
        replace: true,
      })
    }

    return {
      agents,
    }
  },
})
