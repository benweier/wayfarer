import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipRefineMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type ShipActionProps } from './ship-actions.types'

export const Refine = ({
  ship,
  item,
  children,
}: ShipActionProps<{
  item: string
}>) => {
  const client = useQueryClient()
  const hasCooldown = ship.cooldown.remainingSeconds > 0
  const { mutate, isPending } = useMutation({
    mutationKey: createShipRefineMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipRefineMutation.mutationFn,
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
    disabled: hasCooldown || isPending,
    onClick: () => {
      mutate({ shipSymbol: ship.symbol, produce: item })
    },
  })
}
