import { useAuthStore } from '@/store/auth'
import { useSurveyStore } from '@/store/surveys'
import { SurveyListTable } from './survey-list.table'
import { type SurveyListProps } from './survey-list.types'

export const SurveyList = ({ predicate = () => true }: SurveyListProps) => {
  const { isAuthenticated, agent } = useAuthStore()
  const { surveys } = useSurveyStore((state) => {
    const surveys = isAuthenticated ? state.surveys[agent.symbol] : []

    return {
      surveys: surveys.filter(predicate),
      removeSurvey: state.actions.removeSurvey,
    }
  })

  return <SurveyListTable data={surveys.map((survey) => ({ survey }))} />
}
