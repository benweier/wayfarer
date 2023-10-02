import * as ShipActions from '@/features/ship/actions'
import { ShipSurveyItem } from '@/features/ship/survey-extract/ship-survey-item.component'
import { useShipSurveyStore } from '@/store/ship'
import { type ShipResponse } from '@/types/spacetraders'

export const ShipSurveyList = ({ ship }: { ship: ShipResponse }) => {
  const { surveys, removeSurvey } = useShipSurveyStore((state) => ({
    surveys: state.surveys.filter((survey) => {
      return survey.signature.includes(ship.nav.waypointSymbol)
    }),
    removeSurvey: state.removeSurvey,
  }))

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
      {surveys.map((survey) => {
        return (
          <ShipSurveyItem key={survey.signature} survey={survey}>
            <div className="grid gap-2">
              <ShipActions.Extract ship={ship} survey={survey}>
                {(props) => (
                  <button className="btn btn-confirm" {...props}>
                    Extract
                  </button>
                )}
              </ShipActions.Extract>
              <button
                className="btn btn-flat btn-danger"
                onClick={() => {
                  removeSurvey(survey.signature)
                }}
              >
                Discard
              </button>
            </div>
          </ShipSurveyItem>
        )
      })}
    </div>
  )
}
