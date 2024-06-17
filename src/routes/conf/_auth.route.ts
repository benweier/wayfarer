import { AuthLayout } from '@/routes/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
  pendingComponent: () => null,
})
