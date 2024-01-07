import { Route, defer, lazyRouteComponent } from '@tanstack/react-router'
import { authRequiredRoute } from '@/routes/auth.route'
import { meta } from '@/routes/contracts/contracts-route.meta'
import { getContractListQuery } from '@/services/api/spacetraders'

export const contractsRoute = new Route({
  path: 'contracts',
  getParentRoute: () => authRequiredRoute,
})
export const contractsIndexRoute = new Route({
  path: '/',
  getParentRoute: () => contractsRoute,
  beforeLoad: () => ({ meta }),
  loader: ({ context }) => {
    const contracts = context.client.ensureQueryData(getContractListQuery())

    return {
      contracts: defer(contracts),
    }
  },
  component: lazyRouteComponent(() => import('@/routes/contracts'), 'ContractsRoute'),
})
