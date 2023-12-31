import { defer } from 'react-router-dom'
import { getContractListQuery } from '@/services/api/spacetraders/contracts'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'

export const meta: MetaFunction = (t) => {
  return [{ title: t('contracts.title', { ns: 'meta' }) }]
}

export const loader: QueryClientLoaderFn = (client) => () => {
  try {
    const contracts = client.ensureQueryData(getContractListQuery())

    return defer({
      contracts,
    })
  } catch (err) {
    if (isHttpError(err)) {
      throw new Response(err.statusText, { status: err.status })
    }

    throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
  }
}
