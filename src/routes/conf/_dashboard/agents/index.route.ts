import { FileRoute } from '@tanstack/react-router'
import { fallback, minValue, number, object, parse } from 'valibot'
import { meta } from '@/routes/agents/agents-route.meta'

const SearchParamsSchema = object({
  page: fallback(number([minValue(1)]), 1),
})

export const Route = new FileRoute('/_dashboard/agents/').createRoute({
  validateSearch: (search) => parse(SearchParamsSchema, search),
  loaderDeps: ({ search }) => ({ page: search.page ?? 1 }),
  beforeLoad: () => ({ meta }),
})
