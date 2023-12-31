import { defer, redirect } from 'react-router-dom'
import { getContractByIdQuery } from '@/services/api/spacetraders'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'

export const loader: QueryClientLoaderFn =
  (client) =>
  async ({ params }) => {
    const { contractId } = params

    if (!contractId) {
      return redirect('/contracts')
    }

    try {
      const contract = await client.ensureQueryData(getContractByIdQuery({ contractId }))

      return defer({ contract })
    } catch (err) {
      if (isHttpError(err)) {
        throw new Response(err.statusText, { status: err.status })
      }

      throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
  }
