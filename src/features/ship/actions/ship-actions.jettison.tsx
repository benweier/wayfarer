import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { Button } from '@/components/button'
import { createShipJettisonMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type ShipResponse } from '@/types/spacetraders'
import { type ShipActionProps } from './ship-actions.types'

export const Jettison = ({
  ship,
  symbol,
  units,
  children = (props) => (
    <Button size="small" {...props}>
      Jettison
    </Button>
  ),
}: ShipActionProps<{
  symbol: string
  units: number
}>) => {
  const client = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey: createShipJettisonMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipJettisonMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(getShipByIdQuery.getQueryKey({ shipSymbol }))
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(getShipListQuery.getQueryKey())
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          getShipByIdQuery.getQueryKey({ shipSymbol }),
          produce(ship, (draft) => {
            draft.data.cargo = response.data.cargo
          }),
        )
      }
      if (ships && index > -1) {
        client.setQueryData(
          getShipListQuery.getQueryKey(),
          produce(ships, (draft) => {
            draft.data[index].cargo = response.data.cargo
          }),
        )
      }
    },
  })

  return children({
    disabled: isPending,
    onClick: () => {
      mutate({ shipSymbol: ship.symbol, itemSymbol: symbol, units })
    },
  })
}
