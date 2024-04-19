import { Register } from '@/features/auth'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/register')({
  component: Register,
  pendingComponent: () => null,
})
