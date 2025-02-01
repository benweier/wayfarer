import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipJettisonMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders/fleet'
import type { ShipActionProps } from './ship-actions.types'

export const Jettison = ({
  ship,
  symbol,
  units,
  disabled = false,
  onDone,
  children,
}: ShipActionProps<
  ReturnType<typeof createShipJettisonMutation.mutationFn>,
  {
    symbol: string
    units: number
    onDone?: () => void
  }
>) => {
  const client = useQueryClient()
  const shipByIdQueryKey = getShipByIdQuery({ shipSymbol: ship.symbol }).queryKey
  const shipListQueryKey = getShipListQuery().queryKey
  const isMutating = useIsMutating({ mutationKey: shipByIdQueryKey })
  const { mutateAsync, isPending } = useMutation({
    mutationKey: createShipJettisonMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipJettisonMutation.mutationFn,
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
    },
    onSettled: () => {
      onDone?.()
    },
  })

  return children({
    disabled: disabled || isMutating > 0 || isPending,
    execute: () => {
      return mutateAsync({ shipSymbol: ship.symbol, itemSymbol: symbol, units })
    },
  })
}
