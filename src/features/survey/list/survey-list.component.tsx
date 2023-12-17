import * as SurveyActions from '@/features/survey/actions'
import { SurveyContext } from '@/features/survey/context'
import { useShipSurveyStore } from '@/store/ship'
import { type ShipResponse } from '@/types/spacetraders'
import { SurveyListTable } from './survey-list.table'

export const SurveyList = ({ ship }: { ship: ShipResponse }) => {
  const { surveys } = useShipSurveyStore((state) => ({
    surveys: state.surveys.filter((survey) => {
      return survey.symbol === ship.nav.waypointSymbol
    }),
    removeSurvey: state.removeSurvey,
  }))

  return (
    <SurveyContext.Provider
      value={{
        Extract: SurveyActions.Extract,
        Discard: SurveyActions.Discard,
      }}
    >
      <SurveyListTable data={surveys.map((survey) => ({ survey }))} />
    </SurveyContext.Provider>
  )
}
