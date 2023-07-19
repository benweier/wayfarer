import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { Ref, forwardRef } from 'react'
import { createShipDock } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { ShipResponse } from '@/types/spacetraders'
import { ShipActionProps } from './ship-actions.types'
import { updateShipInFleetNavStatus, updateShipNavStatus } from './ship-actions.utilities'

const DockComponent = (
  {
    ship,
    children = (props) => (
      <button className="btn btn-sm" {...props}>
        Dock
      </button>
    ),
  }: ShipActionProps,
  ref: Ref<HTMLButtonElement>,
) => {
  const client = useQueryClient()
  const isMutating = useIsMutating({ mutationKey: ['ship', ship.symbol], exact: false })
  const { mutate } = useMutation({
    mutationKey: ['ship', ship.symbol, 'dock'],
    mutationFn: (shipSymbol: string) => createShipDock({ path: { shipSymbol } }),
    onMutate: (shipSymbol) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipSymbol])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) client.setQueryData(['ship', shipSymbol], updateShipNavStatus(ship, 'DOCKING'))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetNavStatus(ships, index, 'DOCKING'))

      return { ship, ships }
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
    ref,
    disabled: isMutating > 0 || ship.nav.status !== 'IN_ORBIT',
    onClick: () => mutate(ship.symbol),
  })
}

export const Dock = forwardRef(DockComponent)
