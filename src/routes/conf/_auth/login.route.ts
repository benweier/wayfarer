import { FileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = new FileRoute('/_auth/login').createRoute({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  beforeLoad: ({ search }) => {
    const meta: MetaFunction = (t) => [{ title: t('auth.login.title', { ns: 'meta' }) }]

    return {
      search,
      meta,
    }
  },
  component: lazyRouteComponent(() => import('@/features/auth/login'), 'Login'),
  pendingComponent: () => null,
})
