import { i18n } from '@/services/i18n'
import { createFileRoute, redirect, retainSearchParams } from '@tanstack/react-router'
import { valibotValidator } from '@tanstack/valibot-adapter'
import * as v from 'valibot'
import { ROUTES } from '@/config/routes'
import { getSystemListQuery } from '@/services/api/spacetraders/systems'

const LIMIT = 20

const SearchParamsSchema = v.object({
  page: v.fallback(v.optional(v.pipe(v.number(), v.integer(), v.minValue(1)), 1), 1),
})

export const Route = createFileRoute(ROUTES.SYSTEMS)({
  validateSearch: valibotValidator(SearchParamsSchema),
  search: {
    middlewares: [retainSearchParams(true)],
  },
  loaderDeps({ search }) {
    return { page: search.page }
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

      return redirect({
        to: '/systems',
        search: { page: max },
        replace: true,
      })
    }

    return {
      systems,
    }
  },
  head: () => {
    return {
      meta: [{ title: i18n.t('title_template', { title: 'systems.title', ns: 'meta' }) }],
    }
  },
})
