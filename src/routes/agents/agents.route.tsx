import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'

export const AgentsRouteComponent = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-title">{t('agents.label')}</h1>

      <QuerySuspenseBoundary></QuerySuspenseBoundary>
    </div>
  )
}

export const Route = withQSB()(AgentsRouteComponent)
