import { FleetRoute } from '@/routes/fleet'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/_authenticated/fleet/')({
  component: FleetRoute,
})
