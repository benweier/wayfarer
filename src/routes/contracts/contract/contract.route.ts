import { Route, lazyRouteComponent } from '@tanstack/react-router'
import { contractsRoute } from '@/routes/contracts'
import { getContractByIdQuery } from '@/services/api/spacetraders'
import { meta } from './contract-route.meta'

export const contractRoute = new Route({
  path: '$contractId',
  getParentRoute: () => contractsRoute,
  beforeLoad: () => ({ meta }),
  loader: async ({ context, params }) => {
    const contract = context.client.ensureQueryData(getContractByIdQuery({ contractId: params.contractId }))

    return {
      contracts: await contract,
    }
  },
  component: lazyRouteComponent(() => import('./contract-route.component'), 'ContractRoute'),
})
