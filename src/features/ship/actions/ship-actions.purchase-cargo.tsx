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
import { createShipCargoPurchase } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { ShipResponse } from '@/types/spacetraders'
import { isRef } from '@/utilities/isRef'
import { updateShipCargo, updateShipInFleetCargo } from './ship-actions.utilities'

const PurchaseCargoComponent = (
  {
    ship,
    symbol,
    units,
    trigger = (props) => (
      <button className="btn btn-confirm btn-outline btn-sm" {...props}>
        Purchase
      </button>
    ),
  }: {
    ship: ShipResponse
    symbol: string
    units: number
    trigger?: ReactElement<ComponentPropsWithRef<'button'>> | FC<ComponentPropsWithRef<'button'>>
  },
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const client = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'cargo', 'sell'],
    mutationFn: ({ shipID, symbol, units }: { shipID: string; symbol: string; units: number }) =>
      createShipCargoPurchase({ path: shipID, payload: { symbol, units } }),
    onMutate: ({ shipID }) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipID] })
    },
    onSuccess: (response, { shipID }) => {
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
        disabled: trigger.props.disabled ?? isLoading,
        onClick: () => mutate({ shipID: ship.symbol, symbol, units }),
      })
    : createElement(trigger, {
        ref: isRef(ref) ? ref : undefined,
        disabled: isLoading,
        onClick: () => mutate({ shipID: ship.symbol, symbol, units }),
      })
}

export const PurchaseCargo = forwardRef(PurchaseCargoComponent)
