import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { type ReactNode, type Ref, type RefAttributes } from 'react'
import { createShipTransferCargoMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type CargoInventory, type ShipResponse } from '@/types/spacetraders'

type TransferCargoActionProps<OnClickArgs = never, R = unknown, T = unknown> = {
  ship: ShipResponse
  item: CargoInventory
  disabled?: boolean
  children: (
    args: RefAttributes<HTMLButtonElement> & {
      disabled: boolean
      execute: (...args: OnClickArgs[]) => R
    },
  ) => ReactNode
} & T

export const TransferCargo = (
  {
    ship,
    disabled = false,
    children = () => null,
  }: TransferCargoActionProps<
    {
      toShipSymbol: string
      symbol: string
      units: number
    },
    ReturnType<typeof createShipTransferCargoMutation.mutationFn>
  >,
  ref: Ref<HTMLButtonElement>,
) => {
  const client = useQueryClient()
  const shipByIdQueryKey = getShipByIdQuery({ shipSymbol: ship.symbol }).queryKey
  const shipListQueryKey = getShipListQuery().queryKey
  const isMutating = useIsMutating({ mutationKey: shipByIdQueryKey })
  const { mutateAsync } = useMutation({
    mutationKey: createShipTransferCargoMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipTransferCargoMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData(shipByIdQueryKey)
      const ships = client.getQueryData(shipListQueryKey)
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol.to) ?? -1

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
  })

  return children({
    ref,
    disabled: disabled || isMutating > 0,
    execute: ({ toShipSymbol, symbol, units }) => {
      return mutateAsync({
        shipSymbol: {
          from: ship.symbol,
          to: toShipSymbol,
        },
        itemSymbol: symbol,
        units: units,
      })
    },
  })
}
