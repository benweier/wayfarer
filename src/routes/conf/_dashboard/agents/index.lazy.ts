import { createFileRoute } from '@tanstack/react-router'
import { AgentsRoute } from '@/routes/agents'

export const Route = createFileRoute('/_dashboard/agents/')({
  component: AgentsRoute,
})
