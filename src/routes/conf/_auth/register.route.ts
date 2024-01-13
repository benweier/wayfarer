import { FileRoute } from '@tanstack/react-router'

export const Route = new FileRoute('/_auth/register').createRoute({
  beforeLoad: () => {
    const meta: MetaFunction = (t) => [{ title: t('auth.register.title', { ns: 'meta' }) }]

    return { meta }
  },
  pendingComponent: () => null,
})
