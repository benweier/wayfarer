import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { SystemList, SystemListFallback } from '@/features/system/list'
import { systemsIndexRoute } from '@/routes/systems.route'

export const SystemsRoute = () => {
  const { t } = useTranslation()
  const navigate = useNavigate({ from: systemsIndexRoute.path })
  const { page } = systemsIndexRoute.useSearch()

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-title">{t('systems.label')}</h1>

      <QuerySuspenseBoundary fallback={<SystemListFallback />}>
        <SystemList
          page={page}
          setPage={(page) => {
            void navigate({ search: { page } })
          }}
        />
      </QuerySuspenseBoundary>
    </div>
  )
}
