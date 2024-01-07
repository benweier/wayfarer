import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import * as SurveyActions from '@/features/survey/actions'
import { SurveyContext } from '@/features/survey/context'
import { SurveyList } from '@/features/survey/list'

export const SurveysRoute = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-title">{t('surveys.label')}</h1>

      <QuerySuspenseBoundary>
        <SurveyContext.Provider
          value={{
            Discard: SurveyActions.Discard,
          }}
        >
          <SurveyList />
        </SurveyContext.Provider>
      </QuerySuspenseBoundary>
    </div>
  )
}
