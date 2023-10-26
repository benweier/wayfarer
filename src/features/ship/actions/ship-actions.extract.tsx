import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { Button } from '@/components/button'
import { createShipExtractMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useShipSurveyStore } from '@/store/ship'
import { type ShipResponse, type SurveyResponse } from '@/types/spacetraders'
import { type ShipActionProps } from './ship-actions.types'

export const Extract = ({
  ship,
  survey,
  children = (props) => (
    <Button size="small" {...props}>
      Extract
    </Button>
  ),
}: ShipActionProps<{
  survey?: SurveyResponse
}>) => {
  const client = useQueryClient()
  const removeSurvey = useShipSurveyStore((state) => state.removeSurvey)
  const hasCooldown = ship.cooldown.remainingSeconds > 0
  const { mutate, isPending } = useMutation({
    mutationKey: createShipExtractMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipExtractMutation.mutationFn,
    onSuccess: (response, { shipSymbol, survey }) => {
      if (survey) removeSurvey(survey.signature)

      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(getShipByIdQuery.getQueryKey({ shipSymbol }))
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(getShipListQuery.getQueryKey())
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          getShipByIdQuery.getQueryKey({ shipSymbol }),
          produce(ship, (draft) => {
            draft.data.cargo = response.data.cargo
            draft.data.cooldown = response.data.cooldown
          }),
        )
      }
      if (ships && index > -1) {
        client.setQueryData(
          getShipListQuery.getQueryKey(),
          produce(ships, (draft) => {
            draft.data[index].cargo = response.data.cargo
            draft.data[index].cooldown = response.data.cooldown
          }),
        )
      }
    },
  })

  return children({
    disabled: hasCooldown || isPending,
    onClick: () => {
      mutate({ shipSymbol: ship.symbol, survey })
    },
  })
}
