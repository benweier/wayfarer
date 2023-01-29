import { Suspense } from 'react'
import { Leaderboard, Skeleton } from '@/components/Leaderboard'

export const Screen = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <Leaderboard />
    </Suspense>
  )
}
