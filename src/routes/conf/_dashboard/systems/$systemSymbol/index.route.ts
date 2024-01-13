import { FileRoute } from '@tanstack/react-router'
import { meta } from '@/routes/systems/system/system-route.meta'

export const Route = new FileRoute('/_dashboard/systems/$systemSymbol/').createRoute({
  parseParams: ({ systemSymbol }) => ({ systemSymbol: systemSymbol.toUpperCase() }),
  beforeLoad: () => ({ meta }),
})
