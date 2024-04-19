import { AuthLayout } from '@/routes/auth'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth')({
  component: AuthLayout,
  pendingComponent: () => null,
})
