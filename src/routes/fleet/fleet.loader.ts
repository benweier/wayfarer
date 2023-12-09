import { defer } from 'react-router-dom'
import { getShipListQuery } from '@/services/api/spacetraders/fleet'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'

export const meta: MetaFunction = (t) => {
  return [{ title: t('fleet.title', { ns: 'meta' }) }]
}

export const loader: QueryClientLoaderFn = (client) => () => {
  try {
    const ships = client.ensureQueryData({
      queryKey: getShipListQuery.getQueryKey(),
      queryFn: getShipListQuery.queryFn,
      staleTime: Infinity,
      gcTime: Infinity,
    })

    return defer({
      ships,
    })
  } catch (err) {
    if (isHttpError(err)) {
      throw new Response(err.statusText, { status: err.status })
    }

    throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
  }
}
