import { defer, redirect } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { getShipByIdQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { STATUS_CODES, STATUS_MESSAGES, isHttpError } from '@/services/http'
import { type ShipResponse } from '@/types/spacetraders'

export const meta: MetaFunction<{ ship: SpaceTradersResponse<ShipResponse> }> = (t, { ship } = {}) => {
  if (!ship) {
    return []
  }

  return [{ title: t('ship.title', { ns: 'meta', shipSymbol: ship.data.symbol }) }]
}

export const loader: QueryClientLoaderFn =
  (client) =>
  async ({ params }) => {
    const { shipSymbol } = params

    if (!shipSymbol) {
      return redirect(ROUTES.FLEET)
    }

    try {
      const ship = client.ensureQueryData(getShipByIdQuery({ shipSymbol }))

      return defer({ ship: await ship })
    } catch (err) {
      if (isHttpError(err)) {
        throw new Response(err.statusText, { status: err.status })
      }

      throw new Response(STATUS_MESSAGES.INTERNAL_SERVER_ERROR, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
  }
