import { createShipFlightModeMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import type { ShipActionProps } from './ship-actions.types'

export const FlightMode = ({
  ship,
  disabled = false,
  flightMode,
  children,
}: ShipActionProps<ReturnType<typeof createShipFlightModeMutation.mutationFn>, { flightMode: string }>) => {
  const client = useQueryClient()
  const shipByIdQueryKey = getShipByIdQuery({ shipSymbol: ship.symbol }).queryKey
  const shipListQueryKey = getShipListQuery().queryKey
  const isMutating = useIsMutating({ mutationKey: shipByIdQueryKey })
  const { mutateAsync, isPending } = useMutation({
    mutationKey: createShipFlightModeMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipFlightModeMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData(shipByIdQueryKey)
      const ships = client.getQueryData(shipListQueryKey)
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          shipByIdQueryKey,
          produce(ship, (draft) => {
            draft.data.nav = response.data
          }),
        )
      }
      if (ships && index > -1) {
        client.setQueryData(
          shipListQueryKey,
          produce(ships, (draft) => {
            draft.data[index].nav = response.data
          }),
        )
      }
    },
  })

  return children({
    disabled: disabled || isMutating > 0 || isPending || ship.fuel.capacity === 0 || ship.nav.status === 'IN_TRANSIT',
    execute: () => {
      return mutateAsync({ shipSymbol: ship.symbol, flightMode })
    },
  })
}
