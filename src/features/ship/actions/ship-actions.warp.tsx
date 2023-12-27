import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipWarpMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type ShipActionProps } from './ship-actions.types'

export const Warp = ({
  ship,
  waypointSymbol,
  children,
}: ShipActionProps<{
  waypointSymbol: string
}>) => {
  const client = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey: createShipWarpMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipWarpMutation.mutationFn,
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
            draft.data.nav = response.data.nav
            draft.data.fuel = response.data.fuel
          }),
        )
      }

      if (ships && index > -1) {
        client.setQueryData(
          shipListQueryKey,
          produce(ships, (draft) => {
            draft.data[index].nav = response.data.nav
            draft.data[index].fuel = response.data.fuel
          }),
        )
      }
    },
  })

  return children({
    disabled: isPending,
    onClick: () => {
      mutate({ shipSymbol: ship.symbol, waypointSymbol })
    },
  })
}
