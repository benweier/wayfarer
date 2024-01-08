import { Tab } from '@headlessui/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { cx } from 'class-variance-authority'
import { useTranslation } from 'react-i18next'
import { agentRoute } from '@/routes/agents/agent'
import { getStatusQuery } from '@/services/api/spacetraders/status'
import { formatNumber } from '@/utilities/number.helper'

export const LeaderboardList = () => {
  const { t } = useTranslation()
  const { data } = useSuspenseQuery(getStatusQuery())
  const leaderboards = data.leaderboards

  return (
    <Tab.Group as="div" className="tab-group">
      <Tab.List className="tab-list">
        <Tab className={({ selected }) => cx('group tab', { selected })}>{t('leaderboard.most_credits')}</Tab>
        <Tab className={({ selected }) => cx('group tab', { selected })}>{t('leaderboard.most_charted')}</Tab>
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel>
          <div className="grid gap-2">
            {leaderboards.mostCredits.map((item) => {
              return (
                <div
                  key={item.agentSymbol}
                  className="flex flex-col items-center justify-between gap-2 rounded bg-zinc-500 bg-opacity-5 px-5 py-3 dark:bg-opacity-10 sm:flex-row"
                >
                  <div className="text-lg font-semibold">
                    <Link to={agentRoute.to} params={{ agentSymbol: item.agentSymbol }} className="link">
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
                  className="flex flex-col items-center justify-between gap-2 rounded bg-zinc-500 bg-opacity-5 px-5 py-3 dark:bg-opacity-10 sm:flex-row"
                >
                  <div className="text-lg font-semibold">
                    <Link to={agentRoute.to} params={{ agentSymbol: item.agentSymbol }} className="link">
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
