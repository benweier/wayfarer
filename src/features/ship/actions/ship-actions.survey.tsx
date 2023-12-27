import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipSurveyMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { useShipSurveyStore } from '@/store/ship'
import { type ShipActionProps } from './ship-actions.types'

export const Survey = ({ ship, children }: ShipActionProps) => {
  const client = useQueryClient()
  const addSurvey = useShipSurveyStore((state) => state.addSurvey)
  const hasCooldown = ship.cooldown.remainingSeconds > 0
  const { mutate, isPending } = useMutation({
    mutationKey: createShipSurveyMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipSurveyMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const shipByIdQueryKey = getShipByIdQuery({ shipSymbol }).queryKey
      const shipListQueryKey = getShipListQuery().queryKey
      const ship = client.getQueryData(shipByIdQueryKey)
      const ships = client.getQueryData(shipListQueryKey)
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1
      const [survey] = response.data.surveys

      addSurvey(survey)

      if (ship) {
        client.setQueryData(
          shipByIdQueryKey,
          produce(ship, (draft) => {
            draft.data.cooldown = response.data.cooldown
          }),
        )
      }
      if (ships && index > -1) {
        client.setQueryData(
          shipListQueryKey,
          produce(ships, (draft) => {
            draft.data[index].cooldown = response.data.cooldown
          }),
        )
      }
    },
  })

  return children({
    disabled: hasCooldown || isPending,
    onClick: () => {
      mutate({ shipSymbol: ship.symbol })
    },
  })
}
