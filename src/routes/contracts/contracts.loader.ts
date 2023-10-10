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
    if (isHttpError(err, STATUS_CODES.NOT_FOUND)) {
      throw new Response(STATUS_MESSAGES.NOT_FOUND, { status: STATUS_CODES.NOT_FOUND })
    }

    throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
  }
}
