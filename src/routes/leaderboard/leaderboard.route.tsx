import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import { LeaderboardList, LeaderboardListFallback } from '@/features/leaderboard/list'

export const LeaderboardRouteComponent = () => {
  const { t } = useTranslation()

  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-title text-center">{t('leaderboard.label')}</h1>

      <QuerySuspenseBoundary fallback={<LeaderboardListFallback />}>
        <LeaderboardList />
      </QuerySuspenseBoundary>
    </div>
  )
}

export const Route = withQSB()(LeaderboardRouteComponent)
