import { useMutation } from '@tanstack/react-query'
import { type Ref, forwardRef } from 'react'
import { Button } from '@/components/button'
import { createShipPurchaseMutation } from '@/services/api/spacetraders'
import { useAuthStore } from '@/store/auth'
import { type ShipyardPurchaseShipProps } from './shipyard-purchase-ship.types'

const PurchaseShipComponent = (
  {
    ship,
    waypointSymbol,
    children = (props) => (
      <Button size="small" {...props}>
        Buy Ship
      </Button>
    ),
  }: ShipyardPurchaseShipProps,
  ref: Ref<HTMLButtonElement>,
) => {
  const setAgent = useAuthStore((state) => state.actions.setAgent)
  const credits = useAuthStore((state) => state.agent?.credits ?? 0)
  const { mutate, isPending } = useMutation({
    mutationKey: createShipPurchaseMutation.getMutationKey({ shipType: ship.type, waypointSymbol }),
    mutationFn: createShipPurchaseMutation.mutationFn,
    onSuccess: (response) => {
      setAgent(response.data.agent)
    },
  })

  return children({
    ref,
    disabled: isPending || credits < ship.purchasePrice,
    onClick: () => {
      mutate({ shipType: ship.type, waypointSymbol })
    },
  })
}

export const ShipyardPurchaseShip = forwardRef(PurchaseShipComponent)
