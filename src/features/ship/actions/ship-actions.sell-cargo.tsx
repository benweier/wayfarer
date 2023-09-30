import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createShipCargoSellMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useAuthStore } from '@/store/auth'
import { type ShipResponse } from '@/types/spacetraders'
import { type ShipActionProps } from './ship-actions.types'
import { updateShipCargo, updateShipInFleetCargo } from './ship-actions.utilities'

export const SellCargo = ({
  ship,
  symbol,
  units,
  children = (props) => (
    <button className="btn btn-outline btn-confirm btn-sm" {...props}>
      Sell
    </button>
  ),
}: ShipActionProps<{
  symbol: string
  units: number
}>) => {
  const setAgent = useAuthStore((state) => state.actions.setAgent)
  const client = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey: createShipCargoSellMutation.getMutationKey(),
    mutationFn: createShipCargoSellMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(getShipByIdQuery.getQueryKey({ shipSymbol }))
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(getShipListQuery.getQueryKey())
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(getShipByIdQuery.getQueryKey({ shipSymbol }), updateShipCargo(ship, response.data.cargo))
      }
      if (ships && index > -1) {
        client.setQueryData(getShipListQuery.getQueryKey(), updateShipInFleetCargo(ships, index, response.data.cargo))
      }

      setAgent(response.data.agent)
    },
  })

  return children({
    disabled: isPending,
    onClick: () => {
      mutate({ shipSymbol: ship.symbol, itemSymbol: symbol, units })
    },
  })
}
