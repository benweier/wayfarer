import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { useSurveyStore } from '@/store/surveys'
import { type SurveyResponse } from '@/types/spacetraders'

export const Discard = ({ survey }: { survey: SurveyResponse }) => {
  const { t } = useTranslation()
  const removeSurvey = useSurveyStore((state) => state.actions.removeSurvey)

  return (
    <Button
      intent="danger"
      kind="flat"
      size="small"
      icon
      onClick={() => {
        removeSurvey(survey.signature)
      }}
      title={t('ship.action.discard_survey')}
    >
      <AppIcon id="trash" className="size-5" />
    </Button>
  )
}
