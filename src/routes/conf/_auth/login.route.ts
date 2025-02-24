import { i18n } from '@/services/i18n'
import { createFileRoute } from '@tanstack/react-router'
import { object, optional, parse, string } from 'valibot'

const SearchParamsSchema = object({
  redirect: optional(string()),
})

export const Route = createFileRoute('/_auth/login')({
  validateSearch: (search) => parse(SearchParamsSchema, search),
  beforeLoad: ({ search }) => ({ search }),
  head: () => {
    return {
      meta: [{ title: i18n.t('title_template', { title: 'auth.login.title', ns: 'meta' }) }],
    }
  },
})
