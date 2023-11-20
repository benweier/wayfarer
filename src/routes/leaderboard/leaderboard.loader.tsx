import { defer } from 'react-router-dom'
import { getStatusQuery } from '@/services/api/spacetraders/status'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'

export const meta = () => {
  return (
    <>
      <title>Leaderboard</title>
    </>
  )
}

export const loader: QueryClientLoaderFn = (client) => async () => {
  try {
    const status = await client.ensureQueryData({
      queryKey: getStatusQuery.getQueryKey(),
      queryFn: getStatusQuery.queryFn,
    })

    return defer({ status })
  } catch (err) {
    if (isHttpError(err, STATUS_CODES.NOT_FOUND)) {
      throw new Response(STATUS_MESSAGES.NOT_FOUND, { status: STATUS_CODES.NOT_FOUND })
    }

    throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
  }
}
