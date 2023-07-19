import { useMutation } from '@tanstack/react-query'
import { createShipSurvey } from '@/services/api/spacetraders'
import { useShipCooldownStore, useShipSurveyStore } from '@/store/ship'
import { ShipActionProps } from './ship-actions.types'

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
    hasCooldown: !!state.cooldowns[ship.symbol],
    setCooldown: state.setCooldown,
  }))
  const { mutate, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'survey'],
    mutationFn: (shipSymbol: string) => createShipSurvey({ path: { shipSymbol } }),
    onSuccess: (response, shipSymbol) => {
      const [survey] = response.data.surveys
      const cooldown = response.data.cooldown
      if (survey) addSurvey(survey)
      setCooldown(shipSymbol, cooldown)
    },
  })

  return children({
    disabled: hasCooldown || isLoading,
    onClick: () => mutate(ship.symbol),
  })
}
