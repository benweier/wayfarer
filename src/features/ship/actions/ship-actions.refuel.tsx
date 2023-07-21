import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createShipRefuel } from '@/services/api/spacetraders'
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
  const { setAgent } = useAuthStore()
  const client = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'refuel'],
    mutationFn: (shipSymbol: string) => createShipRefuel({ path: { shipSymbol } }),
    onMutate: (shipSymbol) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipSymbol] })
    },
    onSuccess: (response, shipSymbol) => {
      const fuel = response.data.fuel

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipSymbol])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) client.setQueryData(['ship', shipSymbol], updateShipFuel(ship, fuel))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetFuel(ships, index, fuel))
    },
    onSettled: (response, _err, shipSymbol) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipSymbol] })

      if (response?.data.agent) {
        setAgent(response.data.agent)
      }
    },
  })

  return children({
    disabled: disabled || isLoading || ship.fuel.current === ship.fuel.capacity,
    onClick: () => {
      mutate(ship.symbol)
    },
  })
}
