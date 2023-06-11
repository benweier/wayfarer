import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createShipJump } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useShipCooldownStore } from '@/store/ship'
import { ShipResponse } from '@/types/spacetraders'
import { ShipActionProps } from './ship-actions.types'
import { updateShipInFleetNav, updateShipNav } from './ship-actions.utilities'

export const Jump = ({
  ship,
  systemID,
  children = (props) => (
    <button className="btn btn-sm" {...props}>
      Jump
    </button>
  ),
}: ShipActionProps<{
  systemID: string
}>) => {
  const client = useQueryClient()
  const { hasCooldown, setCooldown } = useShipCooldownStore((state) => ({
    hasCooldown: !!state.cooldowns[ship.symbol],
    setCooldown: state.setCooldown,
  }))
  const { mutate, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'extract'],
    mutationFn: ({ shipID, systemID }: { shipID: string; systemID: string }) =>
      createShipJump({ path: shipID, payload: { systemSymbol: systemID } }),
    onMutate: ({ shipID }) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipID] })
    },
    onSuccess: (response, { shipID }) => {
      const cooldown = response.data.cooldown
      setCooldown(shipID, cooldown)

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipID])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipID) ?? -1

      if (ship) client.setQueryData(['ship', shipID], updateShipNav(ship, response.data.nav))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetNav(ships, index, response.data.nav))
    },
    onSettled: (_res, _err, { shipID }) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipID] })
    },
  })

  return children({
    disabled: hasCooldown || isLoading,
    onClick: () => mutate({ shipID: ship.symbol, systemID }),
  })
}
