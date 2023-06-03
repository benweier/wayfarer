import { useMutation } from '@tanstack/react-query'
import {
  ComponentPropsWithRef,
  FC,
  ForwardedRef,
  ReactElement,
  cloneElement,
  createElement,
  forwardRef,
  isValidElement,
} from 'react'
import { createShipSurvey } from '@/services/api/spacetraders'
import { useShipCooldownStore, useShipSurveyStore } from '@/store/ship'
import { ShipResponse } from '@/types/spacetraders'
import { isRef } from '@/utilities/isRef'

const SurveyComponent = (
  {
    ship,
    trigger = (props) => (
      <button className="btn btn-sm" {...props}>
        Survey
      </button>
    ),
  }: {
    ship: ShipResponse
    trigger?: ReactElement<ComponentPropsWithRef<'button'>> | FC<ComponentPropsWithRef<'button'>>
  },
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const addSurvey = useShipSurveyStore((state) => state.addSurvey)
  const { hasCooldown, setCooldown } = useShipCooldownStore((state) => ({
    hasCooldown: !!state.cooldowns[ship.symbol],
    setCooldown: state.setCooldown,
  }))
  const { mutate, isLoading } = useMutation({
    mutationKey: ['ship', ship.symbol, 'survey'],
    mutationFn: (shipID: string) => createShipSurvey({ path: shipID }),
    onSuccess: (response, shipID) => {
      const [survey] = response.data.surveys
      const cooldown = response.data.cooldown
      if (survey) addSurvey(survey)
      setCooldown(shipID, cooldown)
    },
  })

  return isValidElement(trigger)
    ? cloneElement(trigger, {
        ref: isRef(ref) ? ref : undefined,
        disabled: trigger.props.disabled ?? (hasCooldown || isLoading),
        onClick: () => mutate(ship.symbol),
      })
    : createElement(trigger, {
        ref: isRef(ref) ? ref : undefined,
        disabled: hasCooldown || isLoading,
        onClick: () => mutate(ship.symbol),
      })
}

export const Survey = forwardRef(SurveyComponent)
