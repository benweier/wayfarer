import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { Button } from '@/components/button'
import { createShipNavigateMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type ShipResponse } from '@/types/spacetraders'
import { type ShipActionProps } from './ship-actions.types'

export const Navigate = ({
  ship,
  waypointSymbol,
  disabled = false,
  children = (props) => (
    <Button size="small" {...props}>
      Navigate
    </Button>
  ),
}: ShipActionProps<{
  waypointSymbol: string
}>) => {
  const client = useQueryClient()
  const isMutating = useIsMutating({ mutationKey: getShipByIdQuery.getQueryKey({ shipSymbol: ship.symbol }) })
  const { mutate } = useMutation({
    mutationKey: createShipNavigateMutation.getMutationKey(),
    mutationFn: createShipNavigateMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(getShipByIdQuery.getQueryKey({ shipSymbol }))
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(getShipListQuery.getQueryKey())
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          getShipByIdQuery.getQueryKey({ shipSymbol }),
          produce(ship, (draft) => {
            draft.data.nav = response.data.nav
            draft.data.fuel = response.data.fuel
          }),
        )
      }

      if (ships && index > -1) {
        client.setQueryData(
          getShipListQuery.getQueryKey(),
          produce(ships, (draft) => {
            draft.data[index].nav = response.data.nav
            draft.data[index].fuel = response.data.fuel
          }),
        )
      }
    },
  })

  return children({
    disabled: disabled || isMutating > 0 || ship.nav.status !== 'IN_ORBIT',
    onClick: () => {
      mutate({ shipSymbol: ship.symbol, waypointSymbol })
    },
  })
}
