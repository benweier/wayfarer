import { AgentsRoute } from '@/routes/agents'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/agents/')({
  component: AgentsRoute,
})
