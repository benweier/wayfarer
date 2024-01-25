import { createLazyFileRoute } from '@tanstack/react-router'
import { FleetRoute } from '@/routes/fleet'

export const Route = createLazyFileRoute('/_dashboard/_authenticated/fleet/')({
  component: FleetRoute,
})
