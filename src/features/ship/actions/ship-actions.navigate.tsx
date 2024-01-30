import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import {
  createShipNavigateMutation,
  getShipByIdQuery,
  getShipListQuery,
  getWaypointMarketQuery,
  getWaypointShipyardQuery,
} from '@/services/api/spacetraders'
import { type ShipActionProps } from './ship-actions.types'

export const Navigate = ({
  ship,
  waypointSymbol,
  disabled = false,
  children,
}: ShipActionProps<{
  waypointSymbol: string
}>) => {
  const client = useQueryClient()
  const shipByIdQueryKey = getShipByIdQuery({ shipSymbol: ship.symbol }).queryKey
  const shipListQueryKey = getShipListQuery().queryKey
  const isMutating = useIsMutating({ mutationKey: shipByIdQueryKey })
  const { mutateAsync, isPending } = useMutation({
    mutationKey: createShipNavigateMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipNavigateMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData(shipByIdQueryKey)
      const ships = client.getQueryData(shipListQueryKey)
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        // Remove market and shipyard queries only
        // if no ships are left at the waypoint
        if (ships?.data.every((s) => s.nav.waypointSymbol !== ship.data.nav.waypointSymbol)) {
          void client.removeQueries(
            getWaypointMarketQuery({
              systemSymbol: ship.data.nav.systemSymbol,
              waypointSymbol: ship.data.nav.waypointSymbol,
            }),
          )

          void client.removeQueries(
            getWaypointShipyardQuery({
              systemSymbol: ship.data.nav.systemSymbol,
              waypointSymbol: ship.data.nav.waypointSymbol,
            }),
          )
        }

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
    disabled: disabled || isMutating > 0 || isPending || ship.nav.status !== 'IN_ORBIT',
    onClick: () => {
      return mutateAsync({ shipSymbol: ship.symbol, waypointSymbol })
    },
  })
}
