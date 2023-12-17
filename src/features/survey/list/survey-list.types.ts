import { type ShipResponse, type SurveyResponse } from '@/types/spacetraders'

export type SurveyListProps = {
  ship: ShipResponse
}

export type SurveyListTableSchema = {
  survey: SurveyResponse
}

export type SurveyListTableProps = {
  data: SurveyListTableSchema[]
}
