import { useQuery } from '@tanstack/react-query'
import { HiOutlineCash } from 'react-icons/hi'
import * as api from '@/services/api/spacetraders'
import { UserWorth } from '@/types/spacetraders'
import { cx } from '@/utilities/cx'
import { formatNumber } from '@/utilities/number'

const LeaderboardItem = ({ leader, highlight = false }: { leader: UserWorth; highlight?: boolean }) => {
  return (
    <div
      className={cx('rounded border border-gray-700 bg-gray-700 bg-opacity-20 py-3 px-6', {
        'bg-emerald-600': highlight,
      })}
    >
      <div className="grid grid-flow-col items-center justify-start [grid-template-columns:min-content_1fr_min-content]">
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
  const { data, isSuccess } = useQuery(['leaderboard'], api.leaderboardQuery)

  if (!isSuccess) return null

  return (
    <>
      <div className="grid grid-flow-col items-center justify-start py-4 px-6 [grid-template-columns:min-content_1fr_auto]">
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
    </>
  )
}

export const Skeleton = () => {
  return (
    <>
      <div className="grid grid-flow-col items-center justify-start py-4 px-6 [grid-template-columns:min-content_1fr_auto]">
        <div className="w-24 text-sm font-bold text-gray-300">RANK</div>
        <div className="text-sm font-bold text-gray-300">USERNAME</div>
        <div className="text-sm font-bold text-gray-300">NET WORTH</div>
      </div>
      <div className="grid grid-flow-row gap-2">
        <div className="grid animate-pulse grid-flow-col items-center justify-start py-4 px-6 [grid-template-columns:min-content_1fr_min-content]">
          <div className="w-24">
            <div className="h-3 w-1/2 rounded-full bg-zinc-400" />
          </div>
          <div>
            <div className="h-3 w-1/2 rounded-full bg-zinc-400" />
          </div>
          <div className="w-24">
            <div className="h-3 w-full rounded-full bg-zinc-400" />
          </div>
        </div>
        <div className="grid animate-pulse grid-flow-col items-center justify-start py-4 px-6 [grid-template-columns:min-content_1fr_min-content]">
          <div className="w-24">
            <div className="h-3 w-1/2 rounded-full bg-zinc-400" />
          </div>
          <div>
            <div className="h-3 w-1/2 rounded-full bg-zinc-400" />
          </div>
          <div className="w-24">
            <div className="h-3 w-full rounded-full bg-zinc-400" />
          </div>
        </div>
        <div className="grid animate-pulse grid-flow-col items-center justify-start py-4 px-6 [grid-template-columns:min-content_1fr_min-content]">
          <div className="w-24">
            <div className="h-3 w-1/2 rounded-full bg-zinc-400" />
          </div>
          <div>
            <div className="h-3 w-1/2 rounded-full bg-zinc-400" />
          </div>
          <div className="w-24">
            <div className="h-3 w-full rounded-full bg-zinc-400" />
          </div>
        </div>
      </div>
    </>
  )
}
