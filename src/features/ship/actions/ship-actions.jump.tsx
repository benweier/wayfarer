import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { Button } from '@/components/button'
import { createShipJumpMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type ShipResponse } from '@/types/spacetraders'
import { type ShipActionProps } from './ship-actions.types'

export const Jump = ({
  ship,
  systemSymbol,
  children = (props) => (
    <Button size="small" {...props}>
      Jump
    </Button>
  ),
}: ShipActionProps<{
  systemSymbol: string
}>) => {
  const client = useQueryClient()
  const hasCooldown = ship.cooldown.remainingSeconds > 0
  const { mutate, isPending } = useMutation({
    mutationKey: createShipJumpMutation.getMutationKey(),
    mutationFn: createShipJumpMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(getShipByIdQuery.getQueryKey({ shipSymbol }))
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(getShipListQuery.getQueryKey())
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          getShipByIdQuery.getQueryKey({ shipSymbol }),
          produce(ship, (draft) => {
            draft.data.nav = response.data.nav
            draft.data.cooldown = response.data.cooldown
          }),
        )
      }

      if (ships && index > -1) {
        client.setQueryData(
          getShipListQuery.getQueryKey(),
          produce(ships, (draft) => {
            draft.data[index].nav = response.data.nav
            draft.data[index].cooldown = response.data.cooldown
          }),
        )
      }
    },
  })

  return children({
    disabled: hasCooldown || isPending,
    onClick: () => {
      mutate({ shipSymbol: ship.symbol, systemSymbol })
    },
  })
}
