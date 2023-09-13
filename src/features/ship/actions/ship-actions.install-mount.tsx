import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipInstallMountMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useAuthStore } from '@/store/auth'
import { type ShipResponse } from '@/types/spacetraders'
import { type ShipActionProps } from './ship-actions.types'

export const InstallMount = ({
  ship,
  mountSymbol,
  disabled = false,
  children = (props) => (
    <button className="btn btn-sm" {...props}>
      Install
    </button>
  ),
}: ShipActionProps<{ mountSymbol: string }>) => {
  const setAgent = useAuthStore((state) => state.actions.setAgent)
  const client = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey: createShipInstallMountMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipInstallMountMutation.mutationFn,
    onMutate: ({ shipSymbol }) => {
      void client.cancelQueries({ queryKey: [{ scope: 'ships' }] })

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(getShipByIdQuery.getQueryKey({ shipSymbol }))
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(getShipListQuery.getQueryKey())

      return { ship, ships }
    },
    onSuccess: (response, { shipSymbol }, ctx) => {
      const cargo = response.data.cargo
      const mounts = response.data.mounts
      const index = ctx?.ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ctx?.ship) {
        client.setQueryData(
          getShipByIdQuery.getQueryKey({ shipSymbol }),
          produce<SpaceTradersResponse<ShipResponse>>((draft) => {
            draft.data.cargo = cargo
            draft.data.mounts = mounts
          }),
        )
      }
      if (ctx?.ships && index > -1) {
        client.setQueryData(
          getShipListQuery.getQueryKey(),
          produce<SpaceTradersResponse<ShipResponse[]>>((draft) => {
            draft.data[index].cargo = cargo
            draft.data[index].mounts = mounts
          }),
        )
      }
    },
    onError: (_err, { shipSymbol }, ctx) => {
      const index = ctx?.ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ctx?.ship) {
        client.setQueryData(
          getShipByIdQuery.getQueryKey({ shipSymbol }),
          produce<SpaceTradersResponse<ShipResponse>>((draft) => {
            if (!ctx.ship?.data) return

            draft.data.cargo = ctx.ship.data.cargo
            draft.data.mounts = ctx.ship.data.mounts
          }),
        )
      }
      if (ctx?.ships && index > -1) {
        client.setQueryData(
          getShipListQuery.getQueryKey(),
          produce<SpaceTradersResponse<ShipResponse[]>>((draft) => {
            if (!ctx.ships?.data[index]) return

            draft.data[index].cargo = ctx.ships.data[index].cargo
            draft.data[index].mounts = ctx.ships.data[index].mounts
          }),
        )
      }
    },
    onSettled: (response, _err) => {
      void client.invalidateQueries({ queryKey: [{ scope: 'ships' }] })

      if (response?.data.agent) {
        setAgent(response.data.agent)
      }
    },
  })

  return children({
    disabled: disabled || isPending || ship.fuel.current === ship.fuel.capacity,
    onClick: () => {
      mutate({ shipSymbol: ship.symbol, mountSymbol })
    },
  })
}
