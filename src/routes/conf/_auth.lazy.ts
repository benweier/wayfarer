import { createLazyFileRoute } from '@tanstack/react-router'
import { AuthLayout } from '@/routes/auth'

export const Route = createLazyFileRoute('/_auth')({
  component: AuthLayout,
  pendingComponent: () => null,
})
