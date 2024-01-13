import { FileRoute } from '@tanstack/react-router'
const meta: MetaFunction = (t) => [{ title: t('auth.register.title', { ns: 'meta' }) }]

export const Route = new FileRoute('/_auth/register').createRoute({
  beforeLoad: () => ({ meta }),
  pendingComponent: () => null,
})
