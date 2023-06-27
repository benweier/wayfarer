import { defer } from 'react-router-dom'
import { get } from '@/services/fetch'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'

export const loader: QueryClientLoaderFn = (client) => async () => {
  try {
    const url = new URL(import.meta.env.SPACETRADERS_API_BASE_URL)
    const status = await client.ensureQueryData({
      queryKey: ['status'],
      queryFn: ({ signal }) => get(url, { signal }),
    })

    return defer({ status })
  } catch (err) {
    if (isHttpError(err, STATUS_CODES.NOT_FOUND)) {
      throw new Response(STATUS_MESSAGES.NOT_FOUND, { status: STATUS_CODES.NOT_FOUND })
    }

    throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
  }
}
