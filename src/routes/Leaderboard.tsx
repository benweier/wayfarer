import tw from 'twin.macro'
import { Box } from '@/components/Box'
import { Leaderboard } from '@/components/Leaderboard'

export const LeaderboardPage = () => {
  return (
    <Box css={tw`container`}>
      <Leaderboard />
    </Box>
  )
}
