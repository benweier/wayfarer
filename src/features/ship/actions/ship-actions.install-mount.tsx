import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipInstallMountMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { useAuthStore } from '@/store/auth'
import { type ShipActionProps } from './ship-actions.types'

export const InstallMount = ({
  ship,
  mountSymbol,
  disabled = false,
  children,
}: ShipActionProps<ReturnType<typeof createShipInstallMountMutation.mutationFn>, { mountSymbol: string }>) => {
  const setAgent = useAuthStore((state) => state.actions.setAgent)
  const client = useQueryClient()
  const shipByIdQueryKey = getShipByIdQuery({ shipSymbol: ship.symbol }).queryKey
  const shipListQueryKey = getShipListQuery().queryKey
  const isMutating = useIsMutating({ mutationKey: shipByIdQueryKey })
  const { mutateAsync, isPending } = useMutation({
    mutationKey: createShipInstallMountMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipInstallMountMutation.mutationFn,
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
    disabled: disabled || isMutating > 0 || isPending || ship.fuel.current === ship.fuel.capacity,
    execute: () => {
      return mutateAsync({ shipSymbol: ship.symbol, mountSymbol })
    },
  })
}
