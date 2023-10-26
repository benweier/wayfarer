import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { Button } from '@/components/button'
import { createShipRefuelMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useAuthStore } from '@/store/auth'
import { type ShipResponse } from '@/types/spacetraders'
import { type ShipActionProps } from './ship-actions.types'

export const Refuel = ({
  ship,
  disabled = false,
  children = (props) => (
    <Button size="small" {...props}>
      Refuel
    </Button>
  ),
}: ShipActionProps) => {
  const setAgent = useAuthStore((state) => state.actions.setAgent)
  const client = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey: createShipRefuelMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipRefuelMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(getShipByIdQuery.getQueryKey({ shipSymbol }))
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(getShipListQuery.getQueryKey())
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          getShipByIdQuery.getQueryKey({ shipSymbol }),
          produce(ship, (draft) => {
            draft.data.fuel = response.data.fuel
          }),
        )
      }
      if (ships && index > -1) {
        client.setQueryData(
          getShipListQuery.getQueryKey(),
          produce(ships, (draft) => {
            draft.data[index].fuel = response.data.fuel
          }),
        )
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
