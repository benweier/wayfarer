import { defer } from 'react-router-dom'
import { getContractListQuery } from '@/services/api/spacetraders'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'

export const loader: QueryClientLoaderFn = (client) => async () => {
  try {
    const contracts = client.ensureQueryData({
      queryKey: getContractListQuery.getQueryKey(),
      queryFn: getContractListQuery.queryFn,
    })

    return defer({
      contracts: await contracts,
    })
  } catch (err) {
    if (isHttpError(err)) {
      throw new Response(err.statusText, { status: err.status })
    }

    throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
  }
}
