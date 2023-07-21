import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipJump } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useShipCooldownStore } from '@/store/ship'
import { type ShipResponse } from '@/types/spacetraders'
import { type ShipActionProps } from './ship-actions.types'

export const Jump = ({
  ship,
  systemSymbol,
  children = (props) => (
    <button className="btn btn-sm" {...props}>
      Jump
    </button>
  ),
}: ShipActionProps<{
  systemSymbol: string
}>) => {
  const client = useQueryClient()
  const { hasCooldown, setCooldown } = useShipCooldownStore((state) => ({
    hasCooldown: !!state.cooldowns[ship.symbol],
    setCooldown: state.setCooldown,
  }))
  const { mutate, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'jump'],
    mutationFn: ({ shipSymbol, systemSymbol }: { shipSymbol: string; systemSymbol: string }) =>
      createShipJump({ path: { shipSymbol }, payload: { systemSymbol: systemSymbol } }),
    onMutate: ({ shipSymbol }) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipSymbol] })

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipSymbol])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      return { ship, ships }
    },
    onSuccess: (response, { shipSymbol }, ctx) => {
      const cooldown = response.data.cooldown
      setCooldown(shipSymbol, cooldown)

      const index = ctx?.ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ctx?.ship) {
        client.setQueryData(
          ['ship', shipSymbol],
          produce(ctx.ship, (draft) => {
            draft.data.nav = response.data.nav
          }),
        )
      }

      if (ctx?.ships && index > -1) {
        client.setQueryData(
          ['ships'],
          produce(ctx.ships, (draft) => {
            draft.data[index].nav = response.data.nav
          }),
        )
      }
    },
    onSettled: (_res, _err, { shipSymbol }) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipSymbol] })
    },
  })

  return children({
    disabled: hasCooldown || isLoading,
    onClick: () => {
      mutate({ shipSymbol: ship.symbol, systemSymbol })
    },
  })
}
