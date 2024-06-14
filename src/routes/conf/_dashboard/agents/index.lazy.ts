import { AgentsRoute } from '@/routes/agents'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/agents/')({
  component: AgentsRoute,
})
