import { Route, defer, lazyRouteComponent } from '@tanstack/react-router'
import { authRequiredRoute } from '@/routes/auth.route'
import { getContractListQuery } from '@/services/api/spacetraders'

export const contractsRoute = new Route({
  path: 'contracts',
  getParentRoute: () => authRequiredRoute,
})
export const contractsIndexRoute = new Route({
  path: '/',
  getParentRoute: () => contractsRoute,
  loader: ({ context }) => {
    const contracts = context.client.ensureQueryData(getContractListQuery())

    return {
      contracts: defer(contracts),
    }
  },
  component: lazyRouteComponent(() => import('@/routes/contracts'), 'ContractsRoute'),
})
