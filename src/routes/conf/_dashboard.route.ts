import { FileRoute } from '@tanstack/react-router'

const meta: MetaFunction = (t) => [{ title: t('dashboard.title', { ns: 'meta' }) }]

export const Route = new FileRoute('/_dashboard').createRoute({
  beforeLoad: () => ({ meta }),
})
