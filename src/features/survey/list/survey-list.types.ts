import { type SurveyResponse } from '@/types/spacetraders'

export type SurveyListProps = {
  predicate?: (value: SurveyResponse, index: number, array: SurveyResponse[]) => boolean
}

export type SurveyListTableSchema = {
  survey: SurveyResponse
}

export type SurveyListTableProps = {
  data: SurveyListTableSchema[]
}
