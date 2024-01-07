import { Route, lazyRouteComponent } from '@tanstack/react-router'
import { meta } from '@/routes/systems/system'
import { systemsRoute } from '@/routes/systems.route'
import { getSystemByIdQuery } from '@/services/api/spacetraders'

export const systemRoute = new Route({
  path: '$systemSymbol',
  getParentRoute: () => systemsRoute,
  parseParams: ({ systemSymbol }) => ({ systemSymbol: systemSymbol.toUpperCase() }),
})
export const systemIndexRoute = new Route({
  path: '/',
  getParentRoute: () => systemRoute,
  beforeLoad: () => ({ meta }),
  loader: async ({ context, params }) => {
    const system = context.client.ensureQueryData(getSystemByIdQuery({ systemSymbol: params.systemSymbol }))

    return {
      system: await system,
    }
  },
  component: lazyRouteComponent(() => import('@/routes/systems/system'), 'SystemRoute'),
})
