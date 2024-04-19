import { ShipOverlayRoute } from '@/routes/fleet/ship/overlay'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/_authenticated/fleet/$shipSymbol/_overlay')({
  component: ShipOverlayRoute,
})
