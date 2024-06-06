import { ROUTES } from '@/config/routes'
import { meta } from '@/routes/systems/systems-route.meta'
import { getSystemListQuery } from '@/services/api/spacetraders/systems'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { fallback, integer, number, object, parse, pipe, toMinValue } from 'valibot'

const LIMIT = 20

const SearchParamsSchema = object({
  page: fallback(pipe(number(), integer(), toMinValue(1)), 1),
})

export const Route = createFileRoute(ROUTES.SYSTEMS)({
  validateSearch: (search) => parse(SearchParamsSchema, search),
  loaderDeps: ({ search }) => ({ page: search.page }),
  beforeLoad: () => ({ meta }),
  loader: async ({ context, deps }) => {
    const systems = await context.client.ensureQueryData(getSystemListQuery({ page: deps.page, limit: LIMIT }))
    const max = Math.ceil(systems.meta.total / LIMIT)

    if (deps.page > max) {
      return redirect({
        search: { page: max },
        replace: true,
      })
    }

    return {
      systems,
    }
  },
})
