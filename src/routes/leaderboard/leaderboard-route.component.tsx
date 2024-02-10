import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { LeaderboardList, LeaderboardListFallback } from '@/features/leaderboard/list'

export const LeaderboardRoute = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-title">{t('leaderboard.label')}</h1>

      <div>
        <QuerySuspenseBoundary fallback={<LeaderboardListFallback />}>
          <LeaderboardList />
        </QuerySuspenseBoundary>
      </div>
    </div>
  )
}
