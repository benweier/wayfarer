import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { Button } from '@/components/button'
import { createShipCargoPurchaseMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useAuthStore } from '@/store/auth'
import { type ShipResponse } from '@/types/spacetraders'
import { type ShipActionProps } from './ship-actions.types'

export const PurchaseCargo = ({
  ship,
  symbol,
  units,
  children = (props) => (
    <Button size="small" {...props}>
      Purchase
    </Button>
  ),
}: ShipActionProps<{
  symbol: string
  units: number
}>) => {
  const setAgent = useAuthStore((state) => state.actions.setAgent)
  const client = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey: createShipCargoPurchaseMutation.getMutationKey(),
    mutationFn: createShipCargoPurchaseMutation.mutationFn,
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
