import { useSurveyStore } from '@/store/surveys'
import { SurveyListTable } from './survey-list.table'
import type { SurveyListProps } from './survey-list.types'

export const SurveyList = ({ predicate = () => true }: SurveyListProps) => {
  const { surveys } = useSurveyStore()

  return <SurveyListTable data={surveys.filter(predicate).map((survey) => ({ survey }))} />
}
