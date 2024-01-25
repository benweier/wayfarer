import { createFileRoute } from '@tanstack/react-router'

const meta: MetaFunction = (t) => [{ title: t('auth.login.title', { ns: 'meta' }) }]

export const Route = createFileRoute('/_auth/login')({
  beforeLoad: () => ({ meta }),
})
