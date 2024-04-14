import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { type ShipActionProps } from '@/features/ship/actions/ship-actions.types'
import { createShipTransferCargoMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type Meta, type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { type CargoInventory, type ShipResponse } from '@/types/spacetraders'

export const TransferCargo = ({
  ship,
  disabled = false,
  children = () => null,
}: ShipActionProps<
  ReturnType<typeof createShipTransferCargoMutation.mutationFn>,
  { item: CargoInventory },
  {
    toShipSymbol: string
    symbol: string
    units: number
  }
>) => {
  const client = useQueryClient()
  const fromShipQueryKey = getShipByIdQuery({ shipSymbol: ship.symbol }).queryKey
  const shipListQueryKey = getShipListQuery().queryKey
  const isMutating = useIsMutating({ mutationKey: fromShipQueryKey })
  const { mutateAsync } = useMutation({
    mutationKey: createShipTransferCargoMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipTransferCargoMutation.mutationFn,
    onSuccess: (response, { shipSymbol, itemSymbol, units }) => {
      const fromShipQueryKey = getShipByIdQuery({ shipSymbol: shipSymbol.from }).queryKey
      const toShipQueryKey = getShipByIdQuery({ shipSymbol: shipSymbol.to }).queryKey
      // Get query data for each ship from cache
      const fromShip = client.getQueryData(fromShipQueryKey)
      const toShip = client.getQueryData(toShipQueryKey)
      const ships = client.getQueryData(shipListQueryKey)
      // Get index of each ship in the ship list
      const fromShipIndex = ships?.data.findIndex((ship) => ship.symbol === shipSymbol.from) ?? -1
      const toShipIndex = ships?.data.findIndex((ship) => ship.symbol === shipSymbol.to) ?? -1
      // Will need the source item of the cargo being transferred
      const fromShipCargoItem = fromShip?.data.cargo.inventory.find((item) => item.symbol === itemSymbol)

      // Update the source ship cargo
      if (fromShip) {
        client.setQueryData(
          fromShipQueryKey,
          produce(fromShip, (draft) => {
            draft.data.cargo = response.data.cargo
          }),
        )
      }
      // Update the destination ship cargo
      if (toShip && fromShipCargoItem) {
        // Find an existing item in the destination ship cargo
        const toShipItemIndex = toShip.data.cargo.inventory.findIndex((item) => item.symbol === itemSymbol)

        client.setQueryData(
          toShipQueryKey,
          produce(toShip, (draft) => {
            draft.data.cargo.units = toShip.data.cargo.units + units

            if (toShipItemIndex > -1) {
              // If the item exists in the destination ship cargo, update the units
              draft.data.cargo.inventory[toShipItemIndex].units =
                toShip.data.cargo.inventory[toShipItemIndex].units + units
            } else {
              // Otherwise, add a new item to the destination ship cargo using the source ship item
              draft.data.cargo.inventory.push({
                symbol: fromShipCargoItem.symbol,
                name: fromShipCargoItem.name,
                description: fromShipCargoItem.description,
                units: units,
              })
            }
          }),
        )
      }

      if (!ships) return

      if (fromShipIndex > -1) {
        // Update the source ship cargo object
        client.setQueryData(
          shipListQueryKey,
          produce<SpaceTradersResponse<ShipResponse[], Meta>>((draft) => {
            draft.data[fromShipIndex].cargo = response.data.cargo
          }),
        )
      }
      if (toShipIndex === -1 || !fromShipCargoItem) return

      const toShipItemIndex = ships.data[toShipIndex].cargo.inventory.findIndex((item) => item.symbol === itemSymbol)

      // Update the destination ship cargo units
      client.setQueryData(
        shipListQueryKey,
        produce<SpaceTradersResponse<ShipResponse[], Meta>>((draft) => {
          draft.data[toShipIndex].cargo.units = ships.data[toShipIndex].cargo.units + units

          if (toShipItemIndex > -1) {
            // If the item exists in the destination ship cargo, update the units
            draft.data[toShipIndex].cargo.inventory[toShipItemIndex].units =
              ships.data[toShipIndex].cargo.inventory[toShipItemIndex].units + units
          } else {
            // Otherwise, add a new item to the destination ship cargo using the source ship item
            draft.data[toShipIndex].cargo.inventory.push({
              symbol: fromShipCargoItem.symbol,
              name: fromShipCargoItem.name,
              description: fromShipCargoItem.description,
              units: units,
            })
          }
        }),
      )

      // Python probably has a way better way to do this...
    },
  })

  return children({
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
