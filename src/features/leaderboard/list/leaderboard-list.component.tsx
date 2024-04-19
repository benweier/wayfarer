import * as Tabs from '@/components/tabs'
import { getStatusQuery } from '@/services/api/spacetraders/status'
import { formatNumber } from '@/utilities/number.helper'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const LeaderboardList = () => {
  const { t } = useTranslation()
  const { data } = useSuspenseQuery(getStatusQuery())
  const leaderboards = data.leaderboards

  return (
    <Tabs.Root defaultValue="most_credits">
      <Tabs.List>
        <Tabs.Trigger value="most_credits">{t('leaderboard.most_credits')}</Tabs.Trigger>
        <Tabs.Trigger value="most_charted">{t('leaderboard.most_charted')}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="most_credits">
        <div className="space-y-2">
          {leaderboards.mostCredits.map((item) => {
            return (
              <div
                key={item.agentSymbol}
                className="bg-background-secondary flex flex-col items-center justify-between gap-2 rounded py-3 px-5 sm:flex-row"
              >
                <div className="typography-lg font-semibold">
                  <Link to="/agents/$agentSymbol" params={{ agentSymbol: item.agentSymbol }} className="link">
                    {item.agentSymbol}
                  </Link>
                </div>
                <div>{formatNumber(item.credits)}</div>
              </div>
            )
          })}
        </div>
      </Tabs.Content>

      <Tabs.Content value="most_charted">
        <div className="space-y-2">
          {leaderboards.mostSubmittedCharts.map((item) => {
            return (
              <div
                key={item.agentSymbol}
                className="bg-background-secondary flex flex-col items-center justify-between gap-2 rounded py-3 px-5 sm:flex-row"
              >
                <div className="typography-lg font-semibold">
                  <Link to="/agents/$agentSymbol" params={{ agentSymbol: item.agentSymbol }} className="link">
                    {item.agentSymbol}
                  </Link>
                </div>
                <div>{formatNumber(item.chartCount)}</div>
              </div>
            )
          })}
        </div>
      </Tabs.Content>
    </Tabs.Root>
  )
}
