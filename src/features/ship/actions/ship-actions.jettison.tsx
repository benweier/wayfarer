import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createShipJettison } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { ShipResponse } from '@/types/spacetraders'
import { ShipActionProps } from './ship-actions.types'
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
  const { mutate, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'extract'],
    mutationFn: ({ shipID, symbol, units }: { shipID: string; symbol: string; units: number }) =>
      createShipJettison({ path: { shipID }, payload: { symbol, units } }),
    onMutate: ({ shipID }) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipID] })
    },
    onSuccess: (response, { shipID }) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipID) ?? -1

      if (ship) client.setQueryData(['ship', shipID], updateShipCargo(ship, response.data.cargo))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetCargo(ships, index, response.data.cargo))
    },
    onSettled: (_res, _err, { shipID }) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })
    },
  })

  return children({
    disabled: isLoading,
    onClick: () => mutate({ shipID: ship.symbol, symbol, units }),
  })
}
