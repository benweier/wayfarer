import { FileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { meta } from '@/routes/systems/system/system-route.meta'
import { getSystemByIdQuery } from '@/services/api/spacetraders'

export const Route = new FileRoute('/_dashboard/systems/$systemSymbol/').createRoute({
  parseParams: ({ systemSymbol }) => ({ systemSymbol: systemSymbol.toUpperCase() }),
  beforeLoad: () => ({ meta }),
  loader: async ({ context, params }) => {
    const system = context.client.ensureQueryData(getSystemByIdQuery({ systemSymbol: params.systemSymbol }))

    return {
      system: await system,
    }
  },
  component: lazyRouteComponent(() => import('@/routes/systems/system'), 'SystemRoute'),
})
