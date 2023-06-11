import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createShipRefuel } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useAuthStore } from '@/store/auth'
import { ShipResponse } from '@/types/spacetraders'
import { ShipActionProps } from './ship-actions.types'
import { updateShipFuel, updateShipInFleetFuel } from './ship-actions.utilities'

export const Refuel = ({
  ship,
  children = (props) => (
    <button className="btn btn-sm" {...props}>
      Refuel
    </button>
  ),
}: ShipActionProps) => {
  const { setAgent } = useAuthStore()
  const client = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'refuel'],
    mutationFn: (shipID: string) => createShipRefuel({ path: shipID }),
    onMutate: (shipID) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipID] })
    },
    onSuccess: (response, shipID) => {
      const fuel = response.data.fuel

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipID) ?? -1

      if (ship) client.setQueryData(['ship', shipID], updateShipFuel(ship, fuel))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetFuel(ships, index, fuel))
    },
    onSettled: (response, _err, shipID) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })

      if (response?.data.agent) {
        setAgent(response.data.agent)
      }
    },
  })

  return children({
    disabled: isLoading || ship.fuel.current === ship.fuel.capacity,
    onClick: () => mutate(ship.symbol),
  })
}
