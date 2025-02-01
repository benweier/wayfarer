import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipRefuelMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders/fleet'
import { useAuthStore } from '@/store/auth'
import type { ShipActionProps } from './ship-actions.types'

export const Refuel = ({
  ship,
  disabled = false,
  children,
}: ShipActionProps<ReturnType<typeof createShipRefuelMutation.mutationFn>>) => {
  const setAgent = useAuthStore((state) => state.actions.setAgent)
  const client = useQueryClient()
  const shipByIdQueryKey = getShipByIdQuery({ shipSymbol: ship.symbol }).queryKey
  const shipListQueryKey = getShipListQuery().queryKey
  const isMutating = useIsMutating({ mutationKey: shipByIdQueryKey })
  const { mutateAsync, isPending } = useMutation({
    mutationKey: createShipRefuelMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipRefuelMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData(shipByIdQueryKey)
      const ships = client.getQueryData(shipListQueryKey)
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          shipByIdQueryKey,
          produce(ship, (draft) => {
            draft.data.fuel = response.data.fuel
          }),
        )
      }
      if (ships && index > -1) {
        client.setQueryData(
          shipListQueryKey,
          produce(ships, (draft) => {
            draft.data[index].fuel = response.data.fuel
          }),
        )
      }

      setAgent(response.data.agent)
    },
  })

  return children({
    disabled: disabled || isMutating > 0 || isPending || ship.fuel.current === ship.fuel.capacity,
    execute: () => {
      return mutateAsync({ shipSymbol: ship.symbol })
    },
  })
}
