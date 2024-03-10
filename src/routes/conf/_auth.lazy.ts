import { createLazyFileRoute } from '@tanstack/react-router'
import { AuthLayout } from '@/routes/auth'
import { i18n } from '@/services/i18n'

export const Route = createLazyFileRoute('/_auth')({
  loader: async () => {
    await i18n.loadNamespaces('auth')
  },
  component: AuthLayout,
  pendingComponent: () => null,
})
