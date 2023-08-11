import { useMutation } from '@tanstack/react-query'
import { createShipSurveyMutation } from '@/services/api/spacetraders'
import { useShipCooldownStore, useShipSurveyStore } from '@/store/ship'
import { type ShipActionProps } from './ship-actions.types'

export const Survey = ({
  ship,
  children = (props) => (
    <button className="btn btn-sm" {...props}>
      Survey
    </button>
  ),
}: ShipActionProps) => {
  const addSurvey = useShipSurveyStore((state) => state.addSurvey)
  const { hasCooldown, setCooldown } = useShipCooldownStore((state) => ({
    hasCooldown: state.cooldowns.has(ship.symbol),
    setCooldown: state.setCooldown,
  }))
  const { mutate, isPending } = useMutation({
    mutationKey: createShipSurveyMutation.getMutationKey({ shipSymbol: ship.symbol }),
    mutationFn: createShipSurveyMutation.mutationFn,
    onSuccess: (response, { shipSymbol }) => {
      const [survey] = response.data.surveys
      const cooldown = response.data.cooldown

      addSurvey(survey)
      setCooldown(shipSymbol, cooldown)
    },
  })

  return children({
    disabled: hasCooldown || isPending,
    onClick: () => {
      mutate({ shipSymbol: ship.symbol })
    },
  })
}
