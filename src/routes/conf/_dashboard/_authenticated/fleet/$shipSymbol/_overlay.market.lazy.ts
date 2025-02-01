import { createLazyFileRoute } from '@tanstack/react-router'
import { ShipMarketRoute } from '@/routes/fleet/ship/market'

export const Route = createLazyFileRoute('/_dashboard/_authenticated/fleet/$shipSymbol/_overlay/market')({
  component: ShipMarketRoute,
})
