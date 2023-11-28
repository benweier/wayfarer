import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipRemoveMountMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useAuthStore } from '@/store/auth'
import { type ShipResponse } from '@/types/spacetraders'
import { type ShipActionProps } from './ship-actions.types'

export const RemoveMount = ({
  ship,
  mountSymbol,
  disabled = false,
  children,
}: ShipActionProps<{ mountSymbol: string }>) => {
  const setAgent = useAuthStore((state) => state.actions.setAgent)
  const client = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey: createShipRemoveMountMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipRemoveMountMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(getShipByIdQuery.getQueryKey({ shipSymbol }))
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(getShipListQuery.getQueryKey())
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          getShipByIdQuery.getQueryKey({ shipSymbol }),
          produce<SpaceTradersResponse<ShipResponse>>(ship, (draft) => {
            draft.data.cargo = response.data.cargo
            draft.data.mounts = response.data.mounts
          }),
        )
      }
      if (ships && index > -1) {
        client.setQueryData(
          getShipListQuery.getQueryKey(),
          produce<SpaceTradersResponse<ShipResponse[]>>(ships, (draft) => {
            draft.data[index].cargo = response.data.cargo
            draft.data[index].mounts = response.data.mounts
          }),
        )
      }

      setAgent(response.data.agent)
    },
  })

  return children({
    disabled: disabled || isPending,
    onClick: () => {
      mutate({ shipSymbol: ship.symbol, mountSymbol })
    },
  })
}
