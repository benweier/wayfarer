import { Route, defer, lazyRouteComponent } from '@tanstack/react-router'
import { authRequiredRoute } from '@/routes/auth/auth.route'
import { getContractListQuery } from '@/services/api/spacetraders'
import { meta } from './contracts-route.meta'

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
  component: lazyRouteComponent(() => import('./contracts-route.component'), 'ContractsRoute'),
})
