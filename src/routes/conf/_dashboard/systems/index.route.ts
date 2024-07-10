import { ROUTES } from '@/config/routes'
import { meta } from '@/routes/systems/systems-route.meta'
import { getSystemListQuery } from '@/services/api/spacetraders/systems'
import { type SearchSchemaInput, createFileRoute, redirect } from '@tanstack/react-router'
import * as v from 'valibot'

const LIMIT = 20

const SearchParamsSchema = v.object({
  page: v.fallback(v.pipe(v.number(), v.integer(), v.minValue(1)), 1),
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
    const query = getSystemListQuery({
      page: deps.page,
      limit: LIMIT,
    })
    const systems = await context.client.ensureQueryData(query)
    const max = Math.ceil(systems.meta.total / LIMIT)

    if (deps.page > max) {
      context.client.removeQueries({
        queryKey: query.queryKey,
      })
      context.client.setQueryData(getSystemListQuery({ page: max, limit: LIMIT }).queryKey, systems)

      throw redirect({
        to: '/systems',
        search: { page: max },
        replace: true,
      })
    }

    return {
      systems,
    }
  },
})
