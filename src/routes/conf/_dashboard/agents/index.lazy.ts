import { createLazyFileRoute } from '@tanstack/react-router'
import { ROUTES } from '@/config/routes'
import { AgentsRoute } from '@/routes/agents'

export const Route = createLazyFileRoute(ROUTES.AGENTS)({
  component: AgentsRoute,
})
