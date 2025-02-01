import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { ShipNavStatus } from '@/config/spacetraders'
import { createShipRepairMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders/fleet'
import { useAuthStore } from '@/store/auth'
import type { ShipActionProps } from './ship-actions.types'

export const Repair = ({
  ship,
  disabled = false,
  children,
}: ShipActionProps<ReturnType<typeof createShipRepairMutation.mutationFn>>) => {
  const client = useQueryClient()
  const setAgent = useAuthStore((state) => state.actions.setAgent)
  const shipByIdQueryKey = getShipByIdQuery({ shipSymbol: ship.symbol }).queryKey
  const shipListQueryKey = getShipListQuery().queryKey
  const isMutating = useIsMutating({ mutationKey: shipByIdQueryKey })
  const { mutateAsync, isPending } = useMutation({
    mutationKey: createShipRepairMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipRepairMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData(shipByIdQueryKey)
      const ships = client.getQueryData(shipListQueryKey)
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          shipByIdQueryKey,
          produce(ship, (draft) => {
            draft.data = response.data.ship
          }),
        )
      }

      if (ships && index > -1) {
        client.setQueryData(
          shipListQueryKey,
          produce(ships, (draft) => {
            draft.data[index] = response.data.ship
          }),
        )
      }

      setAgent(response.data.agent)
    },
  })

  return children({
    disabled: disabled || isMutating > 0 || isPending || ship.nav.status !== ShipNavStatus.Docked,
    execute: () => {
      return mutateAsync({ shipSymbol: ship.symbol })
    },
  })
}
