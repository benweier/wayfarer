import { ShipRoute } from '@/routes/fleet/ship'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/_authenticated/fleet/$shipSymbol')({
  component: ShipRoute,
})
