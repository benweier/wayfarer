import { QuerySuspenseBoundary } from '@/components/query-suspense-boundary'
import * as Tabs from '@/components/tabs'
import { SystemFleet, SystemFleetFallback } from '@/features/system/fleet'
import { WaypointList, WaypointListError, WaypointListFallback } from '@/features/waypoint/list'
import { useTranslation } from 'react-i18next'

export const SystemTabs = () => {
  const { t } = useTranslation()

  return (
    <Tabs.Root defaultValue="waypoints">
      <Tabs.List>
        <Tabs.Trigger value="waypoints">{t('waypoints.label')}</Tabs.Trigger>
        <Tabs.Trigger value="fleet">{t('fleet.label')}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="waypoints">
        <QuerySuspenseBoundary fallback={<WaypointListFallback />} error={<WaypointListError />}>
          <WaypointList />
        </QuerySuspenseBoundary>
      </Tabs.Content>

      <Tabs.Content value="fleet">
        <QuerySuspenseBoundary fallback={<SystemFleetFallback />}>
          <SystemFleet />
        </QuerySuspenseBoundary>
      </Tabs.Content>
    </Tabs.Root>
  )
}
