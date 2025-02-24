import { useSuspenseQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '@/config/routes'
import { WaypointContext } from '@/context/waypoint.context'
import { WaypointDetail } from '@/features/waypoint/detail'
import { WaypointTabs } from '@/features/waypoint/tabs'
import { getWaypointByIdQuery } from '@/services/api/spacetraders/waypoints'

const api = getRouteApi(ROUTES.WAYPOINT)

export const WaypointRoute = () => {
  const { t } = useTranslation()
  const { systemSymbol, waypointSymbol } = api.useParams()
  const waypoint = useSuspenseQuery(
    getWaypointByIdQuery({
      systemSymbol,
      waypointSymbol,
    }),
  )

  return (
    <div key={waypointSymbol} className="space-y-4 p-4">
      <h1 className="text-h3 font-bold">
        {t('waypoint.label')}: <span className="whitespace-nowrap font-normal">{waypointSymbol}</span>
      </h1>

      <div>
        <WaypointContext value={waypoint.data.data}>
          <WaypointDetail>
            <WaypointTabs />
          </WaypointDetail>
        </WaypointContext>
      </div>
    </div>
  )
}
