import { FileRoute, defer } from '@tanstack/react-router'
import { meta } from '@/routes/contracts/contracts-route.meta'
import { getContractListQuery } from '@/services/api/spacetraders'

export const Route = new FileRoute('/_dashboard/_authenticated/contracts').createRoute({
  beforeLoad: () => ({ meta }),
  loader: ({ context }) => {
    const contracts = context.client.ensureQueryData(getContractListQuery())

    return {
      contracts: defer(contracts),
    }
  },
})
