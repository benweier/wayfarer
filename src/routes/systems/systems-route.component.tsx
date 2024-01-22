import { RouteApi, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { ROUTES } from '@/config/routes'
import { SystemList, SystemListFallback } from '@/features/system/list'

const api = new RouteApi({ id: ROUTES.SYSTEMS })

export const SystemsRoute = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { page } = api.useSearch()

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-title">{t('systems.label')}</h1>

      <QuerySuspenseBoundary fallback={<SystemListFallback />}>
        <SystemList
          page={page}
          setPage={(page) => {
            void navigate({ to: '/systems', search: { page } })
          }}
        />
      </QuerySuspenseBoundary>
    </div>
  )
}
