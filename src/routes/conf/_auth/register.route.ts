import { createFileRoute } from '@tanstack/react-router'

const meta: MetaFunction = (t) => [{ title: t('auth.register.title') }]

export const Route = createFileRoute('/_auth/register')({
  beforeLoad: () => ({ meta }),
})
