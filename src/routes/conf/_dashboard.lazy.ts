import { DashboardLayout } from '@/routes/dashboard'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard')({
  component: DashboardLayout,
})
