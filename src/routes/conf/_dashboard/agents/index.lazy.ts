import { ROUTES } from '@/config/routes'
import { AgentsRoute } from '@/routes/agents'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(ROUTES.AGENTS)({
  component: AgentsRoute,
})
