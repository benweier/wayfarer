import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipDockMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type ShipActionProps } from './ship-actions.types'

export const Dock = ({
  ship,
  disabled = false,
  children,
}: ShipActionProps<ReturnType<typeof createShipDockMutation.mutationFn>>) => {
  const client = useQueryClient()
  const shipByIdQueryKey = getShipByIdQuery({ shipSymbol: ship.symbol }).queryKey
  const shipListQueryKey = getShipListQuery().queryKey
  const isMutating = useIsMutating({ mutationKey: shipByIdQueryKey })
  const { mutateAsync, isPending } = useMutation({
    mutationKey: createShipDockMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipDockMutation.mutationFn,
    onMutate: ({ shipSymbol }) => {
      const ship = client.getQueryData(shipByIdQueryKey)
      const ships = client.getQueryData(shipListQueryKey)
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          shipByIdQueryKey,
          produce(ship, (draft) => {
            draft.data.nav.status = 'DOCKING'
          }),
        )
      }
      if (ships && index > -1) {
        client.setQueryData(
          shipListQueryKey,
          produce(ships, (draft) => {
            draft.data[index].nav.status = 'DOCKING'
          }),
        )
      }

      return { ship, ships }
    },
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData(shipByIdQueryKey)
      const ships = client.getQueryData(shipListQueryKey)
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          shipByIdQueryKey,
          produce(ship, (draft) => {
            draft.data.nav = response.data.nav
          }),
        )
      }

      if (ships && index > -1) {
        client.setQueryData(
          shipListQueryKey,
          produce(ships, (draft) => {
            draft.data[index].nav = response.data.nav
          }),
        )
      }
    },
    onError: (_err, _variables, ctx) => {
      client.setQueryData(shipByIdQueryKey, ctx?.ship)
      client.setQueryData(shipListQueryKey, ctx?.ships)
    },
  })

  return children({
    disabled: disabled || isMutating > 0 || isPending || ship.nav.status !== 'IN_ORBIT',
    execute: () => {
      return mutateAsync({ shipSymbol: ship.symbol })
    },
  })
}
