import { FileRoute } from '@tanstack/react-router'
import { meta } from '@/routes/fleet/ship/ship-route.meta'

export const Route = new FileRoute('/_dashboard/_authenticated/fleet/$shipSymbol').createRoute({
  parseParams: ({ shipSymbol }) => ({ shipSymbol: shipSymbol.toUpperCase() }),
  beforeLoad: () => ({ meta }),
})
