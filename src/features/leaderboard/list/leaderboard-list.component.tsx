import { Tab } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import { getStatusQuery } from '@/services/api/spacetraders/status'
import { cx } from '@/utilities/cx'
import { formatNumber } from '@/utilities/number'

export const LeaderboardList = () => {
  const { data, isSuccess } = useQuery({
    queryKey: getStatusQuery.getQueryKey(),
    queryFn: getStatusQuery.queryFn,
  })

  if (!isSuccess) return null

  const leaderboard = data.leaderboards

  return (
    <>
      <Tab.Group as="div" className="tab-group">
        <Tab.List className="tab-list">
          <Tab className={({ selected }) => cx('group tab', { selected })}>Most Credits</Tab>
          <Tab className={({ selected }) => cx('group tab', { selected })}>Most Charted Waypoints</Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <div className="grid gap-2">
              {leaderboard.mostCredits.map((item) => {
                return (
                  <div
                    key={item.agentSymbol}
                    className="flex flex-col items-center justify-between gap-2 rounded bg-zinc-500 bg-opacity-5 px-5 py-3 dark:bg-opacity-10 sm:flex-row"
                  >
                    <div className="text-lg font-semibold">{item.agentSymbol}</div>
                    <div>{formatNumber(item.credits)}</div>
                  </div>
                )
              })}
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="grid gap-2">
              {leaderboard.mostSubmittedCharts.map((item) => {
                return (
                  <div
                    key={item.agentSymbol}
                    className="flex flex-col items-center justify-between gap-2 rounded bg-zinc-500 bg-opacity-5 px-5 py-3 dark:bg-opacity-10 sm:flex-row"
                  >
                    <div className="text-lg font-semibold">{item.agentSymbol}</div>
                    <div>{formatNumber(item.chartCount)}</div>
                  </div>
                )
              })}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  )
}
