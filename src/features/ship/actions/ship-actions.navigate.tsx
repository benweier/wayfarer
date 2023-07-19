import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipNavigate } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { ShipResponse } from '@/types/spacetraders'
import { ShipActionProps } from './ship-actions.types'

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
  const isMutating = useIsMutating({ mutationKey: ['ship', ship.symbol], exact: false })
  const { mutate } = useMutation({
    mutationKey: ['ship', ship.symbol, 'navigate'],
    mutationFn: ({ shipSymbol, waypointSymbol }: { shipSymbol: string; waypointSymbol: string }) =>
      createShipNavigate({ path: { shipSymbol }, payload: { waypointSymbol: waypointSymbol } }),
    onMutate: ({ shipSymbol }) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipSymbol] })

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipSymbol])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      return { ship, ships }
    },
    onSuccess: (response, { shipSymbol }, ctx) => {
      const index = ctx?.ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ctx?.ship) {
        client.setQueryData(
          ['ship', shipSymbol],
          produce(ctx.ship, (draft) => {
            draft.data.nav = response.data.nav
          }),
        )
      }

      if (ctx?.ships && index > -1) {
        client.setQueryData(
          ['ships'],
          produce(ctx.ships, (draft) => {
            draft.data[index].nav = response.data.nav
          }),
        )
      }
    },
    onError: (_err, shipSymbol, ctx) => {
      client.setQueryData(['ship', shipSymbol], ctx?.ship)
      client.setQueryData(['ships'], ctx?.ships)
    },
    onSettled: (_res, _err, shipSymbol) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipSymbol] })
    },
  })

  return children({
    disabled: isMutating > 0 || ship.nav.status !== 'IN_ORBIT',
    onClick: () => mutate({ shipSymbol: ship.symbol, waypointSymbol }),
  })
}
