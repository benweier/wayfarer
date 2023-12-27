import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { type Ref, forwardRef } from 'react'
import { createShipOrbitMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type ShipActionProps } from './ship-actions.types'

const OrbitComponent = ({ ship, children }: ShipActionProps, ref: Ref<HTMLButtonElement>) => {
  const client = useQueryClient()
  const isMutating = useIsMutating({
    mutationKey: [{ scope: 'ships', entity: 'item' }, { shipSymbol: ship.symbol }],
  })
  const { mutate } = useMutation({
    mutationKey: createShipOrbitMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipOrbitMutation.mutationFn,
    onMutate: ({ shipSymbol }) => {
      const shipByIdQueryKey = getShipByIdQuery({ shipSymbol }).queryKey
      const shipListQueryKey = getShipListQuery().queryKey
      const ship = client.getQueryData(shipByIdQueryKey)
      const ships = client.getQueryData(shipListQueryKey)
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          shipByIdQueryKey,
          produce(ship, (draft) => {
            draft.data.nav.status = 'UNDOCKING'
          }),
        )
      }
      if (ships && index > -1) {
        client.setQueryData(
          shipListQueryKey,
          produce(ships, (draft) => {
            draft.data[index].nav.status = 'UNDOCKING'
          }),
        )
      }

      return { ship, ships }
    },
    onSuccess: (response, { shipSymbol }) => {
      const shipByIdQueryKey = getShipByIdQuery({ shipSymbol }).queryKey
      const shipListQueryKey = getShipListQuery().queryKey
      const ship = client.getQueryData(shipByIdQueryKey)
      const ships = client.getQueryData(shipListQueryKey)
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          shipByIdQueryKey,
          produce(ship, (draft) => {
            draft.data.nav = response.data.nav
          }),
        )
      }

      if (ships && index > -1) {
        client.setQueryData(
          shipListQueryKey,
          produce(ships, (draft) => {
            draft.data[index].nav = response.data.nav
          }),
        )
      }
    },
    onError: (_err, { shipSymbol }, ctx) => {
      client.setQueryData(getShipListQuery().queryKey, ctx?.ships)
      client.setQueryData(getShipByIdQuery({ shipSymbol }).queryKey, ctx?.ship)
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
