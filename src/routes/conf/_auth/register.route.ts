import { createFileRoute } from '@tanstack/react-router'

const meta: MetaFunction = (t) => [{ title: t('auth.register.title', { ns: 'meta' }) }]

export const Route = createFileRoute('/_auth/register')({
  beforeLoad: () => ({ meta }),
})
