import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { useShipResponse } from '@/context/ship.context'
import * as ShipActions from '@/features/ship/actions'
import { type SurveyResponse } from '@/types/spacetraders'

export const Extract = ({ survey }: { survey: SurveyResponse }) => {
  const { t } = useTranslation()
  const ship = useShipResponse()

  return (
    <ShipActions.Extract ship={ship} survey={survey}>
      {({ disabled, execute }) => (
        <Button intent="info" disabled={disabled} onClick={() => execute()}>
          {t('ship.action.extract', { context: 'with_survey' })}
        </Button>
      )}
    </ShipActions.Extract>
  )
}
