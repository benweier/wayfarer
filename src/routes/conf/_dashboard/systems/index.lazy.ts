import { ROUTES } from '@/config/routes'
import { SystemsRoute } from '@/routes/systems'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(ROUTES.SYSTEMS)({
  component: SystemsRoute,
})
