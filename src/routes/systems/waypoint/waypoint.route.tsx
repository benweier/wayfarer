import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { QuerySuspenseBoundary, withQSB } from '@/components/query-suspense-boundary'
import { WaypointStore } from '@/context/waypoint.context'
import { WaypointDetail } from '@/features/waypoint/detail'
import { WaypointTabs } from '@/features/waypoint/tabs'

export const WaypointRouteComponent = () => {
  const { t } = useTranslation()
  const { systemSymbol, waypointSymbol } = useParams()

  if (!systemSymbol || !waypointSymbol) return null

  return (
    <div key={waypointSymbol} className="grid gap-4 p-4">
      <h1 className="text-title">
        {t('waypoint.label')}: <span className="whitespace-nowrap font-normal">{waypointSymbol}</span>
      </h1>

      <QuerySuspenseBoundary>
        <WaypointStore systemSymbol={systemSymbol} waypointSymbol={waypointSymbol}>
          <WaypointDetail>
            <WaypointTabs />
          </WaypointDetail>
        </WaypointStore>
      </QuerySuspenseBoundary>
    </div>
  )
}

export const Route = withQSB()(WaypointRouteComponent)
