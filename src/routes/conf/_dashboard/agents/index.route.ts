import { meta } from '@/routes/agents/agents-route.meta'
import { getAgentListQuery } from '@/services/api/spacetraders/agent'
import { createFileRoute, defer } from '@tanstack/react-router'
import { fallback, minValue, number, object, optional, parse } from 'valibot'

const SearchParamsSchema = object({
  page: fallback(optional(number([minValue(1)])), 1),
})

export const Route = createFileRoute('/_dashboard/agents/')({
  validateSearch: (search) => parse(SearchParamsSchema, search),
  loaderDeps: ({ search }) => ({ page: search.page ?? 1 }),
  beforeLoad: () => ({ meta }),
  loader: ({ context, deps }) => {
    const agents = context.client.ensureQueryData(getAgentListQuery({ page: deps.page, limit: 20 }))

    return {
      agents: defer(agents),
    }
  },
})
