import { useShipResponse } from '@/context/ship.context'
import * as ShipActions from '@/features/ship/actions'
import { ShipCooldown } from '@/features/ship/cooldown'
import { ShipSurveyList } from './ship-survey-list.component'

export const ShipSurveyExtract = () => {
  const ship = useShipResponse()

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center gap-4 rounded border-2 border-dashed border-zinc-300 px-3 py-9 dark:border-zinc-600">
        <div className="flex gap-2">
          <ShipActions.Survey ship={ship}>
            {(props) => (
              <button className="btn btn-primary" {...props}>
                Survey {ship.nav.waypointSymbol}
              </button>
            )}
          </ShipActions.Survey>

          <ShipActions.Extract ship={ship}>
            {(props) => (
              <button className="btn btn-confirm" {...props}>
                Extract without Survey
              </button>
            )}
          </ShipActions.Extract>
        </div>
        <div className="w-full max-w-xs">
          <ShipCooldown ship={ship} />
        </div>
      </div>

      <ShipSurveyList ship={ship} />
    </div>
  )
}
