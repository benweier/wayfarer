import { HiOutlineCash } from 'react-icons/hi'
import { useLeaderboardQuery } from '@/services/spacetraders/core'
import { UserWorth } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'
import { formatNumber } from '@/utilities/number'

const LeaderboardItem = ({ leader, highlight = false }: { leader: UserWorth; highlight?: boolean }) => {
  return (
    <div
      className={cx('rounded border border-gray-700 bg-gray-700 bg-opacity-20 py-3 px-6 shadow', {
        'bg-emerald-600': highlight,
      })}
    >
      <div className="[grid-template-columns:min-content 1fr min-content] grid grid-flow-col items-center justify-start">
        <div className="w-24 text-2xl font-bold">{leader.rank}</div>
        <div className="text-lg font-medium">
          {leader.username} {highlight && <span className="text-xs text-emerald-100">(HEY, THAT&apos;S YOU!)</span>}
        </div>
        <div className="flex flex-row items-center space-x-2">
          <HiOutlineCash size={20} />
          <div className="text-xl font-medium">{formatNumber(leader.netWorth)}</div>
        </div>
      </div>
    </div>
  )
}

export const Leaderboard = () => {
  const { data } = useLeaderboardQuery()

  if (!data) return <></>

  return (
    <div className="mx-auto max-w-5xl">
      <div className="[grid-template-columns:min-content 1fr auto] grid grid-flow-col items-center justify-start py-4 px-6">
        <div className="w-24 text-sm font-bold text-gray-300">RANK</div>
        <div className="text-sm font-bold text-gray-300">USERNAME</div>
        <div className="text-sm font-bold text-gray-300">NET WORTH</div>
      </div>
      <div className="grid grid-flow-row gap-2">
        {data.netWorth.map((leader) => (
          <LeaderboardItem key={leader.rank} leader={leader} highlight={leader.rank === data.userNetWorth?.rank} />
        ))}
        {data.userNetWorth && data.userNetWorth.rank > data.netWorth.length && (
          <LeaderboardItem leader={data.userNetWorth} highlight />
        )}
      </div>
    </div>
  )
}
