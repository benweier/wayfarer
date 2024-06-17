import { ROUTES } from '@/config/routes'
import { meta } from '@/routes/systems/systems-route.meta'
import { getSystemListQuery } from '@/services/api/spacetraders/systems'
import { type SearchSchemaInput, createFileRoute, redirect } from '@tanstack/react-router'
import * as v from 'valibot'

const LIMIT = 20

const SearchParamsSchema = v.object({
  page: v.fallback(v.optional(v.pipe(v.number(), v.integer(), v.toMinValue(1)), 1), 1),
})

type SearchParamsSchema = typeof SearchParamsSchema
type SearchParamsInput = v.InferInput<SearchParamsSchema>
type SearchParamsOutput = v.InferOutput<SearchParamsSchema>

export const Route = createFileRoute(ROUTES.SYSTEMS)({
  validateSearch(search: SearchParamsInput & SearchSchemaInput): SearchParamsOutput {
    return v.parse(SearchParamsSchema, search)
  },
  loaderDeps({ search }) {
    return { page: search.page }
  },
  beforeLoad() {
    return { meta }
  },
  async loader({ context, deps }) {
    const systems = await context.client.ensureQueryData(
      getSystemListQuery({
        page: deps.page,
        limit: LIMIT,
      }),
    )
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
