import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { type Ref, forwardRef } from 'react'
import { createShipOrbit } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type ShipResponse } from '@/types/spacetraders'
import { type ShipActionProps } from './ship-actions.types'
import { updateShipInFleetNavStatus, updateShipNavStatus } from './ship-actions.utilities'

const OrbitComponent = (
  {
    ship,
    children = (props) => (
      <button className="btn btn-sm" {...props}>
        Orbit
      </button>
    ),
  }: ShipActionProps,
  ref: Ref<HTMLButtonElement>,
) => {
  const client = useQueryClient()
  const isMutating = useIsMutating({ mutationKey: ['ship', ship.symbol], exact: false })
  const { mutate } = useMutation({
    mutationKey: ['ship', ship.symbol, 'orbit'],
    mutationFn: (shipSymbol: string) => createShipOrbit({ path: { shipSymbol } }),
    onMutate: (shipSymbol) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipSymbol] })

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipSymbol])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) client.setQueryData(['ship', shipSymbol], updateShipNavStatus(ship, 'UNDOCKING'))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetNavStatus(ships, index, 'UNDOCKING'))

      return { ship, ships }
    },
    onError: (_err, shipSymbol, ctx) => {
      client.setQueryData(['ships'], ctx?.ships)
      client.setQueryData(['ship', shipSymbol], ctx?.ship)
    },
    onSettled: (_res, _err, shipSymbol) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipSymbol] })
    },
  })

  return children({
    ref,
    disabled: isMutating > 0 || ship.nav.status !== 'DOCKED',
    onClick: () => {
      mutate(ship.symbol)
    },
  })
}

export const Orbit = forwardRef(OrbitComponent)
