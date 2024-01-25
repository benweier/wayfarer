import { createFileRoute, defer } from '@tanstack/react-router'
import { fallback, minValue, number, object, optional, parse } from 'valibot'
import { meta } from '@/routes/systems/systems-route.meta'
import { getSystemListQuery } from '@/services/api/spacetraders'

const SearchParamsSchema = object({
  page: fallback(optional(number([minValue(1)])), 1),
})

export const Route = createFileRoute('/_dashboard/systems/')({
  validateSearch: (search) => parse(SearchParamsSchema, search),
  loaderDeps: ({ search }) => ({ page: search.page ?? 1 }),
  beforeLoad: () => ({ meta }),
  loader: ({ context, deps }) => {
    const systems = context.client.ensureQueryData(getSystemListQuery({ page: deps.page, limit: 20 }))

    return {
      systems: defer(systems),
    }
  },
})
