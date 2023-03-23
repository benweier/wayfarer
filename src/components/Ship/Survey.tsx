import { Actions, Cooldown } from '@/components/Ship'
import { TRADE_SYMBOL } from '@/config/constants'
import { useShipSurveyStore } from '@/services/store/ship.survey'
import { ShipResponse } from '@/types/spacetraders'

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
            className="flex flex-col gap-6 rounded bg-zinc-500 bg-opacity-5 py-3 px-4 dark:bg-opacity-10"
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
              <button className="btn btn-outline btn-danger" onClick={() => removeSurvey(survey.signature)}>
                Discard
              </button>
              <Actions.Extract
                ship={ship}
                survey={survey}
                trigger={<button className="btn btn-confirm">Extract</button>}
              />
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

      <List ship={ship} />
    </div>
  )
}
