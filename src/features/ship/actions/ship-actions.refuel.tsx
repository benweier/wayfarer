import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createShipRefuelMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useAuthStore } from '@/store/auth'
import { type ShipResponse } from '@/types/spacetraders'
import { type ShipActionProps } from './ship-actions.types'
import { updateShipFuel, updateShipInFleetFuel } from './ship-actions.utilities'

export const Refuel = ({
  ship,
  disabled = false,
  children = (props) => (
    <button className="btn btn-sm" {...props}>
      Refuel
    </button>
  ),
}: ShipActionProps) => {
  const setAgent = useAuthStore((state) => state.actions.setAgent)
  const client = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey: createShipRefuelMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipRefuelMutation.mutationFn,
    onMutate: ({ shipSymbol }) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(getShipByIdQuery.getQueryKey({ shipSymbol }))
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(getShipListQuery.getQueryKey())

      return { ship, ships }
    },
    onSuccess: (response, { shipSymbol }, ctx) => {
      const fuel = response.data.fuel
      const index = ctx?.ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ctx?.ship) {
        client.setQueryData(getShipByIdQuery.getQueryKey({ shipSymbol }), updateShipFuel(ctx.ship, fuel))
      }
      if (ctx?.ships && index > -1) {
        client.setQueryData(getShipListQuery.getQueryKey(), updateShipInFleetFuel(ctx.ships, index, fuel))
      }

      setAgent(response.data.agent)
    },
  })

  return children({
    disabled: disabled || isPending || ship.fuel.current === ship.fuel.capacity,
    onClick: () => {
      mutate({ shipSymbol: ship.symbol })
    },
  })
}
