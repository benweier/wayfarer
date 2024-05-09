import { Button } from '@/components/button'
import { createShipPurchaseMutation, getShipListQuery } from '@/services/api/spacetraders/fleet'
import { useAuthStore } from '@/store/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { type Ref, forwardRef } from 'react'
import type { ShipyardPurchaseShipProps } from './shipyard-purchase-ship.types'

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
  const client = useQueryClient()
  const { isAuthenticated, agent, actions } = useAuthStore()
  const { mutate, isPending } = useMutation({
    mutationKey: createShipPurchaseMutation.getMutationKey(),
    mutationFn: createShipPurchaseMutation.mutationFn,
    onSuccess: (response) => {
      const ships = client.getQueryData(getShipListQuery().queryKey)

      if (ships !== undefined) {
        client.setQueryData(
          getShipListQuery().queryKey,
          produce(ships, (draft) => {
            draft.data.push(response.data.ship)
          }),
        )
      }
      actions.setAgent(response.data.agent)
    },
  })

  const credits = isAuthenticated ? agent.credits : 0

  return children({
    ref,
    disabled: isPending || credits < ship.purchasePrice,
    onClick: () => {
      mutate({ shipType: ship.type, waypointSymbol })
    },
  })
}

export const ShipyardPurchaseShip = forwardRef(PurchaseShipComponent)
