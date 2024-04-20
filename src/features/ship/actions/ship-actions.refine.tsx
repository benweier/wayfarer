import { createShipRefineMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders/fleet'
import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import type { ShipActionProps } from './ship-actions.types'

export const Refine = ({
  ship,
  disabled = false,
  itemSymbol,
  children,
}: ShipActionProps<
  ReturnType<typeof createShipRefineMutation.mutationFn>,
  {
    itemSymbol: string
  }
>) => {
  const client = useQueryClient()
  const shipByIdQueryKey = getShipByIdQuery({ shipSymbol: ship.symbol }).queryKey
  const shipListQueryKey = getShipListQuery().queryKey
  const isMutating = useIsMutating({ mutationKey: shipByIdQueryKey })
  const hasCooldown = ship.cooldown.remainingSeconds > 0
  const { mutateAsync } = useMutation({
    mutationKey: createShipRefineMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipRefineMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData(shipByIdQueryKey)
      const ships = client.getQueryData(shipListQueryKey)
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          shipByIdQueryKey,
          produce(ship, (draft) => {
            draft.data.cargo = response.data.cargo
            draft.data.cooldown = response.data.cooldown
          }),
        )
      }
      if (ships && index > -1) {
        client.setQueryData(
          shipListQueryKey,
          produce(ships, (draft) => {
            draft.data[index].cooldown = response.data.cooldown
            draft.data[index].cargo = response.data.cargo
          }),
        )
      }
    },
  })

  return children({
    disabled: disabled || hasCooldown || isMutating > 0,
    execute: () => {
      return mutateAsync({ shipSymbol: ship.symbol, produce: itemSymbol })
    },
  })
}
