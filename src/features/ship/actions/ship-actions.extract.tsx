import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createShipExtract } from '@/services/api/spacetraders'
import { SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useShipCooldownStore, useShipSurveyStore } from '@/store/ship'
import { ShipResponse, SurveyResponse } from '@/types/spacetraders'
import { ShipActionProps } from './ship-actions.types'
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
    hasCooldown: !!state.cooldowns[ship.symbol],
    setCooldown: state.setCooldown,
  }))
  const { mutate, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'extract'],
    mutationFn: ({ shipSymbol, survey }: { shipSymbol: string; survey?: SurveyResponse }) =>
      createShipExtract({ path: { shipSymbol }, payload: { survey } }),
    onMutate: ({ shipSymbol }) => {
      void client.cancelQueries({ queryKey: ['ships'] })
      void client.cancelQueries({ queryKey: ['ship', shipSymbol] })
    },
    onSuccess: (response, { shipSymbol, survey }) => {
      if (survey) removeSurvey(survey.signature)
      const cooldown = response.data.cooldown
      setCooldown(shipSymbol, cooldown)

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(['ship', shipSymbol])
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(['ships'])

      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) client.setQueryData(['ship', shipSymbol], updateShipCargo(ship, response.data.cargo))
      if (ships && index > -1) client.setQueryData(['ships'], updateShipInFleetCargo(ships, index, response.data.cargo))
    },
    onSettled: (_res, _err, { shipSymbol }) => {
      void client.invalidateQueries({ queryKey: ['ships'] })
      void client.invalidateQueries({ queryKey: ['ship', shipSymbol] })
    },
  })

  return children({
    disabled: hasCooldown || isLoading,
    onClick: () => mutate({ shipSymbol: ship.symbol, survey }),
  })
}
