import { Actions, Cooldown } from '@/components/Ship'
import { useShipSurveyStore } from '@/services/store/ship.survey'
import { ShipResponse } from '@/types/spacetraders'

const List = () => {
  const { surveys, removeSurvey } = useShipSurveyStore((state) => ({
    surveys: state.surveys,
    removeSurvey: state.removeSurvey,
  }))

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
      {surveys.map((survey) => {
        return (
          <div
            key={survey.signature}
            className="grid gap-2 rounded bg-zinc-500 bg-opacity-5 py-3 px-4 dark:bg-opacity-10"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold" onClick={() => removeSurvey(survey.signature)}>
                {survey.size}
              </span>
            </div>
            <div className="text-secondary text-sm">{survey.expiration}</div>
          </div>
        )
      })}
    </div>
  )
}

export const Survey = ({ ship }: { ship: ShipResponse }) => {
  return (
    <div className="grid gap-4">
      <div className="flex flex-col items-center justify-center gap-4 rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
        <Actions.Survey
          ship={ship}
          trigger={<button className="btn btn-primary">Survey {ship.nav.waypointSymbol}</button>}
        />
        <div className="w-full max-w-xs">
          <Cooldown ship={ship} />
        </div>
      </div>

      <List />
    </div>
  )
}
