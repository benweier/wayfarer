import { FileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const meta: MetaFunction = (t) => [{ title: t('auth.login.title', { ns: 'meta' }) }]

export const Route = new FileRoute('/_auth/login').createRoute({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  beforeLoad: ({ search }) => ({ meta, search }),
  pendingComponent: () => null,
})
