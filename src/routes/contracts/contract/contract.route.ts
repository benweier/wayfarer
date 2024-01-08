import { Route, lazyRouteComponent } from '@tanstack/react-router'
import { authRequiredRoute } from '@/routes/auth/auth.route'
import { getContractByIdQuery } from '@/services/api/spacetraders'
import { meta } from './contract-route.meta'

export const contractRoute = new Route({
  path: '$contractId',
  getParentRoute: () => authRequiredRoute,
})
export const contractsIndexRoute = new Route({
  path: '/',
  getParentRoute: () => contractRoute,
  beforeLoad: () => ({ meta }),
  loader: async ({ context, params }) => {
    const contract = context.client.ensureQueryData(getContractByIdQuery({ contractId: params.contractId }))

    return {
      contracts: await contract,
    }
  },
  component: lazyRouteComponent(() => import('./contract-route.component'), 'ContractRoute'),
})
