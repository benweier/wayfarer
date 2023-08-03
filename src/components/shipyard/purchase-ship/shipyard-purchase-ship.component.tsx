import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type Ref, forwardRef } from 'react'
import { type ShipyardPurchaseShipProps } from '@/components/shipyard/purchase-ship/shipyard-purchase-ship.types'
import { createShipPurchaseMutation } from '@/services/api/spacetraders'
import { useAuthStore } from '@/store/auth'

const PurchaseShipComponent = (
  {
    ship,
    waypointSymbol,
    children = (props) => (
      <button className="btn btn-sm" {...props}>
        Buy Ship
      </button>
    ),
  }: ShipyardPurchaseShipProps,
  ref: Ref<HTMLButtonElement>,
) => {
  const client = useQueryClient()
  const credits = useAuthStore((state) => state.agent?.credits ?? 0)

  const { mutate, isPending } = useMutation({
    mutationKey: createShipPurchaseMutation.getMutationKey({ shipType: ship.type, waypointSymbol }),
    mutationFn: createShipPurchaseMutation.mutationFn,
    onSuccess: (_res, _err) => {
      void client.invalidateQueries({ queryKey: [{ scope: 'ships' }] })
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
