import { createLazyFileRoute } from '@tanstack/react-router'
import { ROUTES } from '@/config/routes'
import { SystemsRoute } from '@/routes/systems'

export const Route = createLazyFileRoute(ROUTES.SYSTEMS)({
  component: SystemsRoute,
})
