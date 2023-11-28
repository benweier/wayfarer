import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { type Ref, forwardRef } from 'react'
import { createShipDockMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type ShipResponse } from '@/types/spacetraders'
import { type ShipActionProps } from './ship-actions.types'

const DockComponent = ({ ship, children }: ShipActionProps, ref: Ref<HTMLButtonElement>) => {
  const client = useQueryClient()
  const isMutating = useIsMutating({
    mutationKey: [{ scope: 'ships', entity: 'item' }, { shipSymbol: ship.symbol }],
  })
  const { mutate } = useMutation({
    mutationKey: createShipDockMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipDockMutation.mutationFn,
    onMutate: ({ shipSymbol }) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(getShipByIdQuery.getQueryKey({ shipSymbol }))
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(getShipListQuery.getQueryKey())
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          getShipByIdQuery.getQueryKey({ shipSymbol }),
          produce(ship, (draft) => {
            draft.data.nav.status = 'DOCKING'
          }),
        )
      }
      if (ships && index > -1) {
        client.setQueryData(
          getShipListQuery.getQueryKey(),
          produce(ships, (draft) => {
            draft.data[index].nav.status = 'DOCKING'
          }),
        )
      }

      return { ship, ships }
    },
    onSuccess: (response, { shipSymbol }, ctx) => {
      const index = ctx?.ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ctx?.ship) {
        client.setQueryData(
          getShipByIdQuery.getQueryKey({ shipSymbol }),
          produce(ctx.ship, (draft) => {
            draft.data.nav = response.data.nav
          }),
        )
      }
      if (ctx?.ships && index > -1) {
        client.setQueryData(
          getShipListQuery.getQueryKey(),
          produce(ctx.ships, (draft) => {
            draft.data[index].nav = response.data.nav
          }),
        )
      }
    },
    onError: (_err, { shipSymbol }, ctx) => {
      client.setQueryData(getShipByIdQuery.getQueryKey({ shipSymbol }), ctx?.ship)
      client.setQueryData(getShipListQuery.getQueryKey(), ctx?.ships)
    },
  })

  return children({
    ref,
    disabled: isMutating > 0 || ship.nav.status !== 'IN_ORBIT',
    onClick: () => {
      mutate({ shipSymbol: ship.symbol })
    },
  })
}

export const Dock = forwardRef(DockComponent)
