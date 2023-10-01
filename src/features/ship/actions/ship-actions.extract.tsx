import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipExtractMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { type SpaceTradersResponse } from '@/services/api/spacetraders/core'
import { useShipSurveyStore } from '@/store/ship'
import { type ShipResponse, type SurveyResponse } from '@/types/spacetraders'
import { type ShipActionProps } from './ship-actions.types'

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
  const hasCooldown = ship.cooldown.remainingSeconds > 0
  const { mutate, isPending } = useMutation({
    mutationKey: createShipExtractMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipExtractMutation.mutationFn,
    onMutate: ({ shipSymbol }) => {
      const ship = client.getQueryData<SpaceTradersResponse<ShipResponse>>(getShipByIdQuery.getQueryKey({ shipSymbol }))
      const ships = client.getQueryData<SpaceTradersResponse<ShipResponse[]>>(getShipListQuery.getQueryKey())

      return { ship, ships }
    },
    onSuccess: (response, { shipSymbol, survey }, ctx) => {
      if (survey) removeSurvey(survey.signature)

      const index = ctx?.ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ctx?.ship) {
        client.setQueryData(
          getShipByIdQuery.getQueryKey({ shipSymbol }),
          produce(ctx.ship, (draft) => {
            draft.data.cooldown = response.data.cooldown
            draft.data.cargo = response.data.cargo
          }),
        )
      }
      if (ctx?.ships && index > -1) {
        client.setQueryData(
          getShipListQuery.getQueryKey(),
          produce(ctx.ships, (draft) => {
            draft.data[index].cooldown = response.data.cooldown
            draft.data[index].cargo = response.data.cargo
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
