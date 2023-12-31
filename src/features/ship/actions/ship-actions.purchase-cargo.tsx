import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipCargoPurchaseMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { useAuthStore } from '@/store/auth'
import { type ShipActionProps } from './ship-actions.types'

export const PurchaseCargo = ({
  ship,
  disabled = false,
  symbol,
  units,
  children,
}: ShipActionProps<{
  symbol: string
  units: number
}>) => {
  const setAgent = useAuthStore((state) => state.actions.setAgent)
  const client = useQueryClient()
  const shipByIdQueryKey = getShipByIdQuery({ shipSymbol: ship.symbol }).queryKey
  const shipListQueryKey = getShipListQuery().queryKey
  const isMutating = useIsMutating({ mutationKey: shipByIdQueryKey })
  const { mutate } = useMutation({
    mutationKey: createShipCargoPurchaseMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipCargoPurchaseMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData(shipByIdQueryKey)
      const ships = client.getQueryData(shipListQueryKey)
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          shipByIdQueryKey,
          produce(ship, (draft) => {
            draft.data.cargo = response.data.cargo
          }),
        )
      }
      if (ships && index > -1) {
        client.setQueryData(
          shipListQueryKey,
          produce(ships, (draft) => {
            draft.data[index].cargo = response.data.cargo
          }),
        )
      }

      setAgent(response.data.agent)
    },
  })

  return children({
    disabled: disabled || isMutating > 0,
    onClick: () => {
      mutate({ shipSymbol: ship.symbol, itemSymbol: symbol, units })
    },
  })
}
