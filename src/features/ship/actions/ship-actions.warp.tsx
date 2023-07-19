import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipWarp } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { ShipResponse } from '@/types/spacetraders'
import { ShipActionProps } from './ship-actions.types'

export const Warp = ({
  ship,
  waypointID,
  children = (props) => (
    <button className="btn btn-sm" {...props}>
      Warp
    </button>
  ),
}: ShipActionProps<{
  waypointID: string
}>) => {
  const client = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'warp'],
    mutationFn: ({ shipSymbol, waypointID }: { shipSymbol: string; waypointID: string }) =>
      createShipWarp({ path: { shipSymbol }, payload: { waypointSymbol: waypointID } }),
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
            draft.data.fuel = response.data.fuel
          }),
        )
      }

      if (ctx?.ships && index > -1) {
        client.setQueryData(
          ['ships'],
          produce(ctx.ships, (draft) => {
            draft.data[index].nav = response.data.nav
            draft.data[index].fuel = response.data.fuel
          }),
        )
      }
    },
    onSettled: (_res, _err, { shipSymbol }) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipSymbol] })
    },
  })

  return children({
    disabled: isLoading,
    onClick: () => mutate({ shipSymbol: ship.symbol, waypointID }),
  })
}
