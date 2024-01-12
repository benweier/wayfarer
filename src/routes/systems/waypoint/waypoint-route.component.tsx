import { RouteApi } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import { ROUTES } from '@/config/routes'
import { WaypointStore } from '@/context/waypoint.context'
import { WaypointDetail } from '@/features/waypoint/detail'
import { WaypointTabs } from '@/features/waypoint/tabs'

const waypointRoute = new RouteApi({ id: ROUTES.WAYPOINT })

export const WaypointRoute = () => {
  const { t } = useTranslation()
  const { systemSymbol, waypointSymbol } = waypointRoute.useParams()

  return (
    <div key={waypointSymbol} className="space-y-4 p-4">
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
