import { HiOutlineCash } from 'react-icons/hi'
import tw from 'twin.macro'
import { useLeaderboardQuery } from '@/services/spacetraders/core'
import { UserWorth } from '@/types/spacetraders'
import { formatNumber } from '@/utilities/number'

const LeaderboardItem = ({ leader, highlight = false }: { leader: UserWorth; highlight?: boolean }) => {
  return (
    <div css={[tw`border border-gray-700 rounded shadow py-4 px-6`, highlight && tw`bg-emerald-600`]}>
      <div css={tw`grid grid-flow-col justify-start items-center grid-template-columns[min-content 1fr min-content]`}>
        <div css={tw`text-3xl font-bold w-24`}>{leader.rank}</div>
        <div css={tw`text-lg font-medium`}>
          {leader.username} {highlight && <span css={tw`text-xs text-emerald-100`}>(HEY, THAT&apos;S YOU!)</span>}
        </div>
        <div css={tw`flex flex-row items-center space-x-2`}>
          <HiOutlineCash size={20} />
          <div css={tw`text-xl font-medium`}>{formatNumber(leader.netWorth)}</div>
        </div>
      </div>
    </div>
  )
}

export const Leaderboard = () => {
  const { data } = useLeaderboardQuery()

  if (!data) return <></>

  return (
    <div css={tw`max-w-2xl mx-auto`}>
      <div
        css={tw`grid grid-flow-col justify-start items-center grid-template-columns[min-content 1fr auto] py-4 px-6`}
      >
        <div css={tw`text-gray-300 text-sm font-bold w-24`}>RANK</div>
        <div css={tw`text-gray-300 text-sm font-bold`}>USERNAME</div>
        <div css={tw`text-gray-300 text-sm font-bold`}>NET WORTH</div>
      </div>
      <div css={tw`grid grid-flow-row gap-4`}>
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
