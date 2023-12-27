import { defer } from 'react-router-dom'
import { getStatusQuery } from '@/services/api/spacetraders/status'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'

export const meta: MetaFunction = (t) => {
  return [{ title: t('leaderboard.title', { ns: 'meta' }) }]
}

export const loader: QueryClientLoaderFn = (client) => () => {
  try {
    const status = client.ensureQueryData(getStatusQuery())

    return defer({ status })
  } catch (err) {
    if (isHttpError(err, STATUS_CODES.NOT_FOUND)) {
      throw new Response(STATUS_MESSAGES.NOT_FOUND, { status: STATUS_CODES.NOT_FOUND })
    }

    throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
  }
}
