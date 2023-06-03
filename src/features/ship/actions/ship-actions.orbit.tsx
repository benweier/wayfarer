import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ComponentPropsWithRef,
  FC,
  ForwardedRef,
  ReactElement,
  cloneElement,
  createElement,
  forwardRef,
  isValidElement,
} from 'react'
import { createShipOrbit } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { ShipResponse } from '@/types/spacetraders'
import { isRef } from '@/utilities/isRef'
import { updateShipInFleetNavStatus, updateShipNavStatus } from './ship-actions.utilities'

const OrbitComponent = (
  {
    ship,
    trigger = (props) => (
      <button className="btn btn-sm" {...props}>
        Orbit
      </button>
    ),
  }: {
    ship: ShipResponse
    trigger?: ReactElement<ComponentPropsWithRef<'button'>> | FC<ComponentPropsWithRef<'button'>>
  },
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const client = useQueryClient()
  const isMutating = useIsMutating({ mutationKey: ['ship', ship.symbol], exact: false })
  const { mutate } = useMutation({
    mutationKey: ['ship', ship.symbol, 'orbit'],
    mutationFn: (shipID: string) => createShipOrbit({ path: shipID }),
    onMutate: (shipID) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipID] })

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipID) ?? -1

      if (ship) client.setQueryData(['ship', shipID], updateShipNavStatus(ship, 'IN_ORBIT'))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetNavStatus(ships, index, 'IN_ORBIT'))

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

  return isValidElement(trigger)
    ? cloneElement(trigger, {
        ref: isRef(ref) ? ref : undefined,
        disabled: trigger.props.disabled ?? (isMutating > 0 || ship.nav.status !== 'DOCKED'),
        onClick: () => mutate(ship.symbol),
      })
    : createElement(trigger, {
        ref: isRef(ref) ? ref : undefined,
        disabled: ship.nav.status !== 'DOCKED',
        onClick: () => mutate(ship.symbol),
      })
}

export const Orbit = forwardRef(OrbitComponent)
