import { Login } from '@/features/auth'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/login')({
  component: Login,
  pendingComponent: () => null,
})
