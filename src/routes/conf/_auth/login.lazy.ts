import { createLazyFileRoute } from '@tanstack/react-router'
import { Login } from '@/features/auth'

export const Route = createLazyFileRoute('/_auth/login')({
  component: Login,
  pendingComponent: () => null,
})
