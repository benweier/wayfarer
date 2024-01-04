import { useShipSurveyStore } from '@/store/ship'
import { SurveyListTable } from './survey-list.table'
import { type SurveyListProps } from './survey-list.types'

export const SurveyList = ({ predicate = () => true }: SurveyListProps) => {
  const { surveys } = useShipSurveyStore((state) => ({
    surveys: state.surveys.filter(predicate),
    removeSurvey: state.removeSurvey,
  }))

  return <SurveyListTable data={surveys.map((survey) => ({ survey }))} />
}
