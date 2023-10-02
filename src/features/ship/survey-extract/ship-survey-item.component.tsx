import { type PropsWithChildren } from 'react'
import { TRADE_SYMBOL } from '@/config/constants'
import { type SurveyResponse } from '@/types/spacetraders'

export const ShipSurveyItem = ({ survey, children }: PropsWithChildren<{ survey: SurveyResponse }>) => {
  const expiration = new Date(survey.expiration)

  return (
    <div className="flex flex-col gap-4 rounded bg-zinc-500 bg-opacity-5 px-4 py-3 dark:bg-opacity-10">
      <div className="flex items-center justify-between gap-4">
        <div className="font-semibold">{survey.signature}</div>
        <div className="text-secondary text-sm">{survey.size}</div>
      </div>

      <div className="space-y-1">
        <div className="text-sm">Survey Results</div>
        <div className="grid grid-cols-2 gap-1 rounded bg-zinc-950/5 px-3 py-2 dark:bg-zinc-950/20">
          {survey.deposits.map((deposit, index) => (
            <div key={index} className="text-sm">
              {TRADE_SYMBOL.get(deposit.symbol)}
            </div>
          ))}
        </div>
      </div>

      {children}

      <div className="px-2 text-center text-sm text-amber-600 dark:text-amber-400">
        Expires: {expiration.toLocaleDateString()} {expiration.toLocaleTimeString()}
      </div>
    </div>
  )
}
