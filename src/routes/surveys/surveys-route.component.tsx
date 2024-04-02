import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import * as SurveyActions from '@/features/survey/actions'
import { SurveyContext } from '@/features/survey/context'
import { SurveyList } from '@/features/survey/list'

const SURVEYS_CONTEXT = {
  Discard: SurveyActions.Discard,
}

export const SurveysRoute = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-4 p-4">
      <h1 className="display-md font-bold">{t('surveys.label')}</h1>

      <div>
        <QuerySuspenseBoundary>
          <SurveyContext.Provider value={SURVEYS_CONTEXT}>
            <SurveyList />
          </SurveyContext.Provider>
        </QuerySuspenseBoundary>
      </div>
    </div>
  )
}
