import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createShipRefineMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useShipCooldownStore } from '@/store/ship'
import { type ShipResponse } from '@/types/spacetraders'
import { type ShipActionProps } from './ship-actions.types'
import { updateShipCargo, updateShipInFleetCargo } from './ship-actions.utilities'

export const Refine = ({
  ship,
  produce,
  children = (props) => (
    <button className="btn btn-sm" {...props}>
      Refine
    </button>
  ),
}: ShipActionProps<{
  produce: string
}>) => {
  const client = useQueryClient()
  const { hasCooldown, setCooldown } = useShipCooldownStore((state) => ({
    hasCooldown: state.cooldowns.has(ship.symbol),
    setCooldown: state.setCooldown,
  }))
  const { mutate, isPending } = useMutation({
    mutationKey: createShipRefineMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipRefineMutation.mutationFn,
    onMutate: ({ shipSymbol }) => {
      void client.cancelQueries({ queryKey: [{ scope: 'ships' }] })

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(getShipByIdQuery.getQueryKey({ shipSymbol }))
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(getShipListQuery.getQueryKey())

      return { ship, ships }
    },
    onSuccess: (response, { shipSymbol }, ctx) => {
      const cooldown = response.data.cooldown
      setCooldown(shipSymbol, cooldown)

      const index = ctx?.ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ctx?.ship) {
        client.setQueryData(
          getShipByIdQuery.getQueryKey({ shipSymbol }),
          updateShipCargo(ctx.ship, response.data.cargo),
        )
      }
      if (ctx?.ships && index > -1) {
        client.setQueryData(
          getShipListQuery.getQueryKey(),
          updateShipInFleetCargo(ctx.ships, index, response.data.cargo),
        )
      }
    },
    onSettled: (_res, _err) => {
      void client.invalidateQueries({ queryKey: [{ scope: 'ships' }] })
    },
  })

  return children({
    disabled: hasCooldown || isPending,
    onClick: () => {
      mutate({ shipSymbol: ship.symbol, produce })
    },
  })
}
