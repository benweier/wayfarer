import { defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getContractsList } from '@/services/api/spacetraders'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { getState } from '@/store/auth'

export const loader: QueryClientLoaderFn = (client) => async () => {
  const { isAuthenticated } = getState()

  if (!isAuthenticated) {
    redirect(ROUTES.LOGIN)
    throw new Response(STATUS_MESSAGES.UNAUTHORIZED, { status: STATUS_CODES.UNAUTHORIZED })
  }

  try {
    const contracts = client.ensureQueryData({
      queryKey: ['contracts'],
      queryFn: ({ signal }) => getContractsList(undefined, { signal }),
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
