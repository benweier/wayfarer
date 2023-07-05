import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { createShipDock } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { ShipResponse } from '@/types/spacetraders'
import { ShipActionProps } from './ship-actions.types'
import { updateShipInFleetNavStatus, updateShipNavStatus } from './ship-actions.utilities'

export const Dock = ({
  ship,
  children = (props) => (
    <button className="btn btn-sm" {...props}>
      Dock
    </button>
  ),
}: ShipActionProps) => {
  const client = useQueryClient()
  const isMutating = useIsMutating({ mutationKey: ['ship', ship.symbol], exact: false })
  const { mutate } = useMutation({
    mutationKey: ['ship', ship.symbol, 'dock'],
    mutationFn: (shipID: string) => createShipDock({ path: { shipID } }),
    onMutate: (shipID) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipID) ?? -1

      if (ship) client.setQueryData(['ship', shipID], updateShipNavStatus(ship, 'DOCKED'))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetNavStatus(ships, index, 'DOCKED'))

      return { ship, ships }
    },
    onError: (_err, shipID, ctx) => {
      client.setQueryData(['ship', shipID], ctx?.ship)
      client.setQueryData(['ships'], ctx?.ships)
    },
    onSettled: (_res, _err, shipID) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })
    },
  })

  return children({
    disabled: isMutating > 0 || ship.nav.status !== 'IN_ORBIT',
    onClick: () => mutate(ship.symbol),
  })
}
