import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { useShipSurveyStore } from '@/store/ship'
import { type SurveyResponse } from '@/types/spacetraders'

export const Discard = ({ survey }: { survey: SurveyResponse }) => {
  const { t } = useTranslation()
  const { removeSurvey } = useShipSurveyStore()

  return (
    <Button
      intent="danger"
      kind="flat"
      onClick={() => {
        removeSurvey(survey.signature)
      }}
      title={t('ship.action.discard_survey')}
    >
      <AppIcon id="trash" className="h-5 w-5" />
    </Button>
  )
}
