import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipJumpMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type ShipActionProps } from './ship-actions.types'

export const Jump = ({
  ship,
  systemSymbol,
  disabled = false,
  children,
}: ShipActionProps<{
  systemSymbol: string
}>) => {
  const client = useQueryClient()
  const hasCooldown = ship.cooldown.remainingSeconds > 0
  const shipByIdQueryKey = getShipByIdQuery({ shipSymbol: ship.symbol }).queryKey
  const shipListQueryKey = getShipListQuery().queryKey
  const isMutating = useIsMutating({ mutationKey: shipByIdQueryKey })
  const { mutate, isPending } = useMutation({
    mutationKey: createShipJumpMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipJumpMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData(shipByIdQueryKey)
      const ships = client.getQueryData(shipListQueryKey)
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          shipByIdQueryKey,
          produce(ship, (draft) => {
            draft.data.nav = response.data.nav
            draft.data.cooldown = response.data.cooldown
          }),
        )
      }

      if (ships && index > -1) {
        client.setQueryData(
          shipListQueryKey,
          produce(ships, (draft) => {
            draft.data[index].nav = response.data.nav
            draft.data[index].cooldown = response.data.cooldown
          }),
        )
      }
    },
  })

  return children({
    disabled: disabled || hasCooldown || isMutating > 0 || isPending,
    onClick: () => {
      mutate({ shipSymbol: ship.symbol, systemSymbol })
    },
  })
}
