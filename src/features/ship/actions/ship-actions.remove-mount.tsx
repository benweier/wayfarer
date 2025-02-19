import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipRemoveMountMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders/fleet'
import { useAuthStore } from '@/store/auth'
import type { ShipActionProps } from './ship-actions.types'

export const RemoveMount = ({
  ship,
  mountSymbol,
  disabled = false,
  children,
}: ShipActionProps<ReturnType<typeof createShipRemoveMountMutation.mutationFn>, { mountSymbol: string }>) => {
  const setAgent = useAuthStore((state) => state.actions.setAgent)
  const client = useQueryClient()
  const shipByIdQueryKey = getShipByIdQuery({ shipSymbol: ship.symbol }).queryKey
  const shipListQueryKey = getShipListQuery().queryKey
  const isMutating = useIsMutating({ mutationKey: shipByIdQueryKey })
  const { mutateAsync, isPending } = useMutation({
    mutationKey: createShipRemoveMountMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipRemoveMountMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData(shipByIdQueryKey)
      const ships = client.getQueryData(shipListQueryKey)
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          shipByIdQueryKey,
          produce(ship, (draft) => {
            draft.data.cargo = response.data.cargo
            draft.data.mounts = response.data.mounts
          }),
        )
      }
      if (ships && index > -1) {
        client.setQueryData(
          shipListQueryKey,
          produce(ships, (draft) => {
            draft.data[index].cargo = response.data.cargo
            draft.data[index].mounts = response.data.mounts
          }),
        )
      }

      setAgent(response.data.agent)
    },
  })

  return children({
    disabled: disabled || isMutating > 0 || isPending,
    execute: () => {
      return mutateAsync({ shipSymbol: ship.symbol, mountSymbol })
    },
  })
}
