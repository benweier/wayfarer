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
    mutationFn: (shipID: string) => createShipSurvey({ path: { shipID } }),
    onSuccess: (response, shipID) => {
      const [survey] = response.data.surveys
      const cooldown = response.data.cooldown
      if (survey) addSurvey(survey)
      setCooldown(shipID, cooldown)
    },
  })

  return children({
    disabled: hasCooldown || isLoading,
    onClick: () => mutate(ship.symbol),
  })
}
