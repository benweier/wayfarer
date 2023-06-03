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
import { createShipRefine } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useShipCooldownStore } from '@/store/ship'
import { ShipResponse } from '@/types/spacetraders'
import { isRef } from '@/utilities/isRef'
import { updateShipCargo, updateShipInFleetCargo } from './ship-actions.utilities'

const RefineComponent = (
  {
    ship,
    produce,
    trigger = (props) => (
      <button className="btn btn-sm" {...props}>
        Refine
      </button>
    ),
  }: {
    ship: ShipResponse
    produce: string
    trigger?: ReactElement<ComponentPropsWithRef<'button'>> | FC<ComponentPropsWithRef<'button'>>
  },
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const client = useQueryClient()
  const { hasCooldown, setCooldown } = useShipCooldownStore((state) => ({
    hasCooldown: !!state.cooldowns[ship.symbol],
    setCooldown: state.setCooldown,
  }))
  const { mutate, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'extract'],
    mutationFn: ({ shipID, produce }: { shipID: string; produce: string }) =>
      createShipRefine({ path: shipID, payload: { produce } }),
    onMutate: ({ shipID }) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipID] })
    },
    onSuccess: (response, { shipID }) => {
      const cooldown = response.data.cooldown
      setCooldown(shipID, cooldown)

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipID) ?? -1

      if (ship) client.setQueryData(['ship', shipID], updateShipCargo(ship, response.data.cargo))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetCargo(ships, index, response.data.cargo))
    },
    onSettled: (_res, _err, { shipID }) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })
    },
  })

  return isValidElement(trigger)
    ? cloneElement(trigger, {
        ref: isRef(ref) ? ref : undefined,
        disabled: trigger.props.disabled ?? (hasCooldown || isLoading),
        onClick: () => mutate({ shipID: ship.symbol, produce }),
      })
    : createElement(trigger, {
        ref: isRef(ref) ? ref : undefined,
        disabled: hasCooldown || isLoading,
        onClick: () => mutate({ shipID: ship.symbol, produce }),
      })
}

export const Refine = forwardRef(RefineComponent)
