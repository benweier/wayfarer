import tw from 'twin.macro'
import { Leaderboard } from '@/components/Leaderboard'

export const LeaderboardPage = () => {
  return (
    <div css={tw`container`}>
      <Leaderboard />
    </div>
  )
}
