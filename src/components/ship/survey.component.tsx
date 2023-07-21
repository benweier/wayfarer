import { TRADE_SYMBOL } from '@/config/constants'
import { useShipContext } from '@/context/ship.context'
import * as ShipActions from '@/features/ship/actions'
import { useShipSurveyStore } from '@/store/ship'
import { type ShipResponse } from '@/types/spacetraders'
import { Cooldown } from './cooldown.component'

const List = ({ ship }: { ship: ShipResponse }) => {
  const { surveys, removeSurvey } = useShipSurveyStore((state) => ({
    surveys: state.surveys
      .filter((survey) => survey.signature.includes(ship.nav.waypointSymbol))
      .filter((survey) => {
        const expiration = new Date(survey.expiration)
        return expiration.getTime() > Date.now()
      }),
    removeSurvey: state.removeSurvey,
  }))

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
      {surveys.map((survey) => {
        const expiration = new Date(survey.expiration)

        return (
          <div
            key={survey.signature}
            className="flex flex-col gap-6 rounded bg-zinc-500 bg-opacity-5 px-4 py-3 dark:bg-opacity-10"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="font-semibold">{survey.signature}</div>
              <div className="text-secondary text-sm">{survey.size}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {survey.deposits.map((deposit, index) => (
                <div key={index} className="text-sm">
                  {TRADE_SYMBOL.get(deposit.symbol) ?? deposit.symbol}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                className="btn btn-outline btn-danger"
                onClick={() => {
                  removeSurvey(survey.signature)
                }}
              >
                Discard
              </button>
              <ShipActions.Extract ship={ship} survey={survey}>
                {(props) => (
                  <button className="btn btn-confirm" {...props}>
                    Extract
                  </button>
                )}
              </ShipActions.Extract>
            </div>
            <div className="px-2 text-center text-sm text-amber-600 dark:text-amber-400">
              Expires: {expiration.toLocaleDateString()} {expiration.toLocaleTimeString()}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export const Survey = () => {
  const ship = useShipContext()

  return (
    <div className="grid gap-4">
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
          <Cooldown ship={ship} />
        </div>
      </div>

      <List ship={ship} />
    </div>
  )
}
