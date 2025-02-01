import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { useSurveyStore } from '@/store/surveys'
import type { SurveyResponse } from '@/types/spacetraders'

export const Discard = ({ survey }: { survey: SurveyResponse }) => {
  const { t } = useTranslation()
  const removeSurvey = useSurveyStore((state) => state.actions.removeSurvey)

  return (
    <Button
      intent="danger"
      kind="solid"
      size="small"
      icon
      onClick={() => {
        removeSurvey(survey.signature)
      }}
      title={t('surveys.discard')}
    >
      <AppIcon id="trash" className="size-5" />
    </Button>
  )
}
