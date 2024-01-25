import { createLazyFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '@/routes/dashboard'

export const Route = createLazyFileRoute('/_dashboard')({
  component: DashboardLayout,
})
