import { ShipMarketRoute } from '@/routes/fleet/ship/market'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_dashboard/_authenticated/fleet/$shipSymbol/_overlay/market')({
  component: ShipMarketRoute,
})
