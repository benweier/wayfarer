import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createShipExtractMutation } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useShipCooldownStore, useShipSurveyStore } from '@/store/ship'
import { type ShipResponse, type SurveyResponse } from '@/types/spacetraders'
import { type ShipActionProps } from './ship-actions.types'
import { updateShipCargo, updateShipInFleetCargo } from './ship-actions.utilities'

export const Extract = ({
  ship,
  survey,
  children = (props) => (
    <button className="btn btn-sm" {...props}>
      Extract
    </button>
  ),
}: ShipActionProps<{
  survey?: SurveyResponse
}>) => {
  const client = useQueryClient()
  const removeSurvey = useShipSurveyStore((state) => state.removeSurvey)
  const { hasCooldown, setCooldown } = useShipCooldownStore((state) => ({
    hasCooldown: state.cooldowns.has(ship.symbol),
    setCooldown: state.setCooldown,
  }))
  const { mutate, isPending } = useMutation({
    mutationKey: createShipExtractMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipExtractMutation.mutationFn,
    onMutate: ({ shipSymbol }) => {
      void client.cancelQueries({ queryKey: [{ scope: 'ships' }] })

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipSymbol])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      return { ship, ships }
    },
    onSuccess: (response, { shipSymbol, survey }, ctx) => {
      if (survey) removeSurvey(survey.signature)
      const cooldown = response.data.cooldown
      setCooldown(shipSymbol, cooldown)

      const index = ctx?.ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ctx?.ship) {
        client.setQueryData(['ship', shipSymbol], updateShipCargo(ctx.ship, response.data.cargo))
      }
      if (ctx?.ships && index > -1) {
        client.setQueryData(['ships'], updateShipInFleetCargo(ctx.ships, index, response.data.cargo))
      }
    },
    onSettled: (_res, _err) => {
      void client.invalidateQueries({ queryKey: [{ scope: 'ships' }] })
    },
  })

  return children({
    disabled: hasCooldown || isPending,
    onClick: () => {
      mutate({ shipSymbol: ship.symbol, survey })
    },
  })
}
