import { meta } from '@/routes/contracts/contracts-route.meta'
import { getContractListQuery } from '@/services/api/spacetraders/contracts'
import { createFileRoute, defer } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/_authenticated/contracts')({
  beforeLoad: () => ({ meta }),
  loader: ({ context }) => {
    const contracts = context.client.ensureQueryData(getContractListQuery())

    return {
      contracts: defer(contracts),
    }
  },
})
