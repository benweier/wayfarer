import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { type Ref, forwardRef } from 'react'
import { createShipFlightModeMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type ShipResponse } from '@/types/spacetraders'
import { type ShipActionProps } from './ship-actions.types'

const FlightModeComponent = (
  { ship, disabled = false, flightMode, children }: ShipActionProps<{ flightMode: string }>,
  ref: Ref<HTMLButtonElement>,
) => {
  const client = useQueryClient()
  const isMutating = useIsMutating({
    mutationKey: [{ scope: 'ships', entity: 'item' }, { shipSymbol: ship.symbol }],
  })
  const { mutate } = useMutation({
    mutationKey: createShipFlightModeMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipFlightModeMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(getShipByIdQuery.getQueryKey({ shipSymbol }))
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(getShipListQuery.getQueryKey())
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          getShipByIdQuery.getQueryKey({ shipSymbol }),
          produce(ship, (draft) => {
            draft.data.nav = response.data
          }),
        )
      }
      if (ships && index > -1) {
        client.setQueryData(
          getShipListQuery.getQueryKey(),
          produce(ships, (draft) => {
            draft.data[index].nav = response.data
          }),
        )
      }
    },
  })

  return children({
    ref,
    disabled: disabled || isMutating > 0 || ship.fuel.capacity === 0 || ship.nav.status === 'IN_TRANSIT',
    onClick: () => {
      mutate({ shipSymbol: ship.symbol, flightMode })
    },
  })
}

export const FlightMode = forwardRef(FlightModeComponent)
