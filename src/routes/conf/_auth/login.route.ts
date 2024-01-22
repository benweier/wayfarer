import { FileRoute } from '@tanstack/react-router'
import { object, optional, parse, string } from 'valibot'

const SearchParamsSchema = object({
  redirect: optional(string()),
})
const meta: MetaFunction = (t) => [{ title: t('auth.login.title', { ns: 'meta' }) }]

export const Route = new FileRoute('/_auth/login').createRoute({
  validateSearch: (search) => parse(SearchParamsSchema, search),
  beforeLoad: ({ search }) => ({ meta, search }),
  pendingComponent: () => null,
})
