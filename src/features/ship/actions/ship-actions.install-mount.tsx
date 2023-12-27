import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipInstallMountMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { useAuthStore } from '@/store/auth'
import { type ShipActionProps } from './ship-actions.types'

export const InstallMount = ({
  ship,
  mountSymbol,
  disabled = false,
  children,
}: ShipActionProps<{ mountSymbol: string }>) => {
  const setAgent = useAuthStore((state) => state.actions.setAgent)
  const client = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey: createShipInstallMountMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipInstallMountMutation.mutationFn,
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
    disabled: disabled || isPending || ship.fuel.current === ship.fuel.capacity,
    onClick: () => {
      mutate({ shipSymbol: ship.symbol, mountSymbol })
    },
  })
}
