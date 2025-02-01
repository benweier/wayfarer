import { createLazyFileRoute } from '@tanstack/react-router'
import { ShipOverlayRoute } from '@/routes/fleet/ship/overlay'

export const Route = createLazyFileRoute('/_dashboard/_authenticated/fleet/$shipSymbol/_overlay')({
  component: ShipOverlayRoute,
})
