import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { createShipOrbit } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { ShipResponse } from '@/types/spacetraders'
import { ShipActionProps } from './ship-actions.types'
import { updateShipInFleetNavStatus, updateShipNavStatus } from './ship-actions.utilities'

export const Orbit = ({
  ship,
  children = (props) => (
    <button className="btn btn-sm" {...props}>
      Orbit
    </button>
  ),
}: ShipActionProps) => {
  const client = useQueryClient()
  const isMutating = useIsMutating({ mutationKey: ['ship', ship.symbol], exact: false })
  const { mutate } = useMutation({
    mutationKey: ['ship', ship.symbol, 'orbit'],
    mutationFn: (shipID: string) => createShipOrbit({ path: { shipID } }),
    onMutate: (shipID) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipID] })

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipID) ?? -1

      if (ship) client.setQueryData(['ship', shipID], updateShipNavStatus(ship, 'UNDOCKING'))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetNavStatus(ships, index, 'UNDOCKING'))

      return { ship, ships }
    },
    onError: (_err, shipID, ctx) => {
      client.setQueryData(['ships'], ctx?.ships)
      client.setQueryData(['ship', shipID], ctx?.ship)
    },
    onSettled: (_res, _err, shipID) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })
    },
  })

  return children({
    disabled: isMutating > 0 || ship.nav.status !== 'DOCKED',
    onClick: () => {
      mutate(ship.symbol)
    },
  })
}
