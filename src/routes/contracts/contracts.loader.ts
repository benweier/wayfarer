import { defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getContractListQuery } from '@/services/api/spacetraders'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { getState } from '@/store/auth'

export const loader: QueryClientLoaderFn = (client) => async () => {
  const { isAuthenticated } = getState()

  if (!isAuthenticated) {
    return redirect(ROUTES.LOGIN)
  }

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
