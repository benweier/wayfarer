import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { createShipSurveyMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders'
import { useSurveyStore } from '@/store/surveys'
import { type ShipActionProps } from './ship-actions.types'

export const Survey = ({ ship, disabled = false, children }: ShipActionProps) => {
  const client = useQueryClient()
  const shipByIdQueryKey = getShipByIdQuery({ shipSymbol: ship.symbol }).queryKey
  const shipListQueryKey = getShipListQuery().queryKey
  const isMutating = useIsMutating({ mutationKey: shipByIdQueryKey })
  const addSurveys = useSurveyStore((state) => state.actions.addSurveys)
  const hasCooldown = ship.cooldown.remainingSeconds > 0
  const { mutate, isPending } = useMutation({
    mutationKey: createShipSurveyMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipSurveyMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const ship = client.getQueryData(shipByIdQueryKey)
      const ships = client.getQueryData(shipListQueryKey)
      const index = ships?.data.findIndex((ship) => ship.symbol === shipSymbol) ?? -1

      addSurveys(response.data.surveys)

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
    disabled: disabled || isMutating > 0 || isPending || hasCooldown || ship.nav.status !== 'IN_ORBIT',
    onClick: () => {
      mutate({ shipSymbol: ship.symbol })
    },
  })
}
