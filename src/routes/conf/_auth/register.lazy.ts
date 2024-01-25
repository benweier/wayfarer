import { createLazyFileRoute } from '@tanstack/react-router'
import { Register } from '@/features/auth'

export const Route = createLazyFileRoute('/_auth/register')({
  component: Register,
  pendingComponent: () => null,
})
