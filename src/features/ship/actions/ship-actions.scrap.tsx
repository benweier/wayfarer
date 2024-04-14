import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipScrapMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { useAuthStore } from '@/store/auth'
import { type ShipActionProps } from './ship-actions.types'

export const Scrap = ({
  ship,
  disabled = false,
  children,
}: ShipActionProps<ReturnType<typeof createShipScrapMutation.mutationFn>>) => {
  const client = useQueryClient()
  const setAgent = useAuthStore((state) => state.actions.setAgent)
  const shipByIdQueryKey = getShipByIdQuery({ shipSymbol: ship.symbol }).queryKey
  const shipListQueryKey = getShipListQuery().queryKey
  const isMutating = useIsMutating({ mutationKey: shipByIdQueryKey })
  const { mutateAsync, isPending } = useMutation({
    mutationKey: createShipScrapMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipScrapMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData(shipByIdQueryKey)
      const ships = client.getQueryData(shipListQueryKey)
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.removeQueries({ queryKey: shipByIdQueryKey })
      }

      if (ships && index > -1) {
        client.setQueryData(
          shipListQueryKey,
          produce(ships, (draft) => {
            delete draft.data[index]
          }),
        )
      }

      setAgent(response.data.agent)
    },
  })

  return children({
    disabled: disabled || isMutating > 0 || isPending || ship.nav.status !== 'DOCKED',
    execute: () => {
      return mutateAsync({ shipSymbol: ship.symbol })
    },
  })
}
