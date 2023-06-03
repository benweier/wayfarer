import { useMutation, useQueryClient } from '@tanstack/react-query'
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
import { createShipWarp } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { ShipResponse } from '@/types/spacetraders'
import { isRef } from '@/utilities/isRef'
import { updateShipFuel, updateShipInFleetFuel, updateShipInFleetNav, updateShipNav } from './ship-actions.utilities'

const WarpComponent = (
  {
    ship,
    waypointID,
    trigger = (props) => (
      <button className="btn btn-sm" {...props}>
        Warp
      </button>
    ),
  }: {
    ship: ShipResponse
    waypointID: string
    trigger?: ReactElement<ComponentPropsWithRef<'button'>> | FC<ComponentPropsWithRef<'button'>>
  },
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const client = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'extract'],
    mutationFn: ({ shipID, waypointID }: { shipID: string; waypointID: string }) =>
      createShipWarp({ path: shipID, payload: { waypointSymbol: waypointID } }),
    onMutate: ({ shipID }) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipID] })
    },
    onSuccess: (response, { shipID }) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipID) ?? -1

      if (ship) client.setQueryData(['ship', shipID], updateShipNav(ship, response.data.nav))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetNav(ships, index, response.data.nav))
      if (ship) client.setQueryData(['ship', shipID], updateShipFuel(ship, response.data.fuel))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetFuel(ships, index, response.data.fuel))
    },
    onSettled: (_res, _err, { shipID }) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })
    },
  })

  return isValidElement(trigger)
    ? cloneElement(trigger, {
        ref: isRef(ref) ? ref : undefined,
        disabled: trigger.props.disabled ?? isLoading,
        onClick: () => mutate({ shipID: ship.symbol, waypointID }),
      })
    : createElement(trigger, {
        ref: isRef(ref) ? ref : undefined,
        disabled: isLoading,
        onClick: () => mutate({ shipID: ship.symbol, waypointID }),
      })
}

export const Warp = forwardRef(WarpComponent)
