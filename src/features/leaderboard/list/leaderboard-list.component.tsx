import { Tab } from '@headlessui/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { getStatusQuery } from '@/services/api/spacetraders/status'
import { formatNumber } from '@/utilities/number.helper'

export const LeaderboardList = () => {
  const { t } = useTranslation()
  const { data } = useSuspenseQuery(getStatusQuery())
  const leaderboards = data.leaderboards

  return (
    <Tab.Group as="div" className="tab-group">
      <Tab.List className="tab-list">
        <Tab className="group tab">{t('leaderboard.most_credits')}</Tab>
        <Tab className="group tab">{t('leaderboard.most_charted')}</Tab>
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel>
          <div className="grid gap-2">
            {leaderboards.mostCredits.map((item) => {
              return (
                <div
                  key={item.agentSymbol}
                  className="flex flex-col items-center justify-between gap-2 rounded bg-zinc-500/5 py-3 px-5 sm:flex-row dark:bg-zinc-600/10"
                >
                  <div className="text-lg font-semibold">
                    <Link to="/agents/$agentSymbol" params={{ agentSymbol: item.agentSymbol }} className="link">
                      {item.agentSymbol}
                    </Link>
                  </div>
                  <div>{formatNumber(item.credits)}</div>
                </div>
              )
            })}
          </div>
        </Tab.Panel>

        <Tab.Panel>
          <div className="grid gap-2">
            {leaderboards.mostSubmittedCharts.map((item) => {
              return (
                <div
                  key={item.agentSymbol}
                  className="flex flex-col items-center justify-between gap-2 rounded bg-zinc-500/10 py-3 px-5 sm:flex-row"
                >
                  <div className="text-lg font-semibold">
                    <Link to="/agents/$agentSymbol" params={{ agentSymbol: item.agentSymbol }} className="link">
                      {item.agentSymbol}
                    </Link>
                  </div>
                  <div>{formatNumber(item.chartCount)}</div>
                </div>
              )
            })}
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
