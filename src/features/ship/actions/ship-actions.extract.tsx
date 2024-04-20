import { createShipExtractMutation, getShipByIdQuery, getShipListQuery } from '@/services/api/spacetraders/fleet'
import { useSurveyStore } from '@/store/surveys'
import type { SurveyResponse } from '@/types/spacetraders'
import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import type { ShipActionProps } from './ship-actions.types'

export const Extract = ({
  ship,
  survey,
  disabled,
  children,
}: ShipActionProps<
  ReturnType<typeof createShipExtractMutation.mutationFn>,
  {
    survey?: SurveyResponse
  }
>) => {
  const client = useQueryClient()
  const removeSurvey = useSurveyStore((state) => state.actions.removeSurvey)
  const hasCooldown = ship.cooldown.remainingSeconds > 0
  const shipByIdQueryKey = getShipByIdQuery({ shipSymbol: ship.symbol }).queryKey
  const shipListQueryKey = getShipListQuery().queryKey
  const isMutating = useIsMutating({ mutationKey: shipByIdQueryKey })
  const { mutateAsync, isPending } = useMutation({
    mutationKey: createShipExtractMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipExtractMutation.mutationFn,
    onSuccess: (response, { shipSymbol, survey }) => {
      if (survey) removeSurvey(survey.signature)

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
    disabled: disabled || hasCooldown || isMutating > 0 || isPending || ship.nav.status !== 'IN_ORBIT',
    execute: () => {
      return mutateAsync({ shipSymbol: ship.symbol, survey })
    },
  })
}
