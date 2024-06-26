import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { LeaderboardList, LeaderboardListFallback } from '@/features/leaderboard/list'
import { useTranslation } from 'react-i18next'

export const LeaderboardRoute = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-4 p-4">
      <h1 className="display-md font-bold">{t('leaderboard.label')}</h1>

      <div>
        <QuerySuspenseBoundary fallback={<LeaderboardListFallback />}>
          <LeaderboardList />
        </QuerySuspenseBoundary>
      </div>
    </div>
  )
}
