import { defer, redirect } from 'react-router-dom'
import { getContractByIdQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { type ContractResponse } from '@/types/spacetraders'

export const meta: MetaFunction<Partial<{ contract: SpaceTradersResponse<ContractResponse> }>> = (t, data) => {
  if (!data?.contract) {
    return []
  }

  return [{ title: t('contract.title', { ns: 'meta', contractId: data.contract.data.id }) }]
}

export const loader: QueryClientLoaderFn =
  (client) =>
  async ({ params }) => {
    const { contractId } = params

    if (!contractId) {
      return redirect('/contracts')
    }

    try {
      const contract = client.ensureQueryData(getContractByIdQuery({ contractId }))

      return defer({ contract: await contract })
    } catch (err) {
      if (isHttpError(err)) {
        throw new Response(err.statusText, { status: err.status })
      }

      throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
  }
