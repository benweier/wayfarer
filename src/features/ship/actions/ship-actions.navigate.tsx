import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipNavigateMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type ShipResponse } from '@/types/spacetraders'
import { type ShipActionProps } from './ship-actions.types'

export const Navigate = ({
  ship,
  waypointSymbol,
  children = (props) => (
    <button className="btn btn-sm" {...props}>
      Navigate
    </button>
  ),
}: ShipActionProps<{
  waypointSymbol: string
}>) => {
  const client = useQueryClient()
  const isMutating = useIsMutating({ mutationKey: getShipByIdQuery.getQueryKey({ shipSymbol: ship.symbol }) })
  const { mutate } = useMutation({
    mutationKey: createShipNavigateMutation.getMutationKey(),
    mutationFn: createShipNavigateMutation.mutationFn,
    onMutate: ({ shipSymbol }) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(getShipByIdQuery.getQueryKey({ shipSymbol }))
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(getShipListQuery.getQueryKey())

      return { ship, ships }
    },
    onSuccess: (response, { shipSymbol }, ctx) => {
      const index = ctx?.ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ctx?.ship) {
        client.setQueryData(
          getShipByIdQuery.getQueryKey({ shipSymbol }),
          produce(ctx.ship, (draft) => {
            draft.data.nav = response.data.nav
          }),
        )
      }

      if (ctx?.ships && index > -1) {
        client.setQueryData(
          getShipListQuery.getQueryKey(),
          produce(ctx.ships, (draft) => {
            draft.data[index].nav = response.data.nav
          }),
        )
      }
    },
    onError: (_err, { shipSymbol }, ctx) => {
      client.setQueryData(getShipByIdQuery.getQueryKey({ shipSymbol }), ctx?.ship)
      client.setQueryData(getShipListQuery.getQueryKey(), ctx?.ships)
    },
  })

  return children({
    disabled: isMutating > 0 || ship.nav.status !== 'IN_ORBIT',
    onClick: () => {
      mutate({ shipSymbol: ship.symbol, waypointSymbol })
    },
  })
}
