import { createFileRoute } from '@tanstack/react-router'
import { object, optional, parse, string } from 'valibot'

const SearchParamsSchema = object({
  redirect: optional(string()),
})
const meta: MetaFunction = (t) => [{ title: t('auth.login.title', { ns: 'meta' }) }]

export const Route = createFileRoute('/_auth/login')({
  validateSearch: (search) => parse(SearchParamsSchema, search),
  beforeLoad: ({ search }) => ({ meta, search }),
})
