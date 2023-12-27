import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipExtractMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { useShipSurveyStore } from '@/store/ship'
import { type SurveyResponse } from '@/types/spacetraders'
import { type ShipActionProps } from './ship-actions.types'

export const Extract = ({
  ship,
  survey,
  children,
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

      const shipByIdQueryKey = getShipByIdQuery({ shipSymbol }).queryKey
      const shipListQueryKey = getShipListQuery().queryKey
      const ship = client.getQueryData(shipByIdQueryKey)
      const ships = client.getQueryData(shipListQueryKey)
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      if (ship) {
        client.setQueryData(
          shipByIdQueryKey,
          produce(ship, (draft) => {
            draft.data.cargo = response.data.cargo
            draft.data.cooldown = response.data.cooldown
          }),
        )
      }
      if (ships && index > -1) {
        client.setQueryData(
          shipListQueryKey,
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
