import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipSiphonMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type ShipAction } from './ship-actions.types'

export const Siphon = ({
  ship,
  disabled,
  children,
}: ShipAction<never, ReturnType<typeof createShipSiphonMutation.mutationFn>>) => {
  const client = useQueryClient()
  const hasCooldown = ship.cooldown.remainingSeconds > 0
  const shipByIdQueryKey = getShipByIdQuery({ shipSymbol: ship.symbol }).queryKey
  const shipListQueryKey = getShipListQuery().queryKey
  const isMutating = useIsMutating({ mutationKey: shipByIdQueryKey })
  const { mutateAsync, isPending } = useMutation({
    mutationKey: createShipSiphonMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipSiphonMutation.mutationFn,
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
            draft.data[index].cargo = response.data.cargo
            draft.data[index].cooldown = response.data.cooldown
          }),
        )
      }
    },
  })
  const canExecute = !disabled && !hasCooldown && isMutating === 0 && !isPending && ship.nav.status === 'IN_ORBIT'

  return children({
    disabled: !canExecute,
    execute: () => {
      if (!canExecute) {
        throw Promise.reject(new Error('Siphon action is disabled'))
      }

      return mutateAsync({ shipSymbol: ship.symbol })
    },
  })
}
