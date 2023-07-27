import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createShipJettisonMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type ShipResponse } from '@/types/spacetraders'
import { type ShipActionProps } from './ship-actions.types'
import { updateShipCargo, updateShipInFleetCargo } from './ship-actions.utilities'

export const Jettison = ({
  ship,
  symbol,
  units,
  children = (props) => (
    <button className="btn btn-outline btn-danger btn-sm" {...props}>
      Jettison
    </button>
  ),
}: ShipActionProps<{
  symbol: string
  units: number
}>) => {
  const client = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey: createShipJettisonMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipJettisonMutation.mutationFn,
    onMutate: ({ shipSymbol }) => {
      void client.cancelQueries({ queryKey: [{ scope: 'ships' }] })

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(getShipByIdQuery.getQueryKey({ shipSymbol }))
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(getShipListQuery.getQueryKey())

      return { ship, ships }
    },
    onSuccess: (response, { shipSymbol }, ctx) => {
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
    disabled: isPending,
    onClick: () => {
      mutate({ shipSymbol: ship.symbol, itemSymbol: symbol, units })
    },
  })
}
