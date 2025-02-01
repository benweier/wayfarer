import { createLazyFileRoute } from '@tanstack/react-router'
import { ShipRoute } from '@/routes/fleet/ship'

export const Route = createLazyFileRoute('/_dashboard/_authenticated/fleet/$shipSymbol')({
  component: ShipRoute,
})
