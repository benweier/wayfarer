import { useSurveyStore } from '@/store/surveys'
import { SurveyListTable } from './survey-list.table'
import { type SurveyListProps } from './survey-list.types'

export const SurveyList = ({ predicate = () => true }: SurveyListProps) => {
  const { surveys } = useSurveyStore((state) => {
    return {
      surveys: state.surveys.filter(predicate),
      removeSurvey: state.actions.removeSurvey,
    }
  })

  return <SurveyListTable data={surveys.map((survey) => ({ survey }))} />
}
