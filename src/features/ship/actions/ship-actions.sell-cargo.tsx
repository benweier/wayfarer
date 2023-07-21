import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createShipCargoSell } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
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
  const client = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'cargo', 'sell'],
    mutationFn: ({ shipSymbol, symbol, units }: { shipSymbol: string; symbol: string; units: number }) =>
      createShipCargoSell({ path: { shipSymbol }, payload: { symbol, units } }),
    onMutate: ({ shipSymbol }) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipSymbol] })
    },
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipSymbol])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) client.setQueryData(['ship', shipSymbol], updateShipCargo(ship, response.data.cargo))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetCargo(ships, index, response.data.cargo))
    },
    onSettled: (_res, _err, { shipSymbol }) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipSymbol] })
    },
  })

  return children({
    disabled: isLoading,
    onClick: () => {
      mutate({ shipSymbol: ship.symbol, symbol, units })
    },
  })
}
