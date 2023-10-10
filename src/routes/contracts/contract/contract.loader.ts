import { defer } from 'react-router-dom'
import { getContractByIdQuery } from '@/services/api/spacetraders'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'

export const loader: QueryClientLoaderFn =
  (client) =>
  async ({ params }) => {
    const { contractID } = params

    if (!contractID) {
      throw new Response(STATUS_MESSAGES.UNPROCESSABLE_ENTITY, { status: STATUS_CODES.UNPROCESSABLE_ENTITY })
    }

    try {
      const contract = await client.ensureQueryData({
        queryKey: getContractByIdQuery.getQueryKey({ contractId: contractID }),
        queryFn: getContractByIdQuery.queryFn,
      })

      return defer({ contract })
    } catch (err) {
      if (isHttpError(err, STATUS_CODES.NOT_FOUND)) {
        throw new Response(STATUS_MESSAGES.NOT_FOUND, { status: STATUS_CODES.NOT_FOUND })
      }

      throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
  }
