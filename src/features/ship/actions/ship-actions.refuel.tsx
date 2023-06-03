import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ComponentPropsWithRef,
  FC,
  ForwardedRef,
  ReactElement,
  cloneElement,
  createElement,
  isValidElement,
} from 'react'
import { createShipRefuel } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useAuthStore } from '@/store/auth'
import { ShipResponse } from '@/types/spacetraders'
import { isRef } from '@/utilities/isRef'
import { updateShipFuel, updateShipInFleetFuel } from './ship-actions.utilities'

export const Refuel = (
  {
    ship,
    trigger = (props) => (
      <button className="btn btn-sm" {...props}>
        Refuel
      </button>
    ),
  }: {
    ship: ShipResponse
    trigger?: ReactElement<ComponentPropsWithRef<'button'>> | FC<ComponentPropsWithRef<'button'>>
  },
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const { setAgent } = useAuthStore()
  const client = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'refuel'],
    mutationFn: (shipID: string) => createShipRefuel({ path: shipID }),
    onMutate: (shipID) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipID] })
    },
    onSuccess: (response, shipID) => {
      const fuel = response.data.fuel

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipID) ?? -1

      if (ship) client.setQueryData(['ship', shipID], updateShipFuel(ship, fuel))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetFuel(ships, index, fuel))
    },
    onSettled: (response, _err, shipID) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })

      if (response?.data.agent) {
        setAgent(response.data.agent)
      }
    },
  })

  const disabled = isLoading || ship.fuel.current === ship.fuel.capacity

  return isValidElement(trigger)
    ? cloneElement(trigger, {
        ref: isRef(ref) ? ref : undefined,
        disabled: trigger.props.disabled ?? disabled,
        onClick: () => mutate(ship.symbol),
      })
    : createElement(trigger, {
        ref: isRef(ref) ? ref : undefined,
        disabled: disabled,
        onClick: () => mutate(ship.symbol),
      })
}
