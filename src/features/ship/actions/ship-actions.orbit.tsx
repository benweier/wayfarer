import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { type Ref, forwardRef } from 'react'
import { createShipOrbitMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type ShipResponse } from '@/types/spacetraders'
import { type ShipActionProps } from './ship-actions.types'
import {
  updateShipInFleetNav,
  updateShipInFleetNavStatus,
  updateShipNav,
  updateShipNavStatus,
} from './ship-actions.utilities'

const OrbitComponent = (
  {
    ship,
    children = (props) => (
      <button className="btn btn-sm" {...props}>
        Orbit
      </button>
    ),
  }: ShipActionProps,
  ref: Ref<HTMLButtonElement>,
) => {
  const client = useQueryClient()
  const isMutating = useIsMutating({
    mutationKey: [{ scope: 'ships', entity: 'item' }, { shipSymbol: ship.symbol }],
  })
  const { mutate } = useMutation({
    mutationKey: createShipOrbitMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipOrbitMutation.mutationFn,
    onMutate: ({ shipSymbol }) => {
      void client.cancelQueries({ queryKey: [{ scope: 'ships' }] })

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(getShipByIdQuery.getQueryKey({ shipSymbol }))
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(getShipListQuery.getQueryKey())

      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(getShipByIdQuery.getQueryKey({ shipSymbol }), updateShipNavStatus(ship, 'UNDOCKING'))
      }
      if (ships && index > -1) {
        client.setQueryData(getShipListQuery.getQueryKey(), updateShipInFleetNavStatus(ships, index, 'UNDOCKING'))
      }

      return { ship, ships }
    },
    onSuccess: (response, { shipSymbol }, ctx) => {
      const index = ctx?.ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ctx?.ship) {
        client.setQueryData(getShipByIdQuery.getQueryKey({ shipSymbol }), updateShipNav(ctx.ship, response.data.nav))
      }
      if (ctx?.ships && index > -1) {
        client.setQueryData(getShipListQuery.getQueryKey(), updateShipInFleetNav(ctx.ships, index, response.data.nav))
      }
    },
    onError: (_err, { shipSymbol }, ctx) => {
      client.setQueryData(getShipListQuery.getQueryKey(), ctx?.ships)
      client.setQueryData(getShipByIdQuery.getQueryKey({ shipSymbol }), ctx?.ship)
    },
    onSettled: (_res, _err) => {
      void client.invalidateQueries({ queryKey: [{ scope: 'ships' }] })
    },
  })

  return children({
    ref,
    disabled: isMutating > 0 || ship.nav.status !== 'DOCKED',
    onClick: () => {
      mutate({ shipSymbol: ship.symbol })
    },
  })
}

export const Orbit = forwardRef(OrbitComponent)
