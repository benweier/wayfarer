import { createFileRoute } from '@tanstack/react-router'
import { AuthLayout } from '@/routes/auth'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
  pendingComponent: () => null,
})
